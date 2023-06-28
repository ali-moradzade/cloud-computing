import {connect, connection} from 'mongoose'
import {afterEach, describe, expect, it} from "vitest";
import {PEYK} from "../config";
import {subscribeService} from "./subscribe.service";
import {AlertSubscription} from "../models/models";

connect(PEYK.mongodb.testUrl).then()

describe('subscribe', () => {
    afterEach(async () => {
        await connection.db.dropDatabase();
    })

    describe('subscribeService', async () => {
        it('should work', async () => {
            // Arrange
            const email = 'test@testing.com';
            const name = 'bitcoin';
            const differencePercentage = 10;

            // Act
            const result = await subscribeService(email, name, differencePercentage);

            // Assert
            const dbResult = await AlertSubscription.findOne({_id: result._id});
            expect(result.email).toEqual(dbResult.email)
        })
    })
})
