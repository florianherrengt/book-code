import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDrawPolygon } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  background-color: ${theme.colors.background2};
  color: ${theme.colors.contrast2};
`;

const Content = styled.div`
  padding: 20px;
  display: flex;
`;

const Left = styled.div`
  flex: 1;
`;

const Right = styled.div``;

export const Header = () => (
  <Container>
    <Content>
      <Left>
        <FontAwesomeIcon icon={faDrawPolygon} />
        aedalost
      </Left>
      <Right>
        <Link to="/signup">Sign up</Link>
      </Right>
    </Content>
  </Container>
);
