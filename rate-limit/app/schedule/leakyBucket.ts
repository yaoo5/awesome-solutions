import {Context} from "egg";

module.exports = {
    schedule: {
        interval: '5s',
        type: 'all',
        disable: true
    },
    async task(ctx: Context) {
        const { app } = ctx;

        await app.redis.lpop('leakyBucket');
    },
};
