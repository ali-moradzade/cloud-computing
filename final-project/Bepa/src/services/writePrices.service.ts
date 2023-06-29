import {getCoinInfo} from "../utils/getCoinInfo";
import {CoinName} from "../config";
import {Price} from "../models/models";

export async function writePricesService() {
    const bitcoinInfo = await getCoinInfo(CoinName.BITCOIN);
    const bitcoin = new Price({
        name: bitcoinInfo.name,
        createdAt: bitcoinInfo.createdAt,
        price: bitcoinInfo.value,
    })

    await bitcoin.save();

    const docoinInfo = await getCoinInfo(CoinName.DOCOIN);
    const docoin = new Price({
        name: docoinInfo.name,
        createdAt: docoinInfo.createdAt,
        price: docoinInfo.value,
    })

    await docoin.save();
}
