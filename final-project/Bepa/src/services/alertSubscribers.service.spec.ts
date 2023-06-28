import {afterEach, describe, expect, it} from "vitest";
import {connect, connection} from "mongoose";
import {BEPA, CoinName} from "../config";
import {alertSubscribersService} from "./alertSubscribers.service";
import {Price} from "../models/models";

connect(BEPA.mongodb.testUrl)
    .then(() => {
        console.log('connected to mongodb ..')
    })

describe('alertSubscribersService', () => {
    afterEach(async () => {
        await connection.db.dropDatabase();
    })

    it('should work', async () => {
        const p1 = new Price({
            name: CoinName.BITCOIN,
            createdAt: new Date(),
            price: 100
        })
        const p2 = new Price({
            name: CoinName.BITCOIN,
            createdAt: new Date(),
            price: 110
        })
        const p3 = new Price({
            name: CoinName.BITCOIN,
            createdAt: new Date(),
            price: 200
        })

        await p1.save();
        await p2.save();
        await p3.save();

        await alertSubscribersService();
    })
})
