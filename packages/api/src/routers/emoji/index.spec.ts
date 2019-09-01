import fetch from "node-fetch";

import { EmojiRouter } from "./index";
import { setFetch } from "../../containers";
import { Request, Response } from "express";

describe("routers/Emoji", () => {
  describe("/get/:emoji", () => {
    it("should fetch and return emoji passed as a param", async () => {
      // setup everything we need
      const computer = "mocked url";
      const data = { computer };
      const json = jest.fn().mockResolvedValue(data);
      const fetchMock = jest.fn(() => ({ json }));
      setFetch((fetchMock as unknown) as typeof fetch);

      const router = new EmojiRouter();

      // execute the code we want to test
      const request = ({ params: { emoji: "computer" } } as unknown) as Request;
      const response = ({} as unknown) as Response;
      response.json = jest.fn().mockReturnValue(response);
      await router.get(request, response);

      // assert the result
      expect(response.json).toHaveBeenCalledWith({ emoji: computer });
    });
    it("should return an error if not found", async () => {
      // setup everything we need
      const computer = "mocked url";
      const data = { computer };
      const json = jest.fn().mockResolvedValue(data);
      const fetchMock = jest.fn(() => ({ json }));
      setFetch((fetchMock as unknown) as typeof fetch);

      const router = new EmojiRouter();

      // execute the code we want to test
      const request = ({
        params: { emoji: "inexistent" }
      } as unknown) as Request;
      const response = ({} as unknown) as Response;
      response.status = jest.fn().mockReturnValue(response);
      response.json = jest.fn().mockReturnValue(response);
      await router.get(request, response);

      // assert the result
      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.json).toHaveBeenCalledWith({ error: "emoji not found" });
    });
  });
});
