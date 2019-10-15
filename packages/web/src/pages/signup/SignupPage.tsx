import * as React from "react";
import { useMutation } from "react-apollo";
import gql from "graphql-tag";
import { Formik, Field, Form, FormikActions } from "formik";
import styled from "styled-components";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { theme } from "../../config";
import { useHistory } from "react-router";
import {
  signUp as SignUpResponse,
  signUpVariables as SignUpVariables
} from "api-types";

interface FormValues {
  emailAddress: string;
  password: string;
}

const Container = styled.div`
  max-width: 400px;
  margin-right: auto;
  margin-left: auto;
  box-shadow: 0px 0px 10px lightgrey;
  padding: 30px 50px 50px;
  margin-top: 10vh;
`;

const Title = styled.h1`
  margin: 20px 0;
  font-size: 20px;
  font-weight: bold;
`;

const StyledForm = styled(Form)`
  input {
    margin-bottom: 20px;
  }
  button {
    margin-top: 20px;
  }
`;

const StyledErrorMessage = styled.div`
  color: ${theme.colors.negative};
`;

export const SIGNUP_MUTATION = gql`
  mutation signUp($input: UserAuthInput!) {
    signUp(input: $input) {
      id
      emailAddress
      jwt
    }
  }
`;

export const SignupPage = () => {
  const history = useHistory();
  const [signUpMutation, { loading, error }] = useMutation<
    SignUpResponse,
    SignUpVariables
  >(SIGNUP_MUTATION, {
    onCompleted({ signUp }) {
      if (!signUp.jwt) {
        return alert("Error: No JWT returned.");
      }
      localStorage.setItem("token", signUp.jwt);
      history.push("/");
    }
  });

  return (
    <Container>
      <Title>Create an account</Title>
      <Formik
        initialValues={{
          emailAddress: "",
          password: ""
        }}
        onSubmit={async (
          values: FormValues,
          { setSubmitting }: FormikActions<FormValues>
        ) => {
          signUpMutation({ variables: { input: values } });
          setSubmitting(false);
        }}
        render={() => (
          <StyledForm>
            <Field
              component={Input}
              id="emailAddress"
              name="emailAddress"
              placeholder="Email address"
              type="email"
            />

            <Field
              component={Input}
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              autoComplete="new-password"
            />
            {error && (
              <StyledErrorMessage>
                {error.graphQLErrors[0].message}
              </StyledErrorMessage>
            )}

            <Button isLoading={loading} color="positive" type="submit">
              Submit
            </Button>
          </StyledForm>
        )}
      />
    </Container>
  );
};
