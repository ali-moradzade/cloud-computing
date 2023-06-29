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
        baseUrl: (process.env.COIN_URL || throwError('no BASE_URL specified; check .env')) as string,
        dataUrl: function (name: CoinName) {
            return `/api/data/${name}`
        },
        historyUrl: function (name: CoinName) {
            return `/api/data/${name}/history`
        }
    },
    mongodb: {
        url: (process.env.MONGODB_URL || throwError('no MONGODB_URL, check .env')) as string,
        testUrl: (process.env.MONGODB_TEST_URL || throwError('no MONGODB_TEST_URL, check .env')) as string,
    },
    mailgun: {
        apiKey: (process.env.MAILGUN_API_KEY || throwError('No api key specified for mailgun, check .env')) as string,
        domain: (process.env.MAILGUN_DOMAIN || throwError('No domain specified for mailgun, check .env')) as string,
    },
}
