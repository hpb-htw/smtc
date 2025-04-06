/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
    entryPoints: ["lib/smtc.ts", "lib/types.ts"],
    out: "www/api",
    plugin: ["typedoc-plugin-mdn-links"]
};

export default config;