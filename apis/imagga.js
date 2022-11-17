const got = require('got');
require('dotenv').config();

const apiKey = process.env.IMAGGA_API_KEY;
const apiSecret = process.env.IMAGGA_API_SECRET;

module.exports = async (imageUrl) => {
    try {
        const url = 'https://api.imagga.com/v2/tags?image_url=' + encodeURIComponent(imageUrl);

        const res = await got(url, {username: apiKey, password: apiSecret});
        const result = JSON.parse(res.body);
        let tags = result.result.tags;

        let ourResponse = {
            state: 'rejected'
        };

        for (let tag of tags) {
            let confidence = tag.confidence;
            let en = tag.tag.en;

            if (en.toLowerCase() === 'vehicle') {
                if (confidence >= 50) {
                    ourResponse.state = 'approved';
                    break;
                }
            }
        }

        ourResponse.category = tags[0].tag.en;
        return ourResponse;
    } catch (error) {
        console.log(error);
    }
};