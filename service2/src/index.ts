import {start} from "./apis/ampq";
import {connectToDb} from "./apis/db";

(async () => {
    await connectToDb()
    await start()
})()
