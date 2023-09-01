import { Navigate, createBrowserRouter } from "react-router-dom";
import Screen from "./pages/screen";
import { AppLayout, ScreenLayout } from "./layouts";
import { ControlPage, SettingsPage, SongsPage, ThemesPage } from "./pages/app";

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
            path: "themes",
            element: <ThemesPage />,
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
