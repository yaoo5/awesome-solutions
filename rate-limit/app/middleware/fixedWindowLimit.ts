export type FixedWindowOptions = Partial<{
  cacheKey: string,
  max: number,
  duration: number,
  message: string
}>;

export default function(
  {
    cacheKey = 'fixedWindow',
    duration = 5 * 60,
    max = 5,
    message = 'Too Many Requests.',
  }: FixedWindowOptions,
) {
  return async function(ctx, next) {
    const { app } = ctx;

    console.time('fixedWindow');
    await app.redis.set(cacheKey, 0, 'EX', duration, 'NX');
    const rate = await app.redis.incr(cacheKey);
    console.timeEnd('fixedWindow');

    if (rate > max) {
      ctx.status = 429;
      ctx.body = message;
    } else {
      await next();
    }
  };
}
