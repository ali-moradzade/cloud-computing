import {connect} from "mongoose";
import {it} from "vitest";
import {BEPA, CoinName} from "../config";
import {findLastTwoPrices} from "./alertSubscribers.service";

it('should work', async () => {
    await connect(BEPA.mongodb.url);

    console.log(await findLastTwoPrices(CoinName.BITCOIN))
})
