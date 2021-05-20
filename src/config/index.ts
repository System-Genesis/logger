import * as env from 'env-var';
import './dotenv';

const config = {
    env: env.get('env').default('dev').asString(),
    rabbit: {
        uri: env.get('RABBIT_URI').required().asUrlString(),
        retryOptions: {
            minTimeout: env.get('RABBIT_RETRY_MIN_TIMEOUT').default(1000).asIntPositive(),
            retries: env.get('RABBIT_RETRY_RETRIES').default(10).asIntPositive(),
            factor: env.get('RABBIT_RETRY_FACTOR').default(1.8).asFloatPositive(),
        },
    },
    logger: {
        levels: ['error', 'info', 'warn'],
    },
};

export default config;
