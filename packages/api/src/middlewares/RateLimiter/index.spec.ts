import * as express from "express";
import * as supertest from "supertest";
import { RateLimiterMiddleware } from "./index";

describe("middlewares/RateLimiter", () => {
  it("should limit the amount of requests", async () => {
    const app = express();
    app.use(new RateLimiterMiddleware({ points: 1 }).middleware);
    app.get("/test", (_, response) => response.sendStatus(200));
    const agent = supertest(app);

    await agent.get("/test").expect(200);
    await agent.get("/test").expect(429);
  });
});
