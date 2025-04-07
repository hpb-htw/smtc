import {parseCode, parseExampleFunctions, showExampleCode} from "../lib/zmdc.js";

import {demoRunDemoFunction, demoShowDemoFunction, demoUsageFormatFancy} from "./demo.js";

function showHowtoPrepareCode() {
    const parsedExample = parseExampleFunctions(demoUsageFormatFancy.toString())[0];
    const jsbody = parsedExample.js.split('\n').map(l => `    ${l}`).join('\n');
    const howtoPrepareExampleCode = {
        js: `export function ${demoUsageFormatFancy.name}() {\n${jsbody}\n}` ,
        html: parsedExample.html,
        elId: "howto-prepare-demo-function"
    }
    showExampleCode(howtoPrepareExampleCode);
}

function showHowtoRunDemonstration() {
    const js = demoRunDemoFunction.toString();
    const example = parseExampleFunctions(js)[0];
    showExampleCode(example);
}

function showHowtoMarkNeededHTMLElement() {
    const js = demoUsageFormatFancy.toString()
    const howtoMarkElementExample = {
        js,
        html: `<div id="fancy-demo">
    <pre><code class="example-javascript"></code></pre>
    <pre><code class="example-html"></code></pre>
</div>`,
        elId: "howto-mark-demo-info"
    }
    showExampleCode(howtoMarkElementExample);
}

function showDemoCodeInFunction() {
    const js = demoShowDemoFunction.toString();
    const example = parseExampleFunctions(js)[0];
    showExampleCode(example);
}

function showDemoFunctionAgain() {
    const demoFn = demoUsageFormatFancy.toString();
    const example = parseExampleFunctions(demoFn)[0];
    example.elId = "duplicate-fancy-demo";
    showExampleCode(example);
}


document.addEventListener("DOMContentLoaded", () => {
    // run the demo code
    demoUsageFormatFancy()
    demoShowDemoFunction();

    showHowtoPrepareCode();
    showHowtoRunDemonstration();
    showHowtoMarkNeededHTMLElement();
    showDemoCodeInFunction();

    showDemoFunctionAgain();
})


