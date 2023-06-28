import {connect} from "mongoose";
import {BEPA} from "./config";
import {writePricesService} from "./services/writePrices.service";
import {alertSubscribersService} from "./services/alertSubscribers.service";

(async () => {
    await connect(BEPA.mongodb.url);
   
    await writePricesService();
    await alertSubscribersService();
})();
