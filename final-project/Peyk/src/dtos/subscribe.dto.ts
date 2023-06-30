import {IsEmail, IsNotEmpty, IsNumber, IsPositive, IsString} from "class-validator";

export class SubscribeDto {
    @IsString({
        message: "email should be string"
    })
    @IsNotEmpty({
        message: "email should not be empty"
    })
    @IsEmail({}, {
        message: "email is not valid"
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
