import {getCoinInfo} from "../utils/getCoinInfo";
import {CoinName} from "../config";
import {Price} from "../models/models";

export async function writePricesService() {
    const names = [CoinName.BITCOIN, CoinName.DOCOIN]

    for (const name of names) {
        const coinInfo = await getCoinInfo(name);
        const coin = new Price({
            name: coinInfo.name,
            createdAt: coinInfo.createdAt,
            price: coinInfo.value,
        })

        await coin.save();
    }
}
