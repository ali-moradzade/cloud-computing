import * as dotenv from 'dotenv'

dotenv.config();

function throwError(message: string) {
    throw new Error(message);
}

export const PEYK = {
    app: {
        port: 3000,
    },
    mongodb: {
        testUrl: (process.env.MONGODB_URL || throwError('no MONGODB_URL, check .env')) as string,
        url: (process.env.MONGODB_TEST_URL || throwError('no MONGODB_TEST_URL, check .env')) as string,
    },
}
