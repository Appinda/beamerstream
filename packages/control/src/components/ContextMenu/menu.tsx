import React from "react";
import ContextMenuData from "./model";
import { ContextContext } from "./context";

type ContextMenuProps = {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  menu: ContextMenuData;
};

export function ContextMenu({ children, menu }: ContextMenuProps) {
  const context = React.useContext(ContextContext);

  function handleOpen(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    e.stopPropagation();

    context.openMenu(menu, [e.clientX, e.clientY]);
  }

  return <div onContextMenu={handleOpen}>{children}</div>;
}
