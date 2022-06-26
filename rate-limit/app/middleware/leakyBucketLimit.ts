
export type FixedWindowOptions = Partial<{
    cacheKey: string,
    max: number,
    duration: number
}>

export default function (options: FixedWindowOptions = {}) {
    return async function (ctx, next) {
        const {app} = ctx;
        const key = options.cacheKey || 'leakyBucket';
        const max = options.max || 5;
        const now = Date.now();
        // const outRate = options.duration || 5 * 60;

        console.time('leakyBucket');
        const res = await app.redis.multi()
            .llen(key)
            .lpush(key, now)
            .ltrim(key, 0, max - 1)
            .exec();
        const rate = res[0][1];
        console.timeEnd('leakyBucket')

        if (rate >= max) {
            ctx.status = 429;
            ctx.body = 'Too Many Requests.'
            return;
        }

        await next();
    }
}
