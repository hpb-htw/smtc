import {parseExampleFunctions, showExampleCode} from "../../dist/zmdc.js";

export async function demoFetchOrigin() {
    // tag: demo-fetch-origin
    const MYSELF = "minify-code.js";
    if(document.readyState === "interactive") {
        await showDemoCode(MYSELF);
    }else {
        document.addEventListener("DOMContentLoaded", async () => {
            await showDemoCode(MYSELF);
        });
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
}






