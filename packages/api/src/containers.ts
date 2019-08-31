import fetch from "node-fetch";
import { Container } from "typedi";

enum ContainerNames {
  fetch = "fetch"
}

export const setFetch = (fn: typeof fetch) =>
  Container.set(ContainerNames.fetch, fn);
export const getFetch = (): typeof fetch => Container.get(ContainerNames.fetch);
