const s3 = require('../apis/s3');
const imagga = require('../apis/imagga');
const db = require('../apis/db');
const mailgun = require('../apis/mailgun');

const Advertisement = db.Advertisement;

module.exports = async (postId) => {
    console.log(`[AMQP] Received message: ${postId}, processing ..`);

    // Get the URL of the image
    console.log('getting url of post from s3 ..');
    const url = s3.getUrlFromPostId(postId);
    console.log('got: ' + url + '\n');

    // Send the image to tagging system
    console.log('sending image to tagging system ..');
    const response = await imagga(url);
    console.log('got: ' + JSON.stringify(response) + '\n');

    // Save the results in the database
    const state = response.state;
    const category = response.category;

    console.log('saving results in the database ..');
    await Advertisement.updateOne({_id: postId}, {state, category});
    const post = await Advertisement.findOne({_id: postId});
    console.log('got: ' + JSON.stringify(post) + '\n');

    // Email the user
    let subject;
    if (state === 'approved') {
        subject = 'Your advertisement has been approved';
    } else {
        subject = 'Your advertisement has been rejected';
    }

    const email = post.email;
    const text = `Your advertisement has been processed. The category is ${category} and the state is ${state}.`;

    console.log('sending email to user ..');
    await mailgun(email, subject, text);
    console.log('email sent successfully\n');
};