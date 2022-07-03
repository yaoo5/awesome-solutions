
export type SlidingWindowOptions = Partial<{
  cacheKey: string,
  max: number,
  duration: number,
  message: string
}>;

export default function(
  {
    cacheKey = 'slidingWindow',
    max = 5,
    duration = 5 * 60,
    message = 'Too Many Requests',
  }: SlidingWindowOptions = {},
) {
  return async function(ctx, next) {
    const { app } = ctx;
    const now = Date.now();
    const start = now - duration * 1000;

    const res = await app.redis.multi()
      .zremrangebyscore(cacheKey, '0', start)
      .zcard(cacheKey)
      .zadd(cacheKey, now, now)
      .zremrangebyrank(cacheKey, max, -1)
      .expire(cacheKey, duration)
      .exec();
    const rate = res[1][1];

    if (rate >= max) {
      ctx.status = 429;
      ctx.body = message;
    } else {
      await next();
    }
  };
}
