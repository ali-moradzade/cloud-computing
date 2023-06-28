import {afterEach, beforeEach, describe, expect, it} from "vitest";
import {connect, connection} from "mongoose";
import {BEPA, CoinName} from "../config";
import {Price} from "../models/models";
import {alertSubscribersService, findLastTwoPrices} from "./alertSubscribers.service";


connect(BEPA.mongodb.testUrl)
    .then(() => {
        console.log('connected to mongodb ..')
    })

describe('alertSubscribersService', () => {
    afterEach(async () => {
        await connection.db.dropDatabase();
    })

    describe('findLastTwoPrices', () => {
        it('should work with < 2 prices', async () => {
            // Arrange
            await Price.insertMany([
                new Price({
                    name: CoinName.BITCOIN,
                    createdAt: new Date(),
                    price: 100
                }),
            ])

            // Act
            const results = await findLastTwoPrices(CoinName.BITCOIN);

            // Assert
            expect(results).toBeUndefined();
        })

        it('should work with >= 2 prices', async () => {
            // Arrange
            await Price.insertMany([
                new Price({
                    name: CoinName.BITCOIN,
                    createdAt: new Date(),
                    price: 100
                }),
                new Price({
                    name: CoinName.BITCOIN,
                    createdAt: new Date(),
                    price: 110
                }),
                new Price({
                    name: CoinName.BITCOIN,
                    createdAt: new Date(),
                    price: 200
                }),
            ])

            // Act
            const results = await findLastTwoPrices(CoinName.BITCOIN);

            // Assert
            expect(results.length).toEqual(2);
            expect(results[0].name).toEqual(CoinName.BITCOIN);
            expect(results[1].name).toEqual(CoinName.BITCOIN);
        })
    })
})
