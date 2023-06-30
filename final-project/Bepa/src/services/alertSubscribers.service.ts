import {AlertSubscription, Price} from "../models/models";
import {CoinName} from "../config";
import {sendEmail} from "../utils/sendEmail";

export async function alertSubscribersService() {
    const names = [CoinName.BITCOIN, CoinName.DOCOIN];
    let isAllMailsSent = true;

    for (const name of names) {
        const lastTwoBitcoins = await findLastTwoPrices(name);

        if (lastTwoBitcoins) {
            const emails = await findMatchingAlerts(lastTwoBitcoins);
            for (const email of emails) {
                isAllMailsSent = (await sendEmail(email, `Change of Price: ${name}`,
                        `There was an increase greater than your difference percentage; ` +
                        `price: ${lastTwoBitcoins[1].price}->${lastTwoBitcoins[0].price}`))
                    && isAllMailsSent;
            }
        }
    }

    return isAllMailsSent
}

export async function findLastTwoPrices(coinName: CoinName):
    Promise<{ name: string, createdAt: Date, price: number }[] | undefined> {
    const lastTwoCoinPrices = await Price
        .find({name: coinName})
        .sort({"$natural": -1})
        .limit(2) as { name: string, createdAt: Date, price: number }[];

    return lastTwoCoinPrices.length < 2 ? undefined : lastTwoCoinPrices;
}

export async function findMatchingAlerts(
    lastTwoCoinPrices: { name: string, createdAt: Date, price: number }[],
): Promise<string[]> {
    const percentage = (lastTwoCoinPrices[0].price - lastTwoCoinPrices[1].price) / lastTwoCoinPrices[1].price * 100;
    const coinName = lastTwoCoinPrices[0].name;

    const results = await AlertSubscription
        .find({
            name: coinName,
            differencePercentage: {
                $lte: percentage
            }
        })
        .select('email') as
        {
            _id: any,
            email: string,
        }[]

    return results.map(object => object.email);
}
