import {parseCode, showExampleCode} from '../dist/zmdc.js';
import {htmlEscape} from "../lib/zmdc.js";


function formatFancy(text) {
    const escaped = htmlEscape(text);
    return `<span style="color:#fe2f33">${escaped}</span>`;
}

export function demoUsageFormatFancy() {
    // tag: fancy-demo
    const text = "Funny texts don't need Comic Sans";
    const fancy = formatFancy(text);
    // <span id="formatFancy-result">
    document.getElementById("ff-result").innerHTML = fancy;
}


