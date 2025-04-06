export interface Example {
    js:string
    html:string,
    elId:string
}

export interface Highlighter {
    hljs(code:string): string
    hlHTML(code:string): string
}
