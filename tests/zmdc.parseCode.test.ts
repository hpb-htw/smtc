import {expect, test} from "vitest";
import {
    DEMO_BLOCK_INDICATOR,

    parseCode
} from "../lib/zmdc.ts";
import type {ParsingFunctionState} from "../lib/types";

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
`).trim();

const outsideFn = (`
{
    function demoInsiderFn() {
        // tag: this-is-taken-as-comment
        console.log("Test inside");
        // <div>
        //     <span id="test"></span>
        // </div>
        document.getElementById("test").innerText = "Insider";
    }
    // <div>
    //     <span id="outside"></span>
    // </div>
}`).trim();

test("parseCode should take inside function as JavaScript code", () => {
    const state:ParsingFunctionState = {
        inBlock: true,
        fnLines: outsideFn.split('\n'),
        fnName: 'demo-function-inside',
        closeCurly: 5,
        openCurly: 5
    }
    const example = parseCode(state);
    //console.log(outsideFn)
    const expected = (' '.repeat(4) + insideFn).split('\n')
        .map(l => l.slice(4))
        .join('\n');
    expect(example.js).toStrictEqual(expected);
    expect(example.html).toStrictEqual(outsideHTML);
    expect(example.elId).toStrictEqual('demo-function-inside');

});

test("parseCode should accept empty block", () => {
    const state:ParsingFunctionState = {
        inBlock: true,
        fnLines: ['{', '}'],
        fnName: 'demo-function-inside',
        closeCurly: 5,
        openCurly: 5
    }
    const example = parseCode(state);
    expect(example.js).toStrictEqual('');
    expect(example.html).toStrictEqual('');
    expect(example.elId).toStrictEqual('demo-function-inside');
});

test("recognize demo functions", () => {
    const fnSign = [
        ["// tag: Simple", "Simple"],
        ["//tag:async-fn", "async-fn"],
        ["//    tag:    export", "export"]
    ];
    for(const [sign, name] of fnSign ) {
        console.log(sign)
        const parseResult = DEMO_BLOCK_INDICATOR.exec(sign);
        expect(parseResult.groups["name"]).toStrictEqual(name);
    }
});
