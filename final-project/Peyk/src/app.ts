import express from "express";
import {json, urlencoded} from "body-parser";
import {router} from "./controllers";

const app = express();

app.use(json())
app.use(urlencoded({extended: true}))
app.use(router)

export {app}
