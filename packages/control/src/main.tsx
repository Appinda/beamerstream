import ReactDOM from "react-dom/client";
import router from "./router.tsx";
import "flexlayout-react/style/underline.css";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import ServerContext from "./contexts/ServerContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ServerContext>
    <RouterProvider router={router} />
  </ServerContext>
);
