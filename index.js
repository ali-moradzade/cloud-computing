const imagga = require('./apis/imagga');
const mailgun = require('./apis/mailgun');
const cloudamp = require('./apis/ampq');
const db = require('./apis/db');

// Working correctly
// (async () => {
//     const imageUrl = 'https://wallpapercave.com/wp/wp3503654.jpg';
//     const result = await imagga(imageUrl);
//
//     console.log(result);
// })();
// output: { state: 'approved', category: 'school bus' }

// (async () => {
//     const email = 'alimorizz1379@gmail.com';
//     const subject = 'Hello from Mailgun';
//     const text = 'Congratulations Ali!, you just sent an email with Mailgun!  You are truly awesome!';
//
//     await mailgun(email, subject, text);
// })();
// output: Works correctly
// {
//     id: '<20221119080744.1aa4294b63d6d7cb@sandbox0bf9dd8eca7340bca135c6f26cfd221f.mailgun.org>',
//         message: 'Queued. Thank you.'
// }

(async () => {
    await cloudamp.start();
    await cloudamp.publish('1');
    await cloudamp.publish('2');
    await cloudamp.publish('3');
})();

// Working correctly
// db.connect();
//
// setTimeout(() => {
//     db.disconnect();
// }, 5000);
