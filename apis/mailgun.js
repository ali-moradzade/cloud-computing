require('dotenv').config();

const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;

const mailgun = require("mailgun-js")({apiKey, domain});

module.exports = async (email, subject, text, imageUrl) => {
    const data = {
        from: `<mailgun@${domain}>`,
        to: email,
        subject: subject,
        text: text,
    };

    await mailgun.messages().send(data);
};
