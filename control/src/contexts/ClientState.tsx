import { createContext } from "react";

export type ClientStateContextType = {
  slideZoom: number;
  setSlideZoom: (value: number) => void;
};

export const ClientStateContext = createContext<ClientStateContextType>(null!);
