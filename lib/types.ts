export interface Example {
    /**
     * JavaScript code to be shown as example in a DOM element
     * */
    js:string
    /**
     * HTML code corresponding to js to shown as an example in a DOM element
     * */
    html:string,

    /**
     * the id-attribute of a container element, in which the js-code and html-code are shown.
     * */
    elId:string
}

/**
 * format JS and HTML code to put into a DOM-Element as innerHTML.
 * Implementation of this interface can simply escape HTML in code, or do some fancy syntax highlighting,
 * It is up to you to do with your code.
 * */
export interface Formatter {
    /**
     * format the javascript code
     * */
    js(code:string): string

    /**
     * format the HTML code
     * */
    html(code:string): string
}

export interface CurlyMatch {
    openCurly:number,
    closeCurly:number
}

export interface HtmlCommentCandidate {
    isComment:boolean,
    value?:string
}