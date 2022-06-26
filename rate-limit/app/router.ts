import { Application } from 'egg';
import fixedWindowLimit from "./middleware/fixedWindowLimit";

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  router.post('/api/rateLimit/fixedWindow', fixedWindowLimit({}, app), controller.rateLimit.fixedWindow);
  router.post('/api/rateLimit/slidingWindow', controller.rateLimit.slidingWindow);
  router.post('/api/rateLimit/leakyBucket', controller.rateLimit.leakyBucket);
  router.post('/api/rateLimit/tokenBucket', controller.rateLimit.tokenBucket);
};
