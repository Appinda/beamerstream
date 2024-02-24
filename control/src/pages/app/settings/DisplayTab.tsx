import { HTMLProps, useEffect, useState } from "react";
import { PhysicalDisplay } from "@beamerstream/common";
import { classNames } from "../../../utils";

type DisplayProps = HTMLProps<HTMLDivElement> & {
  display: PhysicalDisplay;
  index: number;
};

export function Display({ className, display, index, ...props }: DisplayProps) {
  return (
    <div
      {...props}
      style={{
        width: display.bounds.width / 130 + "vw",
        height: display.bounds.height / 130 + "vw",
      }}
      className={classNames(
        "Display cursor-pointer flex justify-center relative text-xs items-center border-2 border-gray-700 p-2 rounded-md [&.active]:bg-gray-800 [&.active]:border-gray-500",
        className
      )}
    >
      <p className="text-center">
        {display.label}
        <br />
        {display.bounds.width} x {display.bounds.height}
        <br />
        {display.displayFrequency} Hz
      </p>
      <span className="absolute bottom-1 left-2 text-2xl">{index}</span>
    </div>
  );
}

export function DisplayTab() {
  const [displays, setDisplays] = useState<PhysicalDisplay[] | null>(null);
  const [selectedDisplay, setSelectedDisplay] = useState<number | null>(null);

  useEffect(() => {
    (window as any).electron
      .getDisplays()
      .then((displays: PhysicalDisplay[]) => {
        setDisplays(displays);
        if (selectedDisplay == null) setSelectedDisplay(displays[0].id);
      });
  }, []);

  return (
    <div className="DisplayTab">
      <div className="flex gap-2 w-full justify-center">
        {displays &&
          displays.map((d, i) => (
            <Display
              key={i}
              index={i + 1}
              display={d}
              className={selectedDisplay == d.id ? "active" : ""}
              onClick={() => setSelectedDisplay(d.id)}
            />
          ))}
      </div>
      <button className="text-sm bg-gray-700 px-2 text-gray-300 cursor-pointer hover:bg-gray-600 active:hover:bg-gray-500 rounded-sm">
        Identify
      </button>
    </div>
  );
}
