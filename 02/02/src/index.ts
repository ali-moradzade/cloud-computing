import * as dotenv from 'dotenv';
import express, {urlencoded} from 'express';
import {client} from "./client";
import {shortenUrl} from "./urlShortener";

dotenv.config();

const app = express();
app.use(express.json());
app.use(urlencoded({extended: true}));

const port = process.env.PORT;

interface UrlResponse {
    longUrl: string;
    shortUrl: string;
    isCached: boolean;
    hostname: string;
}

app.post('/', async (req: any, res: any) => {
    const url = req.body.url;
    const value = await client.get(url);

    if (value) {
        const response: UrlResponse = {
            longUrl: url,
            shortUrl: value,
            isCached: true,
            hostname: req.hostname
        };
        res.send(response);
    } else {
        const shortUrl = await shortenUrl(url);
        await client.set(url, shortUrl, {
            EX: parseInt(process.env.EXPIRATION_TIME || '3600')
        });

        const response: UrlResponse = {
            longUrl: url,
            shortUrl: shortUrl,
            isCached: false,
            hostname: req.hostname
        };

        res.send(response);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
