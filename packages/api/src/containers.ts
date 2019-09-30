import fetch from "node-fetch";
import { Container } from "typedi";
import { Link } from "./entities";

enum ContainerNames {
  fetch = "fetch",
  linkEntity = "linkEntity"
}

export const setFetch = (fn: typeof fetch) =>
  Container.set(ContainerNames.fetch, fn);
export const getFetch = (): typeof fetch => Container.get(ContainerNames.fetch);

export const setLinkEntity = (entity: typeof Link) =>
  Container.set(ContainerNames.linkEntity, entity);
export const getLinkEntity = (): typeof Link =>
  Container.get(ContainerNames.linkEntity);
