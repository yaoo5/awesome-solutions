import {Context} from "egg";

module.exports = {
    schedule: {
        interval: '5s',
        type: 'all',
        disable: false
    },
    async task(ctx: Context) {
        const { app } = ctx;

        await app.redis.lpush('tokenBucket', Date.now());
    },
};
