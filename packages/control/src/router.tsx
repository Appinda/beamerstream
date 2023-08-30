import { Navigate, createBrowserRouter } from "react-router-dom";
import ControlPage from "./pages/app/ControlPage";
import SongsPage from "./pages/app/SongsPage";
import Screen from "./pages/screen";
import { AppLayout, ScreenLayout } from "./layouts";
import SettingsPage from "./pages/app/SettingsPage";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: <Navigate to="/app/control" />,
      },
      {
        path: "app",
        element: <AppLayout />,
        children: [
          {
            path: "",
            element: <Navigate to="/app/control" />,
          },
          {
            path: "control",
            element: <ControlPage />,
          },
          {
            path: "songs",
            element: <SongsPage />,
          },
          {
            path: "settings",
            element: <SettingsPage />,
          },
        ],
      },
      {
        path: "output",
        element: <ScreenLayout />,
        children: [
          {
            path: "",
            element: <Navigate to="/output/live" />,
          },
          {
            path: "live",
            element: <Screen />,
          },
          {
            path: "preview",
            element: <Screen />,
          },
        ],
      },
    ],
  },
]);

export default router;
