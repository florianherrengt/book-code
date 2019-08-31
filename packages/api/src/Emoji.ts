import { getFetch } from "./containers";

class Emoji {
  private readonly _fetch = getFetch();
  async get(emoji: string): Promise<string> {
    const response = await this._fetch("https://api.github.com/emojis");
    const data = await response.json();
    if (!data[emoji]) {
      // this is not covered by any test
      return "emoji not found";
    }
    return data[emoji];
  }
}

export { Emoji };
