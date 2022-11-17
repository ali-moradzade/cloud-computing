const imagga = require('./apis/imagga');
// const mailgun = require('./apis/mailgun');

(async () => {
    const imageUrl = 'https://wallpapercave.com/wp/wp3503654.jpg';
    const result = await imagga(imageUrl);

    console.log(result);
})();

// (async () => {
//     const email = 'alimorizz1379@gmail.com';
//     const subject = 'Hello from Mailgun';
//     const text = 'Congratulations Ali!, you just sent an email with Mailgun!  You are truly awesome!';
//
//     await mailgun(email, subject, text);
// })();
//
