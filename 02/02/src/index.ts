import * as dotenv from 'dotenv';
import express, {urlencoded} from 'express';
import {client} from "./client";
import {shortenUrl} from "./urlShortener";

dotenv.config();

const app = express();
app.use(express.json());
app.use(urlencoded({extended: true}));

const port = process.env.PORT;
const key = 'hello';

app.post('/', async (req: any, res: any) => {
    const url = req.body.url;
    res.send(await shortenUrl(url));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
