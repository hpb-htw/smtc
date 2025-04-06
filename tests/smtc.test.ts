import {expect, test} from "vitest";
import {showExampleCode} from "../lib/smtc.ts";


test('say hello', () => {
    const result = showExampleCode('some-where');
    expect(result).toBe(undefined);
});
