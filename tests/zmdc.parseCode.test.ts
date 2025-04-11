import {expect, test} from "vitest";
import {
    DEMO_INDICATOR,
    parseCode
} from "../lib/zmdc.ts";

const outsideHTML = (`
<div>
    <span id="outside"></span>
</div>
`).trim();

const insideFn = (`
    function demoInsiderFn() {
        // tag: this-is-taken-as-comment
        console.log("Test inside");
        // <div>
        //     <span id="test"></span>
        // </div>
        document.getElementById("test").innerText = "Insider";
    }
    return demoInsiderFn;
`).trim();

const outsideFn = (`
function demoFunctionInside() {
    // tag: demo-function-inside
    ${insideFn}
${outsideHTML.split('\n').map(l => '    // ' + l).join('\n')}
}`).trim()

test("parseCode should take inside function as JavaScript code", () => {
    const state = {
        fnLines: outsideFn.split('\n'),
        fnName: 'FunctionInside'
    }
    const example = parseCode(state);
    //console.log(outsideFn)
    const expected = (' '.repeat(4) + insideFn).split('\n')
        .map(l => l.slice(4))
        .join('\n');
    expect(example.js).toStrictEqual(expected);
    expect(example.html).toStrictEqual(outsideHTML);
    expect(example.elId).toStrictEqual('demo-function-inside');
    expect(example.name).toStrictEqual('FunctionInside');
});


test("recognize demo functions", () => {
    const fnSign = [
        ["function demoSimple()", "Simple"],
        ["async function demoAsyncFn(url)", "AsyncFn"],
        ["export function demoExport()", "Export"],
        ["export async function demoBothModify()", "BothModify"],
        ["export async function* demoAsyncGenerator()", "AsyncGenerator"],
        ["return async function* demoAsyncGenerator()", "AsyncGenerator"],
    ];
    for(const [sign, name] of fnSign ) {
        console.log(sign)
        const parseResult = DEMO_INDICATOR.exec(sign);
        expect(parseResult.groups["fnName"]).toStrictEqual(name);
    }
});
