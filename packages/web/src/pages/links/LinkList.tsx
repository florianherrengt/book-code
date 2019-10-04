import * as React from "react";
import { LinkProps, Link } from "./Link";

export interface LinkListProps {
  links: LinkProps[];
}

export const LinkList = (props: LinkListProps) => (
  <div>
    {props.links.map(link => (
      <Link key={link.id} {...link} />
    ))}
  </div>
);
