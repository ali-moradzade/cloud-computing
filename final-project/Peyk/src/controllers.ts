import {Request, Response, Router} from 'express';

const router = Router();

router.get("/:name/price", async (req: Request, res: Response) => {
    const coinName = req.params.name;
    res.send({})
});

router.post("/:name/subscribe", async (req: Request, res: Response) => {
    const coinName = req.params.name;
    const email: string = req.body.email;
    const differencePercentage: number = req.body.differencePercentage;

    res.send({})
});

export {router}