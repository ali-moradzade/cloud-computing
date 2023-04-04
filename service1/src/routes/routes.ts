import {Request, Response, Router} from 'express';
import {Form} from "multiparty";

const router = Router();

router.post('/upload', (req: Request, res: Response) => {
    // TODO
    let form = new Form();

    form.parse(req, async (err, fields: { inputs: string }, files) => {
        if (err) {
            console.log(err);
        } else {
            let pathOfFile = files.file[0].path;
            let description = fields.inputs[0];

            console.log('Form Data:');
            console.log({
                pathOfFile,
                description
            });


            res.send('successfully uploaded');
        }
    });
});

export {router};
