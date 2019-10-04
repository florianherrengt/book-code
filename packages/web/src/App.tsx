import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./App.css";
import { LinksPage } from "./pages/links";

const client = new ApolloClient({ uri: "/graphql" });

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <LinksPage />
      </div>
    </ApolloProvider>
  );
};

export default App;
