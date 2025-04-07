import {parseCode, showExampleCode} from '../dist/zmdc.js';
import {htmlEscape, parseExampleFunctions} from "../lib/zmdc.js";


function formatFancy(text) {
    const escaped = htmlEscape(text);
    return `<span style="color:#fe2f33">${escaped}</span>`;
}

export function demoUsageFormatFancy() {
    // tag: fancy-demo
    const text = "Funny texts don't need Comic Sans";
    const fancy = formatFancy(text);
    // <span id="ff-result">
    document.getElementById("ff-result").innerHTML = fancy;
}

export function demoRunDemoFunction() {
    // tag: howto-run-demo-function
    demoUsageFormatFancy();
}


export function demoShowDemoFunction() {
    // tag: howto-show-demo-code
    // get the source code of the demo function
    const demoFn = demoUsageFormatFancy.toString();
    // parse source code to example
    const example = parseExampleFunctions(demoFn)[0];
    // show example
    showExampleCode(example);
}