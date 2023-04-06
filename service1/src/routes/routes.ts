import {Request, Response, Router} from 'express';
import {Form} from "multiparty";
import {saveUpload} from "../services/upload.service";
import {createJob} from "../services/createJob.service";
import {getUrlFromId} from "../apis/s3";
import {Upload} from "../apis/db";

const router = Router();

router.post('/upload', async (req: Request, res: Response) => {
    let form = new Form();

    form.parse(req, async (err,
                           fields: {
                               email: string[];
                               inputs: string[];
                               language: string[]
                           },
                           files: {
                               file: {
                                   fieldName: string;
                                   originalFilename: string;
                                   path: string;
                                   headers: any[];
                                   size: number;
                               }[]
                           }
    ) => {
        if (err) {
            console.log(err);
        } else {
            const path = files.file[0].path;
            const email = fields.email[0];
            const inputs = fields.inputs[0];
            const language = fields.language[0];

            const uploadId = await saveUpload(path, email, inputs, language);
            await createJob(uploadId);

            res.send(`Successfully uploaded. URL: ${getUrlFromId(uploadId, path)}, Upload ID: ${uploadId}`);
        }
    });
});

router.post('/execute', async (req: Request, res: Response) => {
    const {id: uploadId} = req.body;

    const result = await createJob(uploadId);
    res.send(result);
});

router.post('/status', async (req: Request, res: Response) => {
    const {email} = req.body;
    res.send('Not implemented yet')
});

export {router};
