const db = require('../apis/db');
const s3 = require('../apis/s3');
const ampq = require('../apis/ampq');

const Advertisement = db.Advertisement;

module.exports = {
    async createAdvertisement(pathOfImage, description, email) {
        const advertisement = new Advertisement({
            description,
            email,
            state: 'pending',
            category: 'other',
            imageUrl: '',
        });
        const postId = advertisement._id.toString();

        try {
            // save the advertisement to the database
            await advertisement.save();
            console.log('Advertisement saved successfully to the database ..');
            console.log(advertisement);
            console.log();
        } catch (err) {
            console.log('Error in saving the advertisement to the database: ' + err);
            return null;
        }
        try {
            // upload the image to the s3 bucket
            await s3.uploadImage(pathOfImage, postId);
            console.log('Image uploaded successfully to the s3 bucket ..');
        } catch (err) {
            console.log('Error in uploading the image to the s3 bucket: ' + err);
            return null;
        }

        let imageUrl = s3.getUrlFromPostId(postId, pathOfImage);
        console.log('imageUrl: ' + imageUrl + '\n');

        try {
            // change the imageUrl of the advertisement
            await Advertisement.updateOne({_id: postId}, {imageUrl: imageUrl});
            console.log('ImageUrl of the advertisement updated successfully .. \n');
        } catch (err) {
            console.log('Error in updating the imageUrl of the advertisement: ' + err);
            return null;
        }

        try {
            // send the postId to the ampq queue
            ampq.publish(postId.toString());
            console.log(`Advertisement published to the queue with postId: ${postId} successfully .. \n`);
        } catch (err) {
            console.log('Error in sending the advertisement to the queue: ' + err);
            return null;
        }

        return postId;
    },

    async getAdvertisement(id) {
        const advertisement = await Advertisement.findOne({_id: id});
        const state = advertisement.state;
        if (state === 'approved') {
            return advertisement;
        } else if (state === 'pending') {
            return 'Your advertisement is still pending';
        } else {
            return 'Your advertisement was rejected';
        }
    }
};
