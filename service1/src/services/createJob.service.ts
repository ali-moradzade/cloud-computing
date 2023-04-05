import {publish} from "../apis/ampq";

export async function createJob(id: string) {
    await publish(id);
}
