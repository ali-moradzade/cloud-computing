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
exports.saveUpload = void 0;
const db_1 = require("../apis/db");
const s3_1 = require("../apis/s3");
/**
 * @param path - path of the file
 * @param email - email of the user
 * @param inputs - inputs of the file
 * @param language - language of the file
 *
 * @returns {Promise<string>} - saves the file to s3 and saves the info in the database, returns upload id, in db
 */
function saveUpload(path, email, inputs, language) {
    return __awaiter(this, void 0, void 0, function* () {
        /**
         * Store info in the database
         */
        const upload = new db_1.Upload({
            email,
            inputs,
            language,
            filePath: path,
        });
        yield upload.save();
        /**
         * Save file to s3
         */
        console.log(path);
        yield (0, s3_1.uploadImage)(path, upload._id.toString());
        return upload._id.toString();
    });
}
exports.saveUpload = saveUpload;
