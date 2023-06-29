import {AlertSubscription, Price} from "../models/models";
import {CoinName} from "../config";
import {sendEmail} from "../utils/sendEmail";

export async function alertSubscribersService() {
    const lastTwoBitcoins = await findLastTwoPrices(CoinName.BITCOIN);
    if (lastTwoBitcoins) {
        const emails = await findMatchingAlerts(lastTwoBitcoins);
        for (const email of emails) {
            sendEmail(email.email, '', '').then()
        }
    }

    const lastTwoDocoins = await findLastTwoPrices(CoinName.DOCOIN);
    if (lastTwoDocoins) {
        const emails = await findMatchingAlerts(lastTwoDocoins);
        for (const email of emails) {
            sendEmail(email.email, '', '').then()
        }
    }
}

export async function findLastTwoPrices(coinName: CoinName):
    Promise<{ name: string, createdAt: Date, price: number }[] | undefined> {
    const lastTwoCoinPrices = await Price
        .find({name: coinName})
        .sort({"$natural": 1})
        .limit(2) as { name: string, createdAt: Date, price: number }[];

    return lastTwoCoinPrices.length < 2 ? undefined : lastTwoCoinPrices;
}

export async function findMatchingAlerts(
    lastTwoCoinPrices: { name: string, createdAt: Date, price: number }[],
): Promise<{ email: string, name: string, differencePercentage?: number | undefined }[]> {
    const percentage = (lastTwoCoinPrices[1].price - lastTwoCoinPrices[0].price) / lastTwoCoinPrices[0].price * 100;
    const coinName = lastTwoCoinPrices[0].name;

    return await AlertSubscription
        .find({
            name: coinName,
            differencePercentage: {
                $lte: percentage
            }
        })
        .select('email') as
        {
            email: string,
            name: string,
            differencePercentage?: number
        }[]
}
