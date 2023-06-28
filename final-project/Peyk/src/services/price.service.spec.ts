import {afterEach, describe, expect, it} from "vitest";
import {connect, connection} from "mongoose";
import {Price} from "../models/models";
import {priceService} from "./price.service";
import {PEYK} from "../config";

connect(PEYK.mongodb.testUrl).then()

describe('priceService', () => {
    afterEach(async () => {
        await connection.db.dropDatabase();
    })

    it('should work', async () => {
        // Arrange
        const name = 'bitcoin';
        const prices = [1000, 3000, 2000];

        await Price.insertMany(prices.map(price => new Price({
            name,
            createdAt: new Date(),
            price,
        })))

        // Arrange
        const result = await priceService(name);

        // Assert
        expect(result).toEqual(prices.reverse())
    })
})
