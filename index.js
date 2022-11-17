// const imagga = require('./apis/imagga');
// const mailgun = require('./apis/mailgun');
const cloudamp = require('./apis/ampq');
const {publish} = require("./apis/ampq");

// (async () => {
//     const imageUrl = 'https://wallpapercave.com/wp/wp3503654.jpg';
//     const result = await imagga(imageUrl);
//
//     console.log(result);
// })();

// (async () => {
//     const email = 'alimorizz1379@gmail.com';
//     const subject = 'Hello from Mailgun';
//     const text = 'Congratulations Ali!, you just sent an email with Mailgun!  You are truly awesome!';
//
//     await mailgun(email, subject, text);
// })();
//


cloudamp.start();

const delay = ms => new Promise(res => setTimeout(res, ms));
(async () => {
    for (let i = 0; i < 10; i++) {
        await delay(1000);
        cloudamp.publish(i.toString());
    }
})();
