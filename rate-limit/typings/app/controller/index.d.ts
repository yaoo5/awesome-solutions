// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportRateLimit from '../../../app/controller/rateLimit';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    rateLimit: ExportRateLimit;
  }
}
