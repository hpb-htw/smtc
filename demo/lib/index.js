import {JS_EXAMPLE_EL_QUERY, HTML_EXAMPLE_EL_QUERY,
    htmlEscape, parseExampleFunctions, showExampleCode} from '../../dist/zmdc.js';

import './index.css';


import Prism from 'prismjs';

window.Prism = Prism;

// tag: howto-show-demo-code
//{
    document.addEventListener("DOMContentLoaded", async () => {
        demoUsageTextFormatFunction();
        await showDemoCode('index.js');
        verifyContentOfFanyDemo();
        if(window.Prism) {
            window.Prism.highlightAll();
        }
    });
//}

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

// tag: howto-prepare-demo-function
function howToPrepareDemoFunction () {
    function demoUsageTextFormatFunction() {
        const text = "Funny texts don't need Comic Sans";
        const fancy = formatFancy(text);
        // <span id="ff-result"></span>
        document.getElementById("ff-result").innerHTML = fancy;
    }
    // <span id="ff-result"></span>
}

// tag: howto-run-demo-function
function howtoRunDemoFunction() {
    demoUsageTextFormatFunction();
}

// tag: howto-mark-demo-info
function howtoMarkDemoInfo() {
    // tag: fancy-demo
    function demoUsageTextFormatFunction() {
        const text = "Funny texts don't need Comic Sans";
        const fancy = formatFancy(text);
        document.getElementById("ff-result").innerHTML = fancy;
        // <span id="ff-result">
    }
    // <div id="fancy-demo">
    //     <pre><code class="language-javascript"></code><pre>
    //     <pre><code class="language-html"></code></pre>
    // </div>
}


/**
 * this function can also load any other demo script.
 * */
// tag: howto-load-demo-code
//{
    async function showDemoCode(demoScript) {
        const response = await fetch(demoScript, {method: 'GET'});
        const text = await response.text();
        const demoExamples = parseExampleFunctions(text);
        for (const example of demoExamples) {
            showExampleCode(example);
        }
    }
//}

// tag: verify-contents-of-fancy-demo
function verifyContentOfFanyDemo() {
    const id = "fancy-demo";
    const verifyId = "duplicate-fancy-demo";

    function showCode(bySelector) {
        const div = document.getElementById(id);
        const code = div.querySelector(bySelector).innerHTML;
        const verify = document.getElementById(verifyId);
        verify.querySelector(bySelector).innerHTML = code;
    }

    // <div id="duplicate-fancy-demo">
    //    <pre><code class="language-javascript"></code></pre>
    //    <pre><code class="language-html"></code></pre>
    // </div>
    showCode(JS_EXAMPLE_EL_QUERY);
    showCode(HTML_EXAMPLE_EL_QUERY);
}
