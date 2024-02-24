import { Outlet } from "react-router-dom";

export default function ScreenLayout() {
  return (
    <div className="ScreenLayout h-screen w-screen overflow-hidden cursor-none select-none">
      <Outlet />
    </div>
  );
}
