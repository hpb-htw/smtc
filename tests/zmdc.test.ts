import {expect, test} from "vitest";
import {parseExampleFunction, showExampleCode} from "../lib/zmdc.ts";

const js = [
    'const metadata = auxiliaryFunction(img);',
    'const fancyImage = doSomeFancyStuff(img, metadata);',
    'document.getElementById("result").innerHTML = "TODO: append fancyImage hier";',
    'document.getElementById("length").innerText = "length: " + (fancyImage.length);'
]

const html = [
    '<div id="result"></div>',
    '<span id="length"></span>'
]

const code = `
function auxiliaryFunction(img) {
    console.log('Here is an auxiliary function');
    return img.toString();
}

export function demoFancyImageProcessing(img) {
    // tag: demo-1
    ${js[0]}
    ${js[1]}
    // ${html[0]}
    ${js[2]}
    // ${html[1]}
    ${js[3]}
} 
`;

test('parseExampleFunction should recognize demo functions', () => {
    const examples = parseExampleFunction(code);
    expect(examples).toHaveLength(1);
});

test('parseExampleFunction should recognize // tag: in function', () => {
    const examples = parseExampleFunction(code);
    const demo = examples[0];
    expect(demo.elId).toStrictEqual('demo-1');
});

test('parseExampleFunction should recgnize js example code in function', () => {
    const example = parseExampleFunction(code);
    const demo = example[0];
    expect(demo.js).toStrictEqual(js.join('\n'));
});

test('parseExampleFunction should recognize html example code in function', () => {
    const examples = parseExampleFunction(code);
    const demo = examples[0];
    expect(demo.html).toStrictEqual(html.join('\n'));
});


test('parseExampleFunction should recognize absence of tag:', () => {
    const badCode = `
export function demoBadExample(data) {
    return Number(data) * 2 + 31;
}    
    `;
    try {
        parseExampleFunction(badCode);
    }catch (e) {
        const message = e.message;
        expect(message).toContain('not started with // tag:');
    }
});

test('parseExampleFunction should recognize more than one demoFunction', () =>{
    const doubleCode = `${code}\n /*some comments*/\n ${code}`;
    const examples = parseExampleFunction(doubleCode);
    expect(examples).toHaveLength(2);
});
