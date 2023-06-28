import {Request, Response, Router} from 'express';
import {subscribeService} from "./services/subscribe.service";
import {priceService} from "./services/price.service";

const router = Router();

router.get("/:name/price", async (req: Request, res: Response) => {
    const coinName = req.params.name;
    const result = await priceService(coinName);

    res.send({
        result
    })
});

router.post("/:name/subscribe", async (req: Request, res: Response) => {
    const coinName = req.params.name;
    const email: string = req.body.email;
    const differencePercentage: number = req.body.differencePercentage;

    const result = await subscribeService(email, coinName, differencePercentage);

    res.send({
        result
    })
});

export {router}