import * as React from "react";
import { LinkList } from "./LinkList";
import { Header } from "../../components/Header";
import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";

const getData = () => [{ id: "1", uri: "http://mock", userId: "userid" }];

export const LinksPage = () => {
  const { data, loading, error } = useQuery(gql`
    {
      health {
        ok
      }
    }
  `);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... Something wrong happened. Try again later.</div>;
  }
  return (
    <div>
      <Header />
      <div>Health {data.health.ok}</div>
      <LinkList links={getData()} />
    </div>
  );
};

// we export default pages for code splitting later
// more info at https://reactjs.org/docs/code-splitting.html
export default LinksPage;
