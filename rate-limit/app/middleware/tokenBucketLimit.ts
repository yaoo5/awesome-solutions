
export type FixedWindowOptions = Partial<{
    cacheKey: string,
    max: number,
    duration: number
}>

export default function (options: FixedWindowOptions = {}) {
    return async function (ctx, next) {
        const {app} = ctx;
        const key = options.cacheKey || 'tokenBucket';

        console.time('tokenBucket')
        const token = await app.redis.lpop(key);
        console.timeEnd('tokenBucket')

        if (!token) {
            ctx.status = 429;
            ctx.body = 'Too Many Requests.'
            return;
        }

        await next();
    }
}
