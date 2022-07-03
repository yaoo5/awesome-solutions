
export type FixedWindowOptions = Partial<{
  cacheKey: string,
  max: number,
  message: string
}>;

export default function(
  {
    cacheKey = 'leakyBucket',
    max = 5,
    message = 'Too Many Requests.',
  }: FixedWindowOptions,
) {
  return async function(ctx, next) {
    const { app } = ctx;
    const now = Date.now();

    const res = await app.redis.multi()
      .llen(cacheKey)
      .lpush(cacheKey, now)
      .ltrim(cacheKey, 0, max - 1)
      .exec();
    const rate = res[0][1];

    if (rate >= max) {
      ctx.status = 429;
      ctx.body = message;
    } else {
      await next();
    }
  };
}
