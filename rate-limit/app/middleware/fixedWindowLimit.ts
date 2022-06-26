
export type FixedWindowOptions = Partial<{
    cacheKey: string,
    max: number,
    duration: number
}>

export default function (options: FixedWindowOptions = {}, app?) {
    return async function (ctx, next) {
        const key = options.cacheKey || 'fixedWindow';
        const max = options.max || 5;
        const duration = options.duration || 5 * 60;

        console.time('fixedWindow')
        await app.redis.set(key, 0, 'EX', duration, 'NX');
        const rate = await app.redis.incr(key);
        console.timeEnd('fixedWindow')

        if (rate > max) {
            ctx.status = 429;
            ctx.body = 'Too Many Requests.'
            return;
        }

        await next();
    }
}
