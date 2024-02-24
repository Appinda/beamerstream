import { ReactNode } from "react";
import { Tab } from "@headlessui/react";
import { IS_DESKTOP, classNames } from "../../utils";
import {
  Cloud,
  Database,
  Display,
  Keyboard,
  Window,
} from "react-bootstrap-icons";
import {
  DataTab,
  DisplayTab,
  GeneralTab,
  OnlineTab,
  ShortcutsTab,
} from "./settings";

type SettingsTabProps = {
  children: ReactNode;
  disabled?: boolean;
};

function SettingsTab({ children, disabled }: SettingsTabProps) {
  return (
    <Tab
      className="text-left py-1 group focus:outline-none"
      disabled={disabled}
    >
      {({ selected }) => (
        <div
          className={classNames(
            "py-2 px-3 [&:not(.disabled)]:group-hover:bg-gray-800 [&.active]:bg-gray-700 w-full text-left rounded-sm flex gap-4 [&.disabled]:opacity-30",
            selected ? "active" : "",
            disabled ? "disabled" : ""
          )}
        >
          {children}
        </div>
      )}
    </Tab>
  );
}

export function SettingsPage() {
  return (
    <div className="SettingsPage w-full h-full flex justify-stretch">
      {/* <div className="Tabs w-1/4 p-4">H</div>
      <div className="bg-gray-950 grow"></div> */}
      <Tab.Group>
        <Tab.List className="w-[400px] flex flex-col py-4 px-3 overflow-y-auto max-h-full">
          <SettingsTab>
            <Window size={24} /> General
          </SettingsTab>
          <SettingsTab disabled={!IS_DESKTOP}>
            <Display size={24} /> Display
          </SettingsTab>
          <SettingsTab>
            <Database size={24} /> Data
          </SettingsTab>
          <SettingsTab>
            <Keyboard size={24} /> Shortcuts
          </SettingsTab>
          <SettingsTab disabled={IS_DESKTOP}>
            <Cloud size={24} /> Online
          </SettingsTab>
        </Tab.List>
        <Tab.Panels className="bg-gray-950 grow p-4">
          <Tab.Panel>
            <GeneralTab />
          </Tab.Panel>
          <Tab.Panel>{IS_DESKTOP && <DisplayTab />}</Tab.Panel>
          <Tab.Panel>
            <DataTab />
          </Tab.Panel>
          <Tab.Panel>
            <ShortcutsTab />
          </Tab.Panel>
          <Tab.Panel>{!IS_DESKTOP && <OnlineTab />}</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
