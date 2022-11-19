const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Create an S3 client service object
const s3 = new S3Client({
    region: 'default',
    endpoint: process.env.S3_ENDPOINT,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
    },
});

const uploadParams = {
    Bucket: process.env.S3_BUCKET, // bucket name
    Key: 'object-name', // the name of the selected file
    ACL: 'public-read', // 'private' | 'public-read'
    Body: 'BODY',
};

function getImageNameFromPostId(postId, pathOfImage) {
    return postId + path.extname(pathOfImage);
}

// call S3 to retrieve upload file to specified bucket
const uploadImage = async (filePath, postId) => {
    const imageName = getImageNameFromPostId(postId, filePath);
    const fileStream = fs.createReadStream(filePath);
    fileStream.on('error', function (err) {
        console.log('File Error', err);
    });

    uploadParams.Key = imageName;
    uploadParams.Body = fileStream;

    try {
        const data = await s3.send(new PutObjectCommand(uploadParams));
        console.log('Success', data);
    } catch (err) {
        console.log('Error', err);
    }
};

const getUrlFromPostId = (postId, pathOfImage) => {
    const objectName = getImageNameFromPostId(postId, pathOfImage);
    return `https://${process.env.S3_BUCKET}.s3.ir-thr-at1.arvanstorage.com/${objectName}`;
};

exports.getImageNameFromPostId = getImageNameFromPostId;
exports.uploadImage = uploadImage;
exports.getUrlFromPostId = getUrlFromPostId;
