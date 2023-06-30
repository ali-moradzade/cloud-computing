import mailgun from 'mailgun-js';
import {BEPA} from "../config";

const mailgunClient = mailgun({
    apiKey: BEPA.mailgun.apiKey,
    domain: BEPA.mailgun.domain
});

// TODO: not sending email
export async function sendEmail(email: string, subject: string, text: string) {
    const data = {
        from: `<mailgun@${BEPA.mailgun.domain}>`,
        to: email,
        subject: subject,
        text: text,
    };

    // await mailgunClient.messages().send(data);
    console.log(data)
    return true;
}
