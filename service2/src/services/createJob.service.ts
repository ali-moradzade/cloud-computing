import {Upload, connectToDb, disconnectFromDb, Job} from "../apis/db";
import {readFileSync} from "fs";

export async function createJob(uploadId: string) {
    await connectToDb();

    // Get the upload from the database
    const upload = await Upload.findById(uploadId);

    // Take
    if (!upload) {
        throw new Error('Upload not found');
    }

    const {inputs, language, filePath} = upload;
    const content = readFileSync(filePath, 'utf8');

    // make a query string from: inputs, language, content
    const job = `inputs=${inputs}&language=${language}&content=${content}`;

    // save the job to the database
    const newJob = new Job({
        uploadId,
        job,
    });

    await newJob.save();

    await disconnectFromDb();

    return newJob;
}
