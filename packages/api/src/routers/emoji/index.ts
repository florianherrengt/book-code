import { Router, Request, Response } from "express";
import { getFetch } from "../../containers";

export class EmojiRouter {
  public readonly router = Router();
  private readonly _fetch = getFetch();
  constructor() {
    this.router.get("/:emoji", this.get);
  }
  get = async (request: Request, response: Response) => {
    const { emoji } = request.params;
    const jsonResponse = await this._fetch("https://api.github.com/emojis");
    const data = await jsonResponse.json();
    if (!data[emoji]) {
      return response.status(404).json({ error: "emoji not found" });
    }
    return response.json({ emoji: data[emoji] });
  };
}
