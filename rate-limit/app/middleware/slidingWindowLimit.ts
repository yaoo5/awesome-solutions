
export type SlidingWindowOptions = Partial<{
    cacheKey: string,
    max: number,
    duration: number
}>

export default function (options: SlidingWindowOptions = {}) {
    return async function (ctx, next) {
        const {app} = ctx;
        const key = options.cacheKey || 'slidingWindow';
        const max = options.max || 5;
        const duration = options.duration || 5 * 60;
        const now = Date.now();
        const start = now - duration * 1000;

        console.time('slidingWindow')
        const res = await app.redis.multi()
            .zremrangebyscore(key, '0', start)
            .zcard(key)
            .zadd(key, now, now)
            .zremrangebyrank(key, max, -1)
            .expire(key, duration)
            .exec();
        const rate = res[1][1];
        console.timeEnd('slidingWindow')

        if (rate >= max) {
            ctx.status = 429;
            ctx.body = 'Too Many Requests.'
            return;
        }

        await next();
    }
}
