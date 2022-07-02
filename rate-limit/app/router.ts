import { Application } from 'egg';
import fixedWindowLimit from "./middleware/fixedWindowLimit";
import slidingWindowLimit from "./middleware/slidingWindowLimit";
import leakyBucketLimit from "./middleware/leakyBucketLimit";
import tokenBucketLimit from "./middleware/tokenBucketLimit";

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  // fixed-window-limit api
  router.post(
      '/api/rateLimit/fixedWindow',
      fixedWindowLimit({}),
      controller.rateLimit.fixedWindow);

  // sliding-window-limit api
  router.post('/api/rateLimit/slidingWindow',
      slidingWindowLimit({}),
      controller.rateLimit.slidingWindow);

  // leaky-bucket-limit api
  router.post('/api/rateLimit/leakyBucket',
      leakyBucketLimit(),
      controller.rateLimit.leakyBucket);

  // token-bucket-limit api
  router.post('/api/rateLimit/tokenBucket',
      tokenBucketLimit(),
      controller.rateLimit.tokenBucket);
};
