const imagga = require('../apis/imagga');
const db = require('../apis/db');
const mailgun = require('../apis/mailgun');

const Advertisement = db.Advertisement;

module.exports = async (postId) => {
    console.log(`Received message: ${postId}, processing ..\n`);

    // Get the URL of the image from database
    let url;
    try {
        console.log(`Getting image URL from database ..`);
        const ad = await Advertisement.findById(postId);
        url = ad.imageUrl;
        console.log(`Got image URL: ${url}\n`);
    } catch (err) {
        console.log(`Error getting image URL from database: ${err}`);
        return;
    }

    // Send the image to tagging system
    console.log('Sending image to tagging system ..');
    let state;
    let category;

    try {
        const response = await imagga(url);
        console.log('Got response from tagging system:');
        console.log(response);
        console.log();

        state = response.state;
        category = response.category;
    } catch (err) {
        console.log('Error sending image to tagging system: ' + err);
        return;
    }

    // Save the results in the database
    try {
        console.log('Saving results in the database ..');
        await Advertisement.updateOne({_id: postId}, {state, category});
        console.log('Results saved successfully in the database ..\n');
    } catch (err) {
        console.log('Error saving results in the database: ' + err);
        return;
    }

    // Get the email of the user from the database
    let email;
    try {
        console.log('Getting email of the user from the database ..');
        const ad = await Advertisement.findOne({_id: postId});
        email = ad.email;
        console.log(`Got email: ${email}\n`);
    } catch (err) {
        console.log('Error getting email of the user from the database: ' + err);
        return;
    }

    // Email the user
    let subject;
    if (state === 'approved') {
        subject = 'Your advertisement has been approved';
    } else {
        subject = 'Your advertisement has been rejected';
    }

    const text = `Your advertisement has been processed. The category is ${category} and the state is ${state}.`;

    try {
        console.log('Sending email to user ..');
        await mailgun(email, subject, text);
        console.log('email sent successfully\n');
    } catch (err) {
        console.log('Error sending email to user: ' + err);
    }
};