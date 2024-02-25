import { PropsWithChildren, useState } from "react";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { ClientStateContext } from "./ClientState";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  loadDevMessages();
  loadErrorMessages();
} else {
  // production code
}

export default function ClientStateContextProvider({
  children,
}: PropsWithChildren) {
  const [slideZoom, setSlideZoom] = useState(1);

  return (
    <ClientStateContext.Provider
      value={{
        slideZoom,
        setSlideZoom,
      }}
    >
      {children}
    </ClientStateContext.Provider>
  );
}
