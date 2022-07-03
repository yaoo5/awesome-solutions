
export type TokenBucketLimit = Partial<{
  cacheKey: string,
}>;

export default function(
  {
    cacheKey = 'tokenBucket',
  }: TokenBucketLimit,
) {
  return async function(ctx, next) {
    const { app } = ctx;

    const token = await app.redis.lpop(cacheKey);

    if (!token) {
      ctx.status = 429;
      ctx.body = 'Too Many Requests.';
    } else {
      await next();
    }
  };
}
