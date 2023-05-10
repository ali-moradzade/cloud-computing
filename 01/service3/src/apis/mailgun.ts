import * as dotenv from "dotenv";
import mailgun from 'mailgun-js';

dotenv.config();

const apiKey = process.env.MAILGUN_API_KEY || '';
const domain = process.env.MAILGUN_DOMAIN || '';

const mailgunClient = mailgun({apiKey, domain});

export async function sendEmail(email: string, subject: string, text: string) {
    const data = {
        from: `<mailgun@${domain}>`,
        to: email,
        subject: subject,
        text: text,
    };

    await mailgunClient.messages().send(data);
}
