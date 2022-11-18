const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');
const fs = require('fs');
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


// call S3 to retrieve upload file to specified bucket
const run = async (filePath, postId) => {
    const fileStream = fs.createReadStream(filePath);
    fileStream.on('error', function (err) {
        console.log('File Error', err);
    });

    uploadParams.Key = postId;
    uploadParams.Body = fileStream;

    try {
        const data = await s3.send(new PutObjectCommand(uploadParams));
        console.log('Success', data);
    } catch (err) {
        console.log('Error', err);
    }
};

module.exports = run;
