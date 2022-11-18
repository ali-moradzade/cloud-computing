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

        // save the advertisement to the database
        await advertisement.save();

        // upload the image to the s3 bucket
        await s3.uploadImage(pathOfImage, postId);

        // change the imageUrl of the advertisement
        await Advertisement.updateOne({_id: postId}, {imageUrl: s3.getUrlFromPostId(postId)});

        // send the advertisement to the queue
        ampq.publish(postId);

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
