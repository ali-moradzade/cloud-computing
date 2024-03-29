import {Job, Result, Upload} from "../apis/db";
import {executeCode} from "../apis/codex";
import {sendEmail} from "../apis/mailgun";

export async function executeJob() {
    // Get jobs with status none
    const jobs = await Job.find({status: 'none'});
    console.log('Jobs: ', jobs)

    // For each job, execute it with codex and update the status
    for (const job of jobs) {
        console.log('Job: ', job)
        /**
         * Execute job with codex
         */
        const urlEncoded = job.job;
        const response = await executeCode(urlEncoded);
        console.log('Response: ', response)

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

        console.log('Output: ', output)

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

        console.log(`Email for job: ${job._id}`)
        console.log({
            email,
            output,
        })
        // if (hasError) {
        //     await sendEmail(email, 'Error', output);
        // } else {
        //     await sendEmail(email, 'Success', output);
        // }
    }
}
