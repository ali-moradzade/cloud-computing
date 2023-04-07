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
exports.Job = exports.Result = exports.Upload = exports.connectToDb = void 0;
const mongoose_1 = require("mongoose");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const dbUrl = process.env.DB_URL || '';
function connectToDb() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, mongoose_1.connect)(dbUrl);
    });
}
exports.connectToDb = connectToDb;
/**
 * Upload Schema
 */
const UploadSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
    },
    inputs: String,
    language: String,
    filePath: String,
    enable: {
        type: Boolean,
        default: true,
    },
});
const Upload = (0, mongoose_1.model)('upload', UploadSchema);
exports.Upload = Upload;
/**
 * Result Schema
 */
const ResultSchema = new mongoose_1.Schema({
    // jobId is foreign key to Job
    jobId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
const Result = (0, mongoose_1.model)('result', ResultSchema);
exports.Result = Result;
/**
 * Job Schema
 */
const JobSchema = new mongoose_1.Schema({
    // uploadId is foreign key to Upload
    uploadId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
const Job = (0, mongoose_1.model)('job', JobSchema);
exports.Job = Job;
