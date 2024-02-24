import { useState, useRef } from "react";
import * as FlexLayout from "flexlayout-react";

export function SongsPage() {
  const json: FlexLayout.IJsonModel = {
    global: {
      tabEnableRename: false,
      splitterSize: 0,
      tabSetMinHeight: 150,
      tabSetMinWidth: 300,
      splitterExtra: 10,
      tabEnableClose: false,
      tabSetEnableMaximize: false,
    },
    borders: [],
    layout: {
      type: "row",
      weight: 100,
      children: [
        {
          type: "tabset",
          weight: 25,
          children: [
            {
              type: "tab",
              name: "Songlist",
              component: "button",
            },
          ],
        },
        {
          type: "tabset",
          weight: 75,
          children: [
            {
              type: "tab",
              name: "Edit",
              component: "button",
            },
          ],
        },
      ],
    },
  };

  const [model] = useState<FlexLayout.Model>(FlexLayout.Model.fromJson(json));

  const layout = useRef<FlexLayout.Layout>(null);
  function factory(node: FlexLayout.TabNode) {
    const component = node.getComponent();
    switch (component) {
      default:
        return <p>Unassigned</p>;
    }
  }

  return (
    <div className="SongsPage h-full">
      <FlexLayout.Layout
        model={model}
        factory={factory}
        ref={layout}
        realtimeResize
      />
    </div>
  );
}
