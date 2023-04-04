const got = require('got');
const request = require('request-promise');
require('dotenv').config();

const apiKey = process.env.IMAGGA_API_KEY;
const apiSecret = process.env.IMAGGA_API_SECRET;

function doRequest(url) {
    return new Promise(function (resolve, reject) {
        request({
            url,
            auth: {
                username: apiKey,
                password: apiSecret
            }
        }, function (error, res, body) {
            if (!error && res.statusCode === 200) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    });
}

module.exports = async (imageUrl) => {
    const url = 'https://api.imagga.com/v2/tags?image_url=' + encodeURIComponent(imageUrl);
    try {
        const response = await doRequest(url);
        const result = JSON.parse(response);
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
        return null;
    }
};