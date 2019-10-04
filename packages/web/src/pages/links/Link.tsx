import * as React from "react";
import styled from "styled-components";

export interface LinkProps {
  id: string;
  uri: string;
  userId: string;
}

const Container = styled.div`
  border: 1px solid gray;
  width: 200px;
  padding: 20px;
`;

export const Link = (props: LinkProps) => (
  <Container>URI: {props.uri}</Container>
);
