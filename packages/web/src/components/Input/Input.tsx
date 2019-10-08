import * as React from "react";
import { FieldProps } from "formik";
import styled from "styled-components";
import { theme } from "../../config";

const Container = styled.div``;
const StyledInput = styled.input`
  border: 1px solid ${theme.colors.border};
  border-radius: 4px;
  padding: 8px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: ${theme.colors.background2};
    outline: none;
  }
`;
const Error = styled.div`
  color: red;
`;

export const Input: React.SFC<FieldProps<any>> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <Container>
    <StyledInput type="text" {...field} {...props} />
    {touched[field.name] && errors[field.name] && (
      <Error>{errors[field.name]}</Error>
    )}
  </Container>
);
