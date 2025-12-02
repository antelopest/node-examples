import Config from '../models/Config';

const config: Config = {
  port: 3000,
  rateLimiterOptions: {
    limit: 5,
    windowMs: 60_000
  }
};

export default config;