import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import reset from "styled-reset";
import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { LoadingScreen } from "./components/Loading";
import { Header } from "./components/Header";
import { createGlobalStyle } from "styled-components";

const SignupPage = lazy(() => import("./pages/signup"));
const LinksPage = lazy(() => import("./pages/links"));

const httpLink = createHttpLink({
  uri: "/graphql"
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

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
            <Route path="/links">
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
