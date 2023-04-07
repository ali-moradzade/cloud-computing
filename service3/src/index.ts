import {executeJob} from "./services/executeJob.service";

/**
 * Execute this function, periodically, every 1 minutes, to execute the job.
 */
setInterval(async () => {
    await executeJob();
}, 5 * 60 * 1000);
