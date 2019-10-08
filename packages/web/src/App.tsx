import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import reset from "styled-reset";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { LoadingScreen } from "./components/Loading";
import { Header } from "./components/Header";
import { createGlobalStyle } from "styled-components";

const SignupPage = lazy(() => import("./pages/signup"));
const LinksPage = lazy(() => import("./pages/links"));

const client = new ApolloClient({ uri: "/graphql" });

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    font-family: "Open Sans", sans-serif;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route path="/signup">
              <Suspense fallback={<LoadingScreen />}>
                <SignupPage />
              </Suspense>
            </Route>
            <Route path="/users">
              <Suspense fallback={<LoadingScreen />}>
                <LinksPage />
              </Suspense>
            </Route>
            <Route path="/">
              <div>Home</div>
            </Route>
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
};

export default App;
