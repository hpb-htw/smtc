import {parseCode, parseExampleFunctions, showExampleCode} from "../lib/zmdc.js";

import {demoUsageFormatFancy} from "./demo.js";

function runDemoCode() {
    demoUsageFormatFancy()
}

async function showDemoCode(demoScriptPath) {
    const response = await fetch(demoScriptPath, {method: 'GET'});
    const text = await response.text();
    const examples = parseExampleFunctions(text);
    for(const example of examples) {
        showExampleCode(example);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    showDemoCode("./demo.js");
    runDemoCode();
})


