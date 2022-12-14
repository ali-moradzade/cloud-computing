const imagga = require('../apis/imagga');
const db = require('../apis/db');
const mailgun = require('../apis/mailgun');

const Advertisement = db.Advertisement;

module.exports = async (postId) => {
    console.log('\n[2] --> Second Backend: Process Advertisement\n');
    console.log(`Received advertisement with id: ${postId}, processing ..`);

    // Get the URL of the image from database
    let url;
    try {
        console.log(`Getting image URL from database ..`);
        const ad = await Advertisement.findById(postId);
        url = ad.imageUrl;
        console.log(`\timageUrl: ${url}`);
    } catch (err) {
        console.log(`Error getting image URL from database: ${err}`);
        return false;
    }

    // Send the image to tagging system
    console.log('Sending image to tagging system ..');
    let state;
    let category;

    try {
        const response = await imagga(url);
        console.log(response);

        state = response.state;
        category = response.category;
    } catch (err) {
        console.log('Error sending image to tagging system: ' + err);
        return false;
    }

    // Save the results in the database
    try {
        console.log('Saving results in the database ..');
        await Advertisement.updateOne({_id: postId}, {state, category});
        console.log('\tResults saved successfully in the database ..');
    } catch (err) {
        console.log('Error saving results in the database: ' + err);
        return false;
    }

    // Get the email of the user from the database
    let email;
    try {
        console.log('Getting email of the user from the database ..');
        const ad = await Advertisement.findOne({_id: postId});
        email = ad.email;
        console.log(`\temail: ${email}\n`);
    } catch (err) {
        console.log('Error getting email of the user from the database: ' + err);
        return false;
    }

    // Email the user
    let subject;
    if (state === 'approved') {
        subject = 'Your advertisement has been approved';
    } else {
        subject = 'Your advertisement has been rejected';
    }

    let text = 'Your advertisement has been processed.\n';
    text += `The category is "${category}" and the state is "${state}".\n`;
    text += 'Link of your advertisement image: ' + url;

    try {
        console.log('Sending email to user ..');
        await mailgun(email, subject, text, url);
        console.log('\temail sent successfully');
    } catch (err) {
        console.log('Error sending email to user: ' + err);
        return false;
    }

    return true;
};