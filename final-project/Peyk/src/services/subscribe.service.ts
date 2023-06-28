import {AlertSubscription} from "../models/models";

export async function subscribeService(email: string, coinName: string, differencePercentage: number) {
    const subscription = new AlertSubscription({
        email,
        name: coinName,
        differencePercentage
    });

    return await subscription.save();
}
