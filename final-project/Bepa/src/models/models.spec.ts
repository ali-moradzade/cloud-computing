import {connect, connection} from 'mongoose'
import {afterAll, afterEach, beforeEach, describe, expect, it} from "vitest";
import {AlertSubscription, Price} from "./models";
import {BEPA} from "../config";

connect(BEPA.mongodb.testUrl).then()

afterAll(async () => {
    await connection.db.dropDatabase();
})

describe('models', () => {
    afterEach(async () => {
        await connection.db.dropDatabase();
    })

    describe('PriceSchema', () => {
        it('should be able to save&read a price', async () => {
            // Arrange
            const price = new Price({
                name: 'testing-price',
                createdAt: new Date(),
                price: 100,
            })

            await price.save();

            // Act
            const result = await Price.findOne({_id: price._id});

            // Assert
            expect(result.name).toEqual(price.name);
        })
    })

    describe('AlertSubscription', () => {
        it('should be able to save&read an alertSubscription', async () => {
            // Arrange
            const alertSubscription = new AlertSubscription({
                email: 'testing@test.com',
                name: 'testing-alert',
                price: 10,
            })

            await alertSubscription.save();

            // Act
            const result = await AlertSubscription.findOne({_id: alertSubscription._id});

            // Assert
            expect(result.email).toEqual(alertSubscription.email);
        })
    })
})
