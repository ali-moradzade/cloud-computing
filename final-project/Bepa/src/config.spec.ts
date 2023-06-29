import {it, expect, describe} from "vitest";
import {BEPA} from "./config";

describe('config', () => {
    it('should work', () => {
        expect(BEPA.coin.baseUrl).toBeDefined();

        expect(BEPA.mongodb.url).toBeDefined();
        expect(BEPA.mongodb.testUrl).toBeDefined();

        expect(BEPA.mailgun.domain).toBeDefined();
        expect(BEPA.mailgun.apiKey).toBeDefined();
    })
})
