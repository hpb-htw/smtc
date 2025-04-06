import {expect, test} from "vitest";
import {showExampleCode} from "../lib/zmdc.ts";


test('say hello', () => {
    const result = showExampleCode('some-where');
    expect(result).toBe(undefined);
});
