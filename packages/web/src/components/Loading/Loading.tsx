import * as React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { theme } from "../../config";

const Container = styled.div`
  margin-top: 100px;
  position: relative;
`;

const Content = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const StyledIcon = styled(FontAwesomeIcon)`
  margin: 0 !important;
  font-size: 40px;
`;

export const LoadingScreen = () => (
  <Container>
    <Content>
      <StyledIcon color={theme.colors.background2} spin icon={faCircleNotch} />
    </Content>
  </Container>
);
