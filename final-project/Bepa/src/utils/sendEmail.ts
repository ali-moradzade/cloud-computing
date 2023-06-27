import * as dotenv from "dotenv";
import mailgun from 'mailgun-js';
import {BEPA} from "../config";

dotenv.config();

const mailgunClient = mailgun({
    apiKey: BEPA.mailgun.apiKey,
    domain: BEPA.mailgun.domain
});

export async function sendEmail(email: string, subject: string, text: string) {
    const data = {
        from: `<mailgun@${BEPA.mailgun.domain}>`,
        to: email,
        subject: subject,
        text: text,
    };

    await mailgunClient.messages().send(data);
}
