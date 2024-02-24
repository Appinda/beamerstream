import React from "react";
import ContextMenuData from "./model";

export type ContextMenuManager = {
  openMenu(menu: ContextMenuData, position: [number, number]);
};

export const ContextContext = React.createContext<ContextMenuManager>({
  openMenu: () => {
    throw new Error("Default implementation");
  },
});
