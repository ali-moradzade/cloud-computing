import {getCoinInfo} from "../utils/getCoinInfo";
import {CoinName} from "../config";
import {Price} from "../models/models";

export async function writePrices() {
    const bitcoinInfo = await getCoinInfo(CoinName.BITCOIN);
    const bitcoin = new Price({
        name: bitcoinInfo.name,
        // TODO: change createdAt -> updatedAt
        createdAt: bitcoinInfo.updatedAt,
        price: bitcoinInfo.value,
    })

    await bitcoin.save();

    const docoinInfo = await getCoinInfo(CoinName.DOCOIN);
    const docoin = new Price({
        name: docoinInfo.name,
        // TODO: change createdAt -> updatedAt
        createdAt: docoinInfo.updatedAt,
        price: docoinInfo.value,
    })

    await docoin.save();
}
