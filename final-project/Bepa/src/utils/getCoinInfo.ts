import axios from "axios";
import {BEPA, CoinName} from "../config";

export interface CoinInfo {
    name: string,
    value: number,
    updatedAt: Date,
}

export async function getCoinInfo(name: CoinName): Promise<CoinInfo> {
    const url = `${BEPA.baseUrl}${BEPA.dataUrl(name)}`
    let result: CoinInfo;

    try {
        const response = await axios.get(url);

        result = {
            name: response.data?.name,
            value: response.data?.value,
            updatedAt: new Date(response.data?.updated_at),
        }
    } catch (e) {
        console.log('Error while getting coin info: ', (e as Error).message)
        throw e;
    }

    return result;
}
