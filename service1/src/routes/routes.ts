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

            res.send(`successfully uploaded. url: ${getUrlFromId(uploadId, path)}`);
        }
    });
});

router.post('/execute', async (req: Request, res: Response) => {
    const {id} = req.body;

    // Get this upload from db
    const upload = await Upload.findById(id);

    // Check enable
    if (upload) {
        if (!upload.enable) {
            res.send('This upload is disabled');
            return;
        } else {
            // Create job
            await createJob(id);

            res.send('Job created');
        }
    } else {
        res.send('Upload not found');
    }

});

export {router};
