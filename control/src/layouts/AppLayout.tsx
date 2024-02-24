import { Outlet } from "react-router-dom";
import { Navbar } from "../components";
import { ContextMenuOutlet } from "../components/ContextMenu";
import LoadingOverlay from "../components/LoadingOverlay";
import { useDefaultStore } from "../stores/DefaultStore";

export default function AppLayout() {
  const loading = useDefaultStore((state) => state.loading);

  return (
    <ContextMenuOutlet>
      {loading && <LoadingOverlay />}

      <div className="AppLayout relative md:h-screen w-screen overflow-hidden flex flex-col bg-gray-900 text-gray-200">
        <Navbar />
        <div className="grow overflow-auto h-full">
          <Outlet />
        </div>
      </div>
    </ContextMenuOutlet>
  );
}
