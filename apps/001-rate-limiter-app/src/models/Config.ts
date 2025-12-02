import { RateLimiterOptions } from "./RateLimiterOptions";

export default interface Config {
  port: number;
  rateLimiterOptions: RateLimiterOptions
}