import {Job, Result, Upload} from "../apis/db";
import {getUrlFromId} from "../apis/s3";

export async function statusService(email: string) {
    // Find all uploads matching the given email
    const uploads = await Upload.find({email}).select('_id');

    // Extract the _id values of the matching uploads
    const uploadIds = uploads.map(upload => upload._id);

    // Find all jobs that reference any of the matching uploads
    const jobs = await Job.find({uploadId: {$in: uploadIds}}).select('_id');

    // Extract the _id values of the matching jobs
    const jobIds = jobs.map(job => job._id);

    // Find all results that reference any of the matching jobs
    const results = await Result.find({jobId: {$in: jobIds}}).select('output status executeDate');

    return results.map((result, index) => {
        return {
            output: result.output,
            status: result.status,
            executeDate: result.executeDate,
            fileUrl: getUrlFromId(uploadIds[index].toString(), uploads[index].filePath || '')
        }
    });
}
