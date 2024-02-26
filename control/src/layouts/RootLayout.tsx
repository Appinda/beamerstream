import { Outlet } from "react-router-dom";
import ServerContextProvider from "../contexts/ServerContextProvider";
import { useState } from "react";
import { QueryClient } from "@tanstack/react-query";
import { trpc } from "../trpc";
import { httpBatchLink } from "@trpc/client";

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/trpc",
          // You can pass any HTTP headers you wish here
          // async headers() {
          //   return {
          //     authorization: getAuthCookie(),
          //   };
          // },
        }),
      ],
    })
  );

  return (
    <div className="RootLayout w-screen h-screen overflow-hidden">
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <ServerContextProvider>
          <Outlet />
        </ServerContextProvider>
      </trpc.Provider>
    </div>
  );
}
