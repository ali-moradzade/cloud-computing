import {afterEach, describe, expect, it} from "vitest";
import {connect, connection} from "mongoose";
import {BEPA, CoinName} from "../config";
import {AlertSubscription, Price} from "../models/models";
import {alertSubscribersService, findLastTwoPrices, findMatchingAlerts} from "./alertSubscribers.service";


connect(BEPA.mongodb.testUrl).then()

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
            const latestPrice = 200;
            const secondLatestPrice = 100;

            await new Price({
                name: CoinName.BITCOIN,
                createdAt: new Date(),
                price: 100
            }).save();

            await new Price({
                name: CoinName.BITCOIN,
                createdAt: new Date(),
                price: secondLatestPrice,
            }).save();

            await new Price({
                name: CoinName.BITCOIN,
                createdAt: new Date(),
                price: latestPrice
            }).save()

            // Act
            const results = await findLastTwoPrices(CoinName.BITCOIN);

            // Assert
            expect(results.length).toEqual(2);

            expect(results[0].name).toEqual(CoinName.BITCOIN);
            expect(results[0].price).toEqual(latestPrice);

            expect(results[1].name).toEqual(CoinName.BITCOIN);
            expect(results[1].price).toEqual(secondLatestPrice);
        })
    })

    describe('findMatchingAlerts', () => {
        it('should work in case of increase gte percentage', async () => {
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
            ])

            const email = 'accepted@test.com';

            await AlertSubscription.insertMany([
                new AlertSubscription({
                    email: 'non-accepted@test.com',
                    name: CoinName.BITCOIN,
                    differencePercentage: 11
                }),
                new AlertSubscription({
                    email,
                    name: CoinName.BITCOIN,
                    differencePercentage: 9
                })
            ])

            // Act
            const lastTwoPrices = await findLastTwoPrices(CoinName.BITCOIN);
            const emails = await findMatchingAlerts(lastTwoPrices);

            // Assert
            expect(emails.length).toEqual(1);
            expect(emails[0]).toEqual(email);
        })
    })

    describe('alertSubscribersService', () => {
        it('should be able to send email in case of matches', async () => {
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
            ])
            await AlertSubscription.insertMany([
                new AlertSubscription({
                    email: 'accepted@test.com',
                    name: CoinName.BITCOIN,
                    differencePercentage: 1
                })
            ])

            // Act
            const isAlertsSend = await alertSubscribersService();

            // Assert
            expect(isAlertsSend).toBe(true)
        })
    })
})
