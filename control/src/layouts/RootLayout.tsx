import { Outlet } from "react-router-dom";
import ServerContextProvider from "../contexts/ServerContextProvider";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:3000/graphql",
  })
);

const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache(),
});

export default function RootLayout() {
  return (
    <div className="RootLayout w-screen h-screen overflow-hidden">
      <ApolloProvider client={client}>
        <ServerContextProvider>
          <Outlet />
        </ServerContextProvider>
      </ApolloProvider>
    </div>
  );
}
