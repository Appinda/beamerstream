import React, { useState } from "react";
import ContextMenuData from "./model";
import classNames from "classnames";
import { ContextContext, ContextMenuManager } from "./context";

export function ContextMenuOutlet({
  children: children,
}: {
  children: React.ReactNode;
}) {
  const [openMenu, setOpenMenu] = useState<ContextMenuData | null>(null);
  const [position, setPosition] = useState<[number, number] | null>(null);

  const manager: ContextMenuManager = {
    openMenu: (menu, position) => {
      console.log("opening..");

      setOpenMenu(menu);
      setPosition(position);
    },
  };

  function closeMenu() {
    setOpenMenu(null);
  }

  function renderMenu(menu: ContextMenuData) {
    return (
      <div
        className="min-w-[100px] h-auto bg-white rounded-md border border-[#aaa] absolute overflow-hidden"
        style={{ left: position?.[0], top: position?.[1] }}
      >
        <ul>
          {menu.map((item) => (
            <li
              className="px-2 hover:bg-[rgba(0,0,0,0.1)] cursor-pointer"
              onClick={() => item.onClick?.()}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <ContextContext.Provider value={manager}>
      <div
        className={classNames(
          "w-screen h-screen bg-opacity-40 absolute left-0 top-0 z-[500] select-none",
          openMenu ? "pointer-events-auto" : "pointer-events-none"
        )}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
        onClick={() => closeMenu()}
      >
        {openMenu && renderMenu(openMenu)}
      </div>
      {children}
    </ContextContext.Provider>
  );
}
