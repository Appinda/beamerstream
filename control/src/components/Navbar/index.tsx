import { ReactNode } from "react";
import { LinkProps, NavLink } from "react-router-dom";
import classNames from "classnames";
import {
  Display,
  GearFill,
  Image,
  MusicNoteBeamed,
} from "react-bootstrap-icons";

type NavButtonProps = LinkProps & {
  children?: ReactNode;
};

function NavButton({ className, children, ...props }: NavButtonProps) {
  return (
    <NavLink
      {...props}
      draggable={false}
      className={({ isActive }) =>
        classNames(
          className,
          "flex gap-2 justify-center items-center select-none min-w-[60px] px-2 h-full hover:bg-gray-700 hover:text-gray-200 [&.active]:bg-gray-900 [&.active]:text-gray-200",
          isActive ? "active" : ""
        )
      }
    >
      {children}
    </NavLink>
  );
}

export function Navbar() {
  return (
    <nav className="w-full h-[3rem] min-h-[3rem] flex text-gray-400 bg-gray-950 px-4 select-none">
      <NavButton to="/app/control" title="Control">
        <Display size={25} />
      </NavButton>
      <NavButton to="/app/songs" title="Song editor">
        <MusicNoteBeamed size={25} />
      </NavButton>
      <NavButton to="/app/themes" title="Theme editor">
        <Image size={25} />
      </NavButton>
      <NavButton to="/app/settings" title="Settings">
        <GearFill size={23} />
      </NavButton>
      <NavButton to="/output/live" target="_blank" className="ml-auto">
        Live
      </NavButton>
    </nav>
  );
}
