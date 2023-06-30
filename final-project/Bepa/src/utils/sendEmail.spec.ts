import {describe, expect, it} from "vitest";
import {sendEmail} from "./sendEmail";

describe('sendEmail', () => {
    it('should be able to send email', async () => {
        // Arrange
        const email = 'alimorizz1379@gmail.com';
        const subject = 'testing';
        const text = 'hello from mailgun';

        // Act
        const result = await sendEmail(email, subject, text);

        // Assert
        expect(result).toEqual(true)
    })
})
