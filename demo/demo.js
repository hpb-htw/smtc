import {parseCode, showExampleCode} from '../dist/zmdc.js';
import {htmlEscape} from "../lib/zmdc.js";


function formatFancy(text) {
    const escaped = htmlEscape(text);
    return `<span class="fancy">${escaped}</span>`;
}

