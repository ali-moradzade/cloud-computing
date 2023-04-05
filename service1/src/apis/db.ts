import {Schema, connect, disconnect, model} from 'mongoose';
import * as dotenv from "dotenv";

dotenv.config();

const dbUrl = `mongodb://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@gina.iran.liara.ir:${process.env.DB_PORT}/my-app?authSource=admin`;

export async function connectToDb() {
    try {
        await connect(dbUrl)
        console.log('Connected to Liara MongoDB ..')
    } catch (err) {
        console.error('Could not connect to MongoDB!', err)
    }
}

export async function disconnectFromDb() {
    try {
        await disconnect()
        console.log('Disconnected from MongoDB')
    } catch (err) {
        console.error('Could not disconnect from MongoDB!', err)
    }
}

const UploadSchema = new Schema({
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

const Upload = model('upload', UploadSchema);

export {Upload};
