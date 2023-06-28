import {Request, Response, Router} from 'express';

const router = Router();

router.get("/:name/price", async (req: Request, res: Response) => {
    res.send({
        hello: 'world'
    })
});

router.post("/:name/subscribe", async (req: Request, res: Response) => {
    res.send({
        body: req.body
    })
});

export {router}