import {publish} from "../apis/ampq";

export async function createJobService(id: string) {
    await publish(id);
}
