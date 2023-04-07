"use strict";
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
exports.createJob = void 0;
const ampq_1 = require("../apis/ampq");
const db_1 = require("../apis/db");
function createJob(uploadId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Get this upload from db
        const upload = yield db_1.Upload.findById(uploadId);
        // Check upload found
        if (upload) {
            // Check upload is enabled
            if (!upload.enable) {
                return 'This upload is disabled';
            }
            else {
                // Create job
                yield (0, ampq_1.publish)(uploadId);
                yield createJob(uploadId);
                return `Job created. Upload ID: ${uploadId}`;
            }
        }
        else {
            return 'Upload not found';
        }
    });
}
exports.createJob = createJob;
