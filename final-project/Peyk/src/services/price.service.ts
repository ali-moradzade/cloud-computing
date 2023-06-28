import {Price} from "../models/models";

export async function priceService(coinName: string): Promise<number[]> {
    const results = await Price
        .find({name: coinName})
        .sort({"$natural": -1})
        .select('price') as {_id: any, price: number}[];

    return results.map(object => object.price);
}
