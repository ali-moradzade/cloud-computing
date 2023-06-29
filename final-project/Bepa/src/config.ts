import * as dotenv from 'dotenv'

dotenv.config()

export enum CoinName {
    BITCOIN = 'bitcoin',
    DOCOIN = 'docoin',
}

function throwError(message: string) {
    throw new Error(message);
}

export const BEPA = {
    coin: {
        // baseUrl: 'http://localhost:8000',
        baseUrl: 'http://coinnews:8000',
        dataUrl: function (name: CoinName) {
            return `/api/data/${name}`
        },
        historyUrl: function (name: CoinName) {
            return `/api/data/${name}/history`
        }
    },
    mongodb: {
        // testUrl: 'mongodb://localhost/cloud_computing_test',
        testUrl: 'mongodb://mongo/cloud_computing_test',
        // url: 'mongodb://localhost/cloud_computing',
        url: 'mongodb://mongodb:27017/cloud_computing',
    },
    mailgun: {
        apiKey: (process.env.MAILGUN_API_KEY || throwError('No api key specified for mailgun, check .env')) as string,
        domain: (process.env.MAILGUN_DOMAIN || throwError('No domain specified for mailgun, check .env')) as string,
    },
}
