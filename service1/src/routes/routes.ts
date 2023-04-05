import {Request, Response, Router} from 'express';
import {Form} from "multiparty";
import {saveUpload} from "../services/upload.service";

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

            const url = await saveUpload(path, email, inputs, language);

            res.send(`successfully uploaded. url: ${url}`);
        }
    });
});

export {router};
