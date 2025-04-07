import {expect, test} from "vitest";
import {
    HTML_EXAMPLE_EL_QUERY,
    htmlEscape,
    JS_EXAMPLE_EL_QUERY,
    parseExampleFunctions,
    showExampleCode
} from "../lib/zmdc.ts";
import {JSDOM} from "jsdom";
import {Example} from "../lib/types";


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
    const examples = parseExampleFunctions(code);
    expect(examples).toHaveLength(1);
});

test('parseExampleFunction should recognize // tag: in function', () => {
    const examples = parseExampleFunctions(code);
    const demo = examples[0];
    expect(demo.elId).toStrictEqual('demo-1');
});

test('parseExampleFunction should recgnize js example code in function', () => {
    const example = parseExampleFunctions(code);
    const demo = example[0];
    expect(demo.js).toStrictEqual(js.join('\n'));
});

test('parseExampleFunction should recognize html example code in function', () => {
    const examples = parseExampleFunctions(code);
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
        parseExampleFunctions(badCode);
    }catch (e) {
        const message = e.message;
        expect(message).toContain('not started with // tag:');
    }
});

test('parseExampleFunction should recognize more than one demoFunction', () =>{
    const doubleCode = `${code}\n /*some comments*/\n ${code}`;
    const examples = parseExampleFunctions(doubleCode);
    expect(examples).toHaveLength(2);
});


test('showExampleCode should insert example code as HTML into container', () => {
    const container = `
<div id="demo-1">
    <pre><code class="example-javascript lang-js"></code></pre>
    <pre><code class="example-html lang-html"></code></pre>
</div>    
    `;
    const example:Example = {
        js: (js.join('\n')),
        html: (html.join('\n')),
        elId: 'demo-1'
    }
    globalThis.document = new JSDOM(container).window.document;
    showExampleCode(example);
    const containerEl = globalThis.document.getElementById('demo-1');
    const jsContainer = containerEl.querySelector(JS_EXAMPLE_EL_QUERY);
    expect(jsContainer.textContent).toStrictEqual(js.join('\n'));
    const htmlContainer = containerEl.querySelector(HTML_EXAMPLE_EL_QUERY);
    expect(htmlContainer.textContent).toStrictEqual(html.join('\n'));
});

test('showExampleCode should throw error when no container is found', () => {
    const container = `
<div id="demo-1">
    <pre><code class="example-javascript lang-js"></code></pre>
    <pre><code class="example-html lang-html"></code></pre>
</div>    
    `;
    const example:Example = {
        js: (js.join('\n')),
        html: (html.join('\n')),
        elId: 'demo-not-existing'
    }
    globalThis.document = new JSDOM(container).window.document;
    try {
        showExampleCode(example);
    } catch (e) {
        expect(e.message).toContain('Container element with id="demo-not-existing" not found')
    }
});

test('showExampleCode should throw error if no js container found', () => {
    const container = `
<div id="demo-1">
    <pre><code class="example-js lang-js"></code></pre>
    <pre><code class="example-html lang-html"></code></pre>
</div>    
    `;
    const example:Example = {
        js: (js.join('\n')),
        html: (html.join('\n')),
        elId: 'demo-1'
    }
    globalThis.document = new JSDOM(container).window.document;
    try {
        showExampleCode(example);
    } catch (e) {
        expect(e.message).toContain(`does not contain ${JS_EXAMPLE_EL_QUERY}`);
    }
});