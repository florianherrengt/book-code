import { Emoji } from "./Emoji";
import { Container } from "typedi";

describe("fetchRepositories function", () => {
  it("should fetch and return emoji passed as a param", async () => {
    // setup everything we need
    const computer = "mocked url";
    const data = { computer };
    const json = jest.fn().mockResolvedValue(data);
    const fetch = jest.fn(() => ({ json }));
    Container.set("fetch", fetch);

    const emoji = new Emoji();

    // execute the code we want to test
    const result = await emoji.get("computer");

    // assert the result
    expect(result).toStrictEqual(computer);
  });
});
