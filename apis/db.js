const mongoose = require('mongoose');
require('dotenv').config();

const Schema = mongoose.Schema;
const dbUrl = `mongodb://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@gina.iran.liara.ir:${process.env.DB_PORT}/my-app?authSource=admin`;

exports.connect = () => {
    mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        authSource: 'admin'
    })
        .then(() => console.log('Connected to Liara MongoDB ..'))
        .catch(err => console.error('Could not connect to MongoDB!', err));
};

exports.disconnect = () => {
    mongoose.disconnect()
        .then(() => console.log('Disconnected from MongoDB'))
        .catch(err => console.error('Could not disconnect from MongoDB!', err));
};

const AdvertisementSchema = new Schema({
    description: {
        type: String,
        required: [true, 'description is required'],
        validate: {
            validator: (text) => text.length <= 180,
            message: "Text must be less than 180 characters"
        },
    },
    email: String,
    state: String,
    category: String,
    imageUrl: String,
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Advertisement = mongoose.model('advertisement', AdvertisementSchema);
exports.Advertisement = Advertisement;
