import { useContext } from "react";
import { ClientStateContext } from "../contexts/ClientState";

export const useClientState = () => useContext(ClientStateContext);
