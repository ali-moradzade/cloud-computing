import axios from "axios";
import {BEPA, CoinName} from "../config";

export interface CoinInfo {
    name: string,
    value: number,
    updatedAt: Date,
}

export async function getCoinInfo(name: CoinName) {
    const url = `${BEPA.baseUrl}${BEPA.dataUrl(name)}`
    let result: CoinInfo;

    try {
        result = await axios.get(url)
    } catch (e) {
        console.log('Error while getting coin info: ', (e as Error).message)
        throw e;
    }

    return result;
}
