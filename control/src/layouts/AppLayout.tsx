import { Outlet } from "react-router-dom";
import { Navbar } from "../components";
import { ContextMenuOutlet } from "../components/ContextMenu";
import LoadingOverlay from "../components/LoadingOverlay";
import { useEffect, useState } from "react";
import ClientStateContextProvider from "../contexts/ClientStateProvider";

export default function AppLayout() {
  const [loading, setLoading] = useState(true);
  const [loadingPerc, setLoadingPerc] = useState(0);
  useEffect(() => {
    setLoadingPerc(100);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <ContextMenuOutlet>
      <ClientStateContextProvider>
        {loading && <LoadingOverlay percentage={loadingPerc} />}

        <div className="AppLayout relative md:h-screen w-screen overflow-hidden flex flex-col bg-gray-900 text-gray-200">
          <Navbar />
          <div className="grow overflow-auto h-full">
            <Outlet />
          </div>
        </div>
      </ClientStateContextProvider>
    </ContextMenuOutlet>
  );
}
