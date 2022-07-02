import { Context } from 'egg';

module.exports = {
  schedule: {
    interval: '5s',
    type: 'all',
    disable: true,
  },
  async task(ctx: Context) {
    const { app } = ctx;
    const max = 5;

    await app.redis.multi().lpush('tokenBucket', Date.now()).ltrim('tokenBucket', 0, max - 1);
  },
};
