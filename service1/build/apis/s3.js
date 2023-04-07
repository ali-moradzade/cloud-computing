"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = exports.getUrlFromId = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const dotenv = __importStar(require("dotenv"));
const path_1 = require("path");
const fs_1 = require("fs");
dotenv.config();
// Create an S3 client service object
const s3 = new client_s3_1.S3Client({
    region: 'default',
    endpoint: process.env.S3_ENDPOINT,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY || '',
        secretAccessKey: process.env.S3_SECRET_KEY || '',
    },
});
const uploadParams = {
    Bucket: process.env.S3_BUCKET || '',
    Key: 'object-name',
    ACL: 'public-read',
    Body: (0, fs_1.createReadStream)(''), // the file stream
};
function getFileNameFromId(uploadId, path) {
    return uploadId + (0, path_1.extname)(path);
}
function getUrlFromId(uploadId, path) {
    const objectName = getFileNameFromId(uploadId, path);
    return `https://${process.env.S3_BUCKET}.s3.ir-thr-at1.arvanstorage.com/${objectName}`;
}
exports.getUrlFromId = getUrlFromId;
// call S3 to retrieve upload file to specified bucket
function uploadImage(path, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileName = getFileNameFromId(id, path);
        const fileStream = (0, fs_1.createReadStream)(path);
        uploadParams.Key = fileName;
        uploadParams.Body = fileStream;
        try {
            const data = yield s3.send(new client_s3_1.PutObjectCommand(uploadParams));
            console.log('Success', data);
        }
        catch (err) {
            console.log('Error', err);
        }
    });
}
exports.uploadImage = uploadImage;
