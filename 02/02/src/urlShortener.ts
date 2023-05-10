const axios = require('axios');

export async function shortenUrl(url: string): Promise<string> {
    const data = JSON.stringify({
        "destination": url,
        "domain": {
            "fullName": "rebrand.ly"
        }
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.rebrandly.com/v1/links',
        headers: {
            'Content-Type': 'application/json',
            'apikey': process.env.API_KEY || ''
        },
        data : data
    };

    const result: {
        data: {
            shortUrl: string
        }
    } = await axios.request(config)

    return result.data.shortUrl;
}



