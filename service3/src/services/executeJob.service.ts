import {Job, Result, Upload} from "../apis/db";
import {executeCode} from "../apis/codex";
import {sendEmail} from "../apis/mailgun";

export async function executeJob() {
    // Get jobs with status none
    const jobs = await Job.find({status: 'none'});

    // For each job, execute it with codex and update the status
    for (const job of jobs) {
        /**
         * Execute job with codex
         */
        const urlEncoded = job.job;
        const response = await executeCode(urlEncoded);

        /**
         * Update job status to executed
         */
        job.status = 'executed';
        await job.save();

        /**
         * Save result to db
         */
        let output = '';
        const hasError = response.error.length !== 0

        if (hasError) {
            output = response.error;
        } else {
            output = response.output;
        }

        const result = new Result({
            jobId: job._id,
            output,
            status: 'done',
        });

        await result.save();

        /**
         * Find user email
         */
        const upload = await Upload.findById(job.uploadId);

        if (!upload) {
            throw new Error('Upload not found');
        }

        const email = upload.email;

        if (hasError) {
            await sendEmail(email, 'Error', output);
        } else {
            await sendEmail(email, 'Success', output);
        }
    }
}
