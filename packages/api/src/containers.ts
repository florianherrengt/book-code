import fetch from "node-fetch";
import { Container } from "typedi";
import { Link } from "./entities";
import { User } from "./entities/User";

enum ContainerNames {
  fetch = "fetch",
  linkEntity = "linkEntity",
  userEntity = "userEntity"
}

export const setFetch = (fn: typeof fetch) =>
  Container.set(ContainerNames.fetch, fn);
export const getFetch = (): typeof fetch => Container.get(ContainerNames.fetch);

export const setLinkEntity = (entity: typeof Link) =>
  Container.set(ContainerNames.linkEntity, entity);
export const getLinkEntity = (): typeof Link =>
  Container.get(ContainerNames.linkEntity);

export const setUserEntity = (entity: typeof User) =>
  Container.set(ContainerNames.userEntity, entity);
export const getUserEntity = (): typeof User =>
  Container.get(ContainerNames.userEntity);
