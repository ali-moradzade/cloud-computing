import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3'
import * as dotenv from 'dotenv';
import {extname} from 'path';
import {createReadStream, ReadStream} from 'fs';

dotenv.config();

// Create an S3 client service object
const s3 = new S3Client({
    region: 'default',
    endpoint: process.env.S3_ENDPOINT,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY || '',
        secretAccessKey: process.env.S3_SECRET_KEY || '',
    },
});

const uploadParams: {
    Bucket: string;
    Key: string;
    ACL: string;
    Body: ReadStream;
} = {
    Bucket: process.env.S3_BUCKET || '', // bucket name
    Key: 'object-name', // the name of the selected file
    ACL: 'public-read', // 'private' | 'public-read'
    Body: createReadStream(''), // the file stream
};

function getFileNameFromId(uploadId: string, path: string) {
    return uploadId + extname(path);
}

export function getUrlFromId(uploadId: string, path: string) {
    const objectName = getFileNameFromId(uploadId, path);
    return `https://${process.env.S3_BUCKET}.s3.ir-thr-at1.arvanstorage.com/${objectName}`;
}

// call S3 to retrieve upload file to specified bucket
export async function uploadImage(path: string, id: string) {
    const fileName = getFileNameFromId(id, path);
    const fileStream = createReadStream(path);

    uploadParams.Key = fileName;
    uploadParams.Body = fileStream;

    try {
        const data = await s3.send(new PutObjectCommand(uploadParams));
        console.log('Success', data);
    } catch (err) {
        console.log('Error', err);
    }
}
