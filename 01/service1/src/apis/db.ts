import {connect, model, Schema} from 'mongoose';
import * as dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.DB_URL || '';

export async function connectToDb() {
    await connect(dbUrl)
}

/**
 * Upload Schema
 */
const UploadSchema = new Schema({
    email: {
        type: String,
        required: [true, 'email is required'],
    },
    inputs: String,
    language: String,
    filePath: String,
    enable: {
        type: Boolean,
        default: true,
    },
});

const Upload = model('upload', UploadSchema);

export {Upload};

/**
 * Result Schema
 */
const ResultSchema = new Schema({
    // jobId is foreign key to Job
    jobId: {
        type: Schema.Types.ObjectId,
        ref: 'job',
        required: [true, 'jobId is required'],
    },
    // output is program output
    output: {
        type: String,
        required: [true, 'output is required'],
    },
    // status -- in-progress, done, default is in-progress
    status: {
        type: String,
        default: 'in-progress',
    },
    // executeDate is date of execution
    executeDate: {
        type: Date,
        default: Date.now,
    },
});

const Result = model('result', ResultSchema);

export {Result};

/**
 * Job Schema
 */
const JobSchema = new Schema({
    // uploadId is foreign key to Upload
    uploadId: {
        type: Schema.Types.ObjectId,
        ref: 'upload',
        required: [true, 'uploadId is required'],
    },
    // job is a query string
    job: {
        type: String,
        required: [true, 'job is required'],
    },
    // status -- none, executed
    status: {
        type: String,
        default: 'none',
    },
});

const Job = model('job', JobSchema);

export {Job};
