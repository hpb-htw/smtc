import {parseCode, showExampleCode} from "../lib/zmdc.js";

async function showDemoCode(demoScriptPath) {
    const response = await fetch(demoScriptPath, {method: 'GET'});
    const text = await response.text();
    console.log(text)
}

document.addEventListener("DOMContentLoaded", () => {
    showDemoCode("./demo.js");
})


