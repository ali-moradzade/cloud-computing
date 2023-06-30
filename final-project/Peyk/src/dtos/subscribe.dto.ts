import {IsEmail, IsNotEmpty, IsNumber, IsPositive, IsString} from "class-validator";

export enum CoinName {
    BITCOIN = 'bitcoin',
    DOCOIN = 'docoin',
}

export class SubscribeDto {
    @IsEmail({}, {
        message: "email is not valid"
    })
    @IsNotEmpty({
        message: "email should not be empty"
    })
    @IsString({
        message: "email should be string"
    })
    email: string;

    @IsPositive({
        message: "differencePercentage should be positive"
    })
    @IsNumber({}, {
        message: "differencePercentage should be number"
    })
    differencePercentage: number;

    constructor(data: Partial<SubscribeDto>) {
        Object.assign(this, data);
    }
}
