import {it, expect, describe} from "vitest";
import {PEYK} from "./config";

describe('config', () => {
    it('should work', () => {
        expect(PEYK.app.port).toBeDefined();

        expect(PEYK.mongodb.url).toBeDefined();
        expect(PEYK.mongodb.testUrl).toBeDefined();
    })
})
