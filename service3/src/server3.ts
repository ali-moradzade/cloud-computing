import {executeJob} from "./services/executeJob.service";
import {connectToDb} from "./apis/db";

/**
 * Execute this function, periodically, every 1 minutes, to execute the job.
 */
const minutes = 1;
const seconds = 10;

connectToDb()
    .then(() => {
        console.log('Connected to db');
    });

setInterval(async () => {
    await executeJob();
}, minutes * seconds * 1000);
