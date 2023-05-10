import * as dotenv from 'dotenv';
import express from 'express';
import {client} from "./client";

dotenv.config();

const app = express();
const port = process.env.PORT;
const key = 'hello';

app.get('/', async (req: any, res: any) => {
    res.send(await client.get(key));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
