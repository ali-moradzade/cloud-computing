import {it, expect, describe, afterEach} from "vitest";
import {connect, connection} from "mongoose";
import {writePricesService} from "./writePrices.service";
import {Price} from "../models/models";
import {BEPA, CoinName} from "../config";

connect(BEPA.mongodb.testUrl)
    .then(() => {
        console.log('connected to mongodb ..')
    })

describe('writePrices.service', () => {
    afterEach(async () => {
        await connection.db.dropDatabase();
    })

    it('should be able to write latest price in db', async () => {
        // Arrange && Act
        await writePricesService();

        const bitcoins = await Price.find({name: CoinName.BITCOIN});
        const docoins = await Price.find({name: CoinName.DOCOIN});

        // Assert
        expect(bitcoins[0].name).toEqual(CoinName.BITCOIN);
        expect(docoins[0].name).toEqual(CoinName.DOCOIN);
    })
})
