import type {Example} from "./types.js";

export const JS_EXAMPLE_EL_QUERY = 'code[class*="example-javascript"]';
export const HTML_EXAMPLE_EL_QUERY = 'code[class*="example-html"]';

const htmlEscape = (text:string) : string => {
    return text.replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

export function showExampleCode(example:Example, jsProcessor=htmlEscape, htmlProcessor=htmlEscape) {
    const {js, html, elId} = {...example};
    const el = document.getElementById(elId);
    if(el) {
        try {
            const jsContainer = el.querySelector(JS_EXAMPLE_EL_QUERY);
            jsContainer!.innerHTML = jsProcessor(js);
            const htmlContainer = el.querySelector(HTML_EXAMPLE_EL_QUERY);
            htmlContainer!.innerHTML = htmlProcessor(html);
        }catch (e) {
            throw new Error(`Container id ${elId} does not contain ${JS_EXAMPLE_EL_QUERY} or ${HTML_EXAMPLE_EL_QUERY}`);
        }
    }else {
        throw new Error(`Container element with id='${elId}' not found`);
    }
}

export function parseCode(functionLines:string[]):Example {
    const HTML_INDICATOR = '// <';
    const FUNCTION_INDENT_SIZE = 4;

    const js = [];
    const html = [];
    const functionBodyLines = functionLines.slice(2, -1);
    if(functionBodyLines.length === 0) {
        js.push('/* function is minified */');
        html.push('<!-- function is minified -->')
    }
    for(const line of functionBodyLines ) {
        const chars = line.trim();
        if (chars.startsWith(HTML_INDICATOR) ) {
            html.push(chars.slice(HTML_INDICATOR.length-1));
        }else {
            js.push(line.slice(FUNCTION_INDENT_SIZE).trimEnd());
        }
    }
    const elId = parseElId(functionLines[1]);
    return {js: js.join('\n'), html: html.join('\n'), elId};
}

function parseElId(line:string) {
    line = line.trim();
    const EL_ID_INDICATOR = '// tag:';
    if(line.startsWith(EL_ID_INDICATOR)) {
        return line.slice(EL_ID_INDICATOR.length).trim();
    }
    throw new Error(`'${line}' not started with ${EL_ID_INDICATOR}`);
}