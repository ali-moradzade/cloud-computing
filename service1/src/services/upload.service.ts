import {readFileSync} from "fs";
import {connectToDb, disconnectFromDb, Upload} from "../apis/db";

export async function saveToDb(
    path: string,
    email: string,
    inputs: string,
    language: string,
) {
    const fileContents = readFileSync(path, 'utf8');

    await connectToDb();

    const upload = new Upload({
        email,
        inputs,
        language,
        fileContents,
    });

    await upload.save();
}