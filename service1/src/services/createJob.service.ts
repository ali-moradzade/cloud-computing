import {publish} from "../apis/ampq";

export async function createJob(uploadId: string) {
    await publish(uploadId);
}
