import { ApolloClient, InMemoryCache } from "@apollo/client";
import { PropsWithChildren, useEffect } from "react";

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { GET_THEMES } from "./queries";
import { useDefaultStore } from "../stores/DefaultStore";
import { useThemeEditorStore } from "../stores/ThemeEditorStore";

export default function ServerContext({ children }: PropsWithChildren) {
  const [setThemes] = useDefaultStore((state) => [state.setThemes]);
  const [setActiveSlide] = useThemeEditorStore((state) => [
    state.setActiveSlide,
  ]);

  function createConnection() {
    const wsLink = ((window as any).wsLink = new GraphQLWsLink(
      createClient({
        url: "ws://localhost:4000/graphql",
      })
    ));

    wsLink.client.on("connecting", () => console.debug("wsLink connecting"));
    wsLink.client.on("connected", () => console.debug("wsLink connected"));
    wsLink.client.on("closed", () => console.debug("wsLink closed"));
    wsLink.client.on("error", () => console.debug("wsLink error"));
    wsLink.client.on("opened", () => console.debug("wsLink opened"));

    loadErrorMessages();
    loadDevMessages();

    const client = new ApolloClient({
      link: wsLink,
      cache: new InMemoryCache(),
    });

    return client;
  }

  useEffect(() => {
    if ("client" in window) {
      (window as any).wsLink.client.dispose();
      (window as any).client.stop();
      console.log("Old connection disposed");
    }
    const client = ((window as any).client = createConnection());

    client
      .query({
        query: GET_THEMES,
        variables: {
          t: Math.round(Math.random() * 1000),
        },
      })
      .then((result) => {
        setThemes(result.data.themes);
        if (result.data.themes[0])
          setActiveSlide(result.data.themes[0].slides[0]);
      });
  }, []);

  return children;
}
