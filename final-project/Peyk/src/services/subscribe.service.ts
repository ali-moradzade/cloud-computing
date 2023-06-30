import {AlertSubscription} from "../models/models";

export async function subscribeService(email: string, coinName: string, differencePercentage: number) {
    const subscription = new AlertSubscription({
        email,
        name: coinName,
        differencePercentage
    });

    await subscription.save();
    return {
        email,
        name: coinName,
        differencePercentage
    }
}
