import { Outlet } from "react-router-dom";
import { Navbar } from "../components";
import { ContextMenuOutlet } from "../components/ContextMenu";

export default function AppLayout() {
  return (
    <ContextMenuOutlet>
      <div className="AppLayout relative md:h-screen w-screen overflow-hidden flex flex-col bg-gray-900 text-gray-200">
        <Navbar />
        <div className="grow overflow-auto h-full">
          <Outlet />
        </div>
      </div>
    </ContextMenuOutlet>
  );
}
