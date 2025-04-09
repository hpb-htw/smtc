import {parseExampleFunctions, showExampleCode} from "./zmdc/zmdc.js";
import {demoRunDemoFunction, demoShowDemoFunction, demoUsageTextFormatFunction} from "./demo.js";

document.addEventListener("DOMContentLoaded", () => {
    // run the demo code
    demoUsageTextFormatFunction()
    demoShowDemoFunction();

    showHowtoPrepareCode();
    showHowtoRunDemonstration();
    showHowtoMarkNeededHTMLElement();
    showDemoCodeInFunction();

    showDemoFunctionAgain();

    if(window.Prism) {
        console.log(Prism)
        Prism.highlightAll();
    }else {
        console.log("No Prismjs found")
    }
});

function showHowtoPrepareCode() {
    const parsedExample = parseExampleFunctions(demoUsageTextFormatFunction.toString())[0];
    const jsbody = parsedExample.js.split('\n').map(l => `    ${l}`).join('\n');
    const howtoPrepareExampleCode = {
        js: `export function ${demoUsageTextFormatFunction.name}() {\n${jsbody}\n}` ,
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
    const js = demoUsageTextFormatFunction.toString()
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
    const demoFn = demoUsageTextFormatFunction.toString();
    const example = parseExampleFunctions(demoFn)[0];
    example.elId = "duplicate-fancy-demo";
    showExampleCode(example);
}




