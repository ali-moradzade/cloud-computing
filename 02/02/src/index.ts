import * as dotenv from 'dotenv';
import {createClient} from 'redis';
import express from 'express';

dotenv.config();

const app = express();
const port = process.env.PORT;
const key = 'hello';

const client = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '6379')
    }
});

client.on('error', (err) => console.error(err));
client.connect();

app.get('/', async (req: any, res: any) => {
    res.send(await client.get(key));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
