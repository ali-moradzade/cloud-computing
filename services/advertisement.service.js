const db = require('../apis/db');
const s3 = require('../apis/s3');
const path = require('path');
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

        // save the advertisement to the database
        await advertisement.save();

        // upload the image to the s3 bucket
        const imageName = advertisement._id.toString() + path.extname(pathOfImage);
        const imageUrl = await s3.uploadImageAndCreateURL(pathOfImage, imageName);

        // change the imageUrl of the advertisement
        await Advertisement.updateOne({_id: advertisement._id.toString()}, {imageUrl: imageUrl});

        // send the advertisement to the queue
        ampq.publish(advertisement._id.toString());

        return advertisement._id.toString();
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
