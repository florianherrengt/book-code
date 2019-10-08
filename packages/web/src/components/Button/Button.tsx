import * as React from "react";
import styled from "styled-components";
import { theme } from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { ButtonHTMLAttributes } from "react";

export interface ButtonProps {
  isLoading?: boolean;
  color: keyof typeof theme.colors;
  onClick?: () => void;
}

const StyledButton = styled.button<ButtonProps>`
  border: 1px solid ${props => theme.colors[props.color]};
  background-color: ${props => theme.colors[props.color]};
  color: ${theme.colors.contrast2};
  border-radius: 4px;
  padding: 8px 20px;
  font-size: 12px;
  cursor: pointer;
  width: 100%;

  &:disabled {
    opacity: 0.5;
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  margin: 0 !important;
`;

export const Button: React.SFC<
  ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
> = props => {
  return (
    <StyledButton {...props}>
      {props.isLoading ? (
        <StyledIcon spin icon={faCircleNotch} />
      ) : (
        props.children
      )}
    </StyledButton>
  );
};
