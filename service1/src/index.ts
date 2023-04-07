import express from 'express';
import {router} from "./routes/routes";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import {connectToDb} from "./apis/db";

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({keys: ['just needs to be a string']}))
app.use(router);

connectToDb().then(() => {
    console.log('Connected to database ..');
});

app.listen(3000, () => {
    console.log('Listening on port 3000 ..');
});
