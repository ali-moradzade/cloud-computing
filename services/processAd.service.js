const s3 = require('../apis/s3');
const imagga = require('../apis/imagga');
const db = require('../apis/db');
const mailgun = require('../apis/mailgun');

const Advertisement = db.Advertisement;

module.exports = async (postId) => {
    console.log(`[AMQP] Received message: ${postId}, processing ..`);

    // Get the URL of the image
    const url = s3.getUrlFromPostId(postId);

    // Send the image to tagging system
    const response = await imagga(url);

    // Save the results in the database
    const state = response.state;
    const category = response.category;

    await Advertisement.updateOne({_id: postId}, {state, category});
    const post = await Advertisement.findOne({_id: postId});

    // Email the user
    let subject;
    if (state === 'approved') {
        subject = 'Your advertisement has been approved';
    } else {
        subject = 'Your advertisement has been rejected';
    }

    const email = post.email;
    const text = `Your advertisement has been processed. The category is ${category} and the state is ${state}.`;

    await mailgun(email, subject, text);
};