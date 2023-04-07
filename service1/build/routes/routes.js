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
exports.router = void 0;
const express_1 = require("express");
const multiparty_1 = require("multiparty");
const upload_service_1 = require("../services/upload.service");
const createJob_service_1 = require("../services/createJob.service");
const router = (0, express_1.Router)();
exports.router = router;
router.post('/upload', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let form = new multiparty_1.Form();
    form.parse(req, (err, fields, files) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.log(err);
        }
        else {
            const path = files.file[0].path;
            const email = fields.email[0];
            const inputs = fields.inputs[0];
            const language = fields.language[0];
            const uploadId = yield (0, upload_service_1.saveUpload)(path, email, inputs, language);
            // await createJob(uploadId);
            // res.send(`Successfully uploaded. URL: ${getUrlFromId(uploadId, path)}, Upload ID: ${uploadId}`);
            console.log(fields, files);
            res.send('hello');
        }
    }));
}));
router.post('/execute', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: uploadId } = req === null || req === void 0 ? void 0 : req.body;
    const result = yield (0, createJob_service_1.createJob)(uploadId);
    res.send(result);
}));
