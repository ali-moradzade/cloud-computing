const mongoose = require('mongoose');
require('dotenv').config();

const dbUrl = `mongodb://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@gina.iran.liara.ir:${process.env.DB_PORT}/my-app?authSource=admin`;

exports.connect = () => {
    return mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        authSource: 'admin'
    })
}
