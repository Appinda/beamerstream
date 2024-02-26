import { useState, useRef } from "react";
import * as FlexLayout from "flexlayout-react";
import { ScreenPreview } from "../../components";

import {
  ActiveSlidesWindow,
  SearchWindow,
  ServiceWindow,
} from "../../components/windows";
import { useServer } from "../../hooks/useServer";

export function ControlView() {
  const server = useServer();

  function onLituryItemSelect(id: string) {
    alert(id);
  }

  const json: FlexLayout.IJsonModel = {
    global: {
      tabEnableRename: false,
      splitterSize: 0,
      tabSetMinHeight: 150,
      tabSetMinWidth: 300,
      splitterExtra: 10,
      tabSetEnableMaximize: false,
    },
    borders: [],
    layout: {
      type: "row",
      weight: 100,
      children: [
        {
          type: "row",
          weight: 20,
          children: [
            {
              type: "tabset",
              weight: 40,
              children: [
                {
                  type: "tab",
                  name: "Service",
                  component: "Service",
                },
              ],
            },
            {
              type: "tabset",
              weight: 60,
              children: [
                {
                  type: "tab",
                  name: "List",
                  component: "Search",
                },
              ],
            },
          ],
        },
        {
          type: "tabset",
          weight: 60,
          children: [
            {
              type: "tab",
              name: "Slides",
              component: "ActiveSlides",
            },
          ],
        },
        {
          type: "tabset",
          weight: 20,
          children: [
            {
              type: "tab",
              name: "Screen",
              component: "Screen",
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
      case "Service":
        return <ServiceWindow onSelectItem={onLituryItemSelect} />;
      case "ActiveSlides":
        return <ActiveSlidesWindow slides={server.slides} />;
      case "Search":
        return <SearchWindow />;
      case "Screen":
        return <ScreenPreview screen="live" />;
      default:
        return <p>Unassigned</p>;
    }
  }

  return (
    <div className="ControlView h-full">
      <FlexLayout.Layout
        model={model}
        factory={factory}
        ref={layout}
        realtimeResize
      />
    </div>
  );
}
