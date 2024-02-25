import { Navigate, createHashRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import RootLayout from "./layouts/RootLayout";
import ScreenLayout from "./layouts/ScreenLayout";
import { ControlView } from "./views/control";
import { SongsView } from "./views/songs";
import { ThemesView } from "./views/themes";
import { SettingsView } from "./views/settings";
import OutputView from "./views/output";

const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
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
            element: <ControlView />,
          },
          {
            path: "songs",
            element: <SongsView />,
          },
          {
            path: "themes",
            element: <ThemesView />,
          },
          {
            path: "settings",
            element: <SettingsView />,
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
            path: ":name",
            element: <OutputView />,
          },
        ],
      },
    ],
  },
]);

export default router;
