import {model, Schema} from 'mongoose'

const PriceSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    createdAt: {
        type: Date,
        required: [true, 'createdAt is required'],
    },
    price: {
        type: Number,
        required: [true, 'price is required'],
    }
});

const AlertSubscriptionSchema = new Schema({
    email: {
        type: String,
        required: [true, 'email is required'],
    },
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    differencePercentage: Number,
});

const Price = model('price', PriceSchema);
const AlertSubscription = model('alertSubscription', AlertSubscriptionSchema);

export {Price, AlertSubscription}
