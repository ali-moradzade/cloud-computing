import {executeJob} from "./services/executeJob.service";

/**
 * Execute this function, periodically, every 1 minutes, to execute the job.
 */
const minutes = 1;

setInterval(async () => {
    await executeJob();
}, minutes * 60 * 1000);
