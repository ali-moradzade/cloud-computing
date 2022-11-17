const got = require('got');
require('dotenv').config();

const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;

module.exports = async (imageUrl) => {
    try {
        const url = 'https://api.imagga.com/v2/tags?image_url=' + encodeURIComponent(imageUrl);

        const response = await got(url, {username: apiKey, password: apiSecret});
        const result = JSON.parse(response.body);
        let tags = result.result.tags;

        for (let tag of tags) {
            let confidence = tag.confidence;
            let en = tag.tag.en;

            if (en.toLowerCase() === 'vehicle') {
                return confidence;
            }
        }

        return -1;
    } catch (error) {
        console.log(error.response.body);
    }
};