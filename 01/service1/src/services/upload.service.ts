import {Upload} from "../apis/db";
import {uploadImage} from "../apis/s3";

/**
 * @param path - path of the file
 * @param email - email of the user
 * @param inputs - inputs of the file
 * @param language - language of the file
 *
 * @returns {Promise<string>} - saves the file to s3 and saves the info in the database, returns upload id, in db
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
    const upload = new Upload({
        email,
        inputs,
        language,
        filePath: path,
    });

    await upload.save();
    console.log(`Saved upload with id: ${upload._id.toString()}`)

    /**
     * Save file to s3
     */
    await uploadImage(path, upload._id.toString());
    console.log(`Saved file to s3 with id: ${upload._id.toString()}`);

    return upload._id.toString();
}