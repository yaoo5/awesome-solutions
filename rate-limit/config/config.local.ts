import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.redis = {
    client: {
      host: '127.0.0.1',
      port: 6379,
      keyPrefix: 'rate-limit:',
      password: '',
      db: 0
    }
  }

  return config;
};
