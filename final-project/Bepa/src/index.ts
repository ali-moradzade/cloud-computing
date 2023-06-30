import {connect, disconnect} from "mongoose";
import {BEPA} from "./config";
import {writePricesService} from "./services/writePrices.service";
import {alertSubscribersService} from "./services/alertSubscribers.service";

(async () => {
    await connect(BEPA.mongodb.url);
    console.log('Connected to database ..')

    await writePricesService();
    console.log('Latest prices written to db ..')

    const isAllMailsSent = await alertSubscribersService();
    if (isAllMailsSent) {
        console.log('Subscribers alerted ..')
    }

    await disconnect();
    console.log('Disconnected from db')
})();
