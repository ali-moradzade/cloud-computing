import {connectToDb, disconnectFromDb, Upload} from "../apis/db";
import {uploadImage} from "../apis/s3";

/**
 * @param path - path of the file
 * @param email - email of the user
 * @param inputs - inputs of the file
 * @param language - language of the file
 *
 * @returns {Promise<string>}
 *
 * Saves the file to s3 and saves the info in the database
 */
export async function saveUpload(
    path: string,
    email: string,
    inputs: string,
    language: string,
) {
    /**
     * Store info in the database
     */
    await connectToDb();

    const upload = new Upload({
        email,
        inputs,
        language,
        filePath: path,
    });

    await upload.save();
    await disconnectFromDb();

    /**
     * Save file to s3
     */
    await uploadImage(path, upload._id.toString());

    return upload._id.toString();
}