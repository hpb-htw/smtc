import {expect, test} from "vitest";
import {
    parseCode
} from "../lib/zmdc.ts";

import {Example} from "../lib/types";

const insideFn = (`
    function demoInsiderFn() {
        // tag: this-is-taken-as-comment
        console.log("Test inside");
        // <span id="test"></span>
        document.getElementById("test").innerText = "Insider";
    }
    return demoInsiderFn;
`).trim();

const outsideFn = (`
function demoFunctionInside() {
    // tag: demo-function-inside
    ${insideFn}    
}`).trim()

test("parseCode should take inside function as JavaScript code", () => {
    const example = parseCode(outsideFn.split('\n'));
    const expected = (' '.repeat(4) + insideFn).split('\n')
        .map(l => l.slice(4))
        .join('\n');
    console.log(expected)
    expect(example.js).toStrictEqual(expected);
    expect(example.elId).toStrictEqual('demo-function-inside');
});
