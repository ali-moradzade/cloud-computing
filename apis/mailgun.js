const mailgun = require("mailgun-js");
require('dotenv').config();

const DOMAIN = process.env.MAILGUN_DOMAIN;
const API_KEY = process.env.MAILGUN_API_KEY;

const mg = mailgun({apiKey: API_KEY, domain: DOMAIN});

module.exports = async (email, subject, text) => {
    const data = {
        from: `<mailgun@${DOMAIN}>`,
        to: email,
        subject: subject,
        text: text
    };

    mg.messages().send(data, (error, body) => {
        if (error) {
            console.log(error);
        } else {
            console.log(body);
        }
    });
};
