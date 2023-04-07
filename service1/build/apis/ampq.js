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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publish = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
/**
 * Use closure to cache the connection
 */
const connection = (function () {
    let conn;
    return function () {
        return __awaiter(this, void 0, void 0, function* () {
            if (!conn) {
                conn = yield amqplib_1.default.connect(process.env.CLOUDAMQP_URL || 'amqp://localhost');
            }
            return conn;
        });
    };
})();
function publish(uploadId) {
    return __awaiter(this, void 0, void 0, function* () {
        const queue = process.env.QUEUE_NAME || 'queue';
        const conn = yield connection();
        const ch2 = yield conn.createChannel();
        yield ch2.assertQueue(queue);
        ch2.sendToQueue(queue, Buffer.from(uploadId));
    });
}
exports.publish = publish;
