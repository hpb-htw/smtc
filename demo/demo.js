import {htmlEscape, parseExampleFunctions, showExampleCode} from '../dist/zmdc.js';


function formatFancy(text) {
    const escaped = htmlEscape(text);
    return `<span style="color:#fe2f33">${escaped}</span>`;
}

export function demoUsageTextFormatFunction() {
    // tag: fancy-demo
    const text = "Funny texts don't need Comic Sans";
    const fancy = formatFancy(text);
    // <span id="ff-result">
    document.getElementById("ff-result").innerHTML = fancy;
}

export function demoRunDemoFunction() {
    // tag: howto-run-demo-function
    demoUsageTextFormatFunction();
}


export function demoShowDemoFunction() {
    // tag: howto-show-demo-code
    // get the source code of the demo function
    const demoFn = demoUsageTextFormatFunction.toString();
    // parse source code to example
    const example = parseExampleFunctions(demoFn)[0];
    // show example
    showExampleCode(example);
}