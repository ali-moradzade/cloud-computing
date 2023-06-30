import {Request, Response, Router} from 'express';
import {validate} from "class-validator";
import {subscribeService} from "./services/subscribe.service";
import {priceService} from "./services/price.service";
import {CoinName, SubscribeDto} from "./dtos/subscribe.dto";

const router = Router();

router.get("/:name/price", async (req: Request, res: Response) => {
    const coinName = req.params.name;

    /**
     * Validate Request
     */
    const names: string[] = [CoinName.BITCOIN, CoinName.DOCOIN]
    if (!names.includes(coinName)) {
        res.status(400).json({error: `invalid coin name, supported coins: ${names}`});
        return
    }

    const result = await priceService(coinName);

    res.json({
        prices: result,
    })
});

router.post("/:name/subscribe", async (req: Request, res: Response) => {
    const coinName = req.params.name;

    /**
     * Validate Request
     */
    const names: string[] = [CoinName.BITCOIN, CoinName.DOCOIN]
    if (!names.includes(coinName)) {
        res.status(400).json({error: `invalid coin name, supported coins: ${names}`});
        return
    }

    const dto = new SubscribeDto(req.body);
    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
        let errorMessage = Object.values(validationErrors[0].constraints as { [key: string]: string })[0]

        if (!req.body.hasOwnProperty('email')) {
            errorMessage = 'email is required';
        }
        if (!req.body.hasOwnProperty('differencePercentage')) {
            errorMessage = 'differencePercentage is required';
        }

        res.status(400).json({error: errorMessage});
        return;
    }

    const result = await subscribeService(dto.email, coinName, dto.differencePercentage);

    res.json({
        result
    })
});

export {router}