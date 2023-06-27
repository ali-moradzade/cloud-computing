import {describe, it} from "vitest";
import {sendEmail} from "./sendEmail";

describe.skip('sendEmail', () => {
    it('should be able to send email', async () => {
        // Arrange
        const email = 'alimorizz1379@gmail.com';
        const subject = 'testing';
        const text = 'hello from mailgun';

        // Act
        const result = await sendEmail(email, subject, text);

        // Assert
        console.log(result)
    })
})
