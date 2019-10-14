import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { SignupPage, SIGNUP_MUTATION } from "./SignupPage";
import { createMemoryHistory } from "history";
import { Router, Route } from "react-router";
import { MockedProvider, wait } from "@apollo/react-testing";
import { ThemeProvider } from "styled-components";

let container: HTMLDivElement;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = (null as unknown) as HTMLDivElement; // prevent memory leaks
});

it("renders user data", async () => {
  // setup the test
  const history = createMemoryHistory({ initialEntries: ["/signup"] });
  let signUpMutationCalled = false;
  const spy = jest.spyOn(Storage.prototype, "setItem");

  const mocks = [
    {
      request: {
        query: SIGNUP_MUTATION,
        variables: {
          input: {
            emailAddress: "test@example.com",
            password: "qwerty123"
          }
        }
      },
      result: () => {
        signUpMutationCalled = true;
        return {
          data: {
            signUp: {
              id: "userid",
              emailAddress: "test@example.com",
              jwt: "faketoken"
            }
          }
        };
      }
    }
  ];

  await act(async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ThemeProvider theme={{}}>
          <Router history={history}>
            <Route path="/signup" component={SignupPage} />
          </Router>
        </ThemeProvider>
      </MockedProvider>,
      container
    );

    // fill up the form
    const emailInput = container.querySelector("input[name=emailAddress]")!;
    emailInput.setAttribute("value", "test@example.com");
    Simulate.change(emailInput);

    const passwordInput = container.querySelector("input[name=password]")!;
    passwordInput.setAttribute("value", "qwerty123");
    Simulate.change(passwordInput);
  });

  await act(async () => {
    // submit the form
    // triggering the hook has to be in another `act`
    const submitButton = container.querySelector("button[type=submit]")!;
    expect(submitButton.textContent).toEqual("Submit");
    submitButton.dispatchEvent(new MouseEvent("click"));
    await wait(0);
    // check loading state
    expect(submitButton.textContent).not.toEqual("Submit");
  });

  // check if the mutation has been  called
  expect(signUpMutationCalled).toBeTruthy();

  // check if the token has been set correctly
  expect(window.localStorage.setItem).toHaveBeenCalledWith(
    "token",
    "faketoken"
  );
  spy.mockRestore();

  // check if the user has been redirected
  expect(history.location.pathname).toBe("/");
});
