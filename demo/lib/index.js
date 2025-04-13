import {JS_EXAMPLE_EL_QUERY, HTML_EXAMPLE_EL_QUERY,
    htmlEscape, parseExampleFunctions, showExampleCode} from '../../dist/zmdc.js';

import './index.css';


import Prism from 'prismjs';

window.Prism = Prism;

document.addEventListener("DOMContentLoaded", async () => {
    demoUsageTextFormatFunction();
    showDemoCode('index.js');
});


function formatFancy(text) {
    const escaped = htmlEscape(text);
    return `<span style="color:#fe2f33;font-weight:bold">${escaped}</span>`;
}


// tag: fancy-demo
function demoUsageTextFormatFunction() {
    const text = "Funny texts don't need Comic Sans";
    const fancy = formatFancy(text);
    // <span id="ff-result"></span>
    document.getElementById("ff-result").innerHTML = fancy;
}

/**
 * this function can also load any other demo script.
 * */
async function showDemoCode(demoScript) {
    const response = await fetch(demoScript, {method: 'GET'});
    const text = await response.text();
    const demoExamples = parseExampleFunctions(text);
    for(const example of demoExamples) {
        showExampleCode(example);
    }
}