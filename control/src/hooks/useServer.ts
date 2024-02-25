import { useContext } from "react";
import { ServerContext } from "../contexts/ServerContext";

export const useServer = () => useContext(ServerContext);
