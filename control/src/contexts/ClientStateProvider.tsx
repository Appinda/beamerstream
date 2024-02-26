import { PropsWithChildren, useState } from "react";
import { ClientStateContext } from "./ClientState";

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
