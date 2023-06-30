import express, {Request, Response} from "express";
import {json, urlencoded} from "body-parser";
import {router} from "./controllers";

const app = express();

app.use(json())
app.use(urlencoded({extended: true}))
app.use(router)

/**
 * Handle unmatched routes
 */
app.use(function (req: Request, res: Response) {
    res.json({
        error: {
            'message': 'Invalid Request',
            'statusCode': 404,
        },
        message: 'Your requested route does not exist'
    });
});

export {app}
