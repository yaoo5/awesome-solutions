// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportFixedWindowLimit from '../../../app/middleware/fixedWindowLimit';
import ExportLeakyBucketLimit from '../../../app/middleware/leakyBucketLimit';
import ExportSlidingWindowLimit from '../../../app/middleware/slidingLogLimit';
import ExportTokenBucketLimit from '../../../app/middleware/tokenBucketLimit';

declare module 'egg' {
  interface IMiddleware {
    fixedWindowLimit: typeof ExportFixedWindowLimit;
    leakyBucketLimit: typeof ExportLeakyBucketLimit;
    slidingWindowLimit: typeof ExportSlidingWindowLimit;
    tokenBucketLimit: typeof ExportTokenBucketLimit;
  }
}
