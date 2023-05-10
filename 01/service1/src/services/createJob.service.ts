import {publish} from "../apis/ampq";
import {Upload} from "../apis/db";

export async function createJob(uploadId: string) {
    // Get this upload from db
    const upload = await Upload.findById(uploadId);

    // Check upload found
    if (upload) {
        // Check upload is enabled
        if (!upload.enable) {
            return 'This upload is disabled'
        } else {
            // Create job
            await publish(uploadId);

            return `Job created. Upload ID: ${uploadId}`
        }
    } else {
        return 'Upload not found'
    }
}
