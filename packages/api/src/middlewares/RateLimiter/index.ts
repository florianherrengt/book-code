import { RateLimiterMemory, IRateLimiterOptions } from "rate-limiter-flexible";
import { Handler } from "express";
import { Request } from "express";

class RateLimiterMiddleware extends RateLimiterMemory {
  constructor(opts: IRateLimiterOptions = {}) {
    // allow 10 requests per second.
    super({
      points: 10,
      duration: 1,
      ...opts
    });
  }
  middleware: Handler = async (request: Request, response, next) => {
    try {
      await this.consume(request.ip);
      next();
    } catch (error) {
      response.sendStatus(429); // Too Many Requests
    }
  };
}

export { RateLimiterMiddleware };
