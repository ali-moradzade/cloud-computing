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
exports.statusService = void 0;
const db_1 = require("../apis/db");
const s3_1 = require("../apis/s3");
function statusService(email) {
    return __awaiter(this, void 0, void 0, function* () {
        // Find all uploads matching the given email
        const uploads = yield db_1.Upload.find({ email }).select('_id');
        // Extract the _id values of the matching uploads
        const uploadIds = uploads.map(upload => upload._id);
        // Find all jobs that reference any of the matching uploads
        const jobs = yield db_1.Job.find({ uploadId: { $in: uploadIds } }).select('_id');
        // Extract the _id values of the matching jobs
        const jobIds = jobs.map(job => job._id);
        // Find all results that reference any of the matching jobs
        const results = yield db_1.Result.find({ jobId: { $in: jobIds } }).select('output status executeDate');
        return results.map((result, index) => {
            return {
                output: result.output,
                status: result.status,
                executeDate: result.executeDate,
                fileUrl: (0, s3_1.getUrlFromId)(uploadIds[index].toString(), uploads[index].filePath || '')
            };
        });
    });
}
exports.statusService = statusService;
