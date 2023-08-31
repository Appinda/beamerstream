import { useState, useRef } from "react";
import * as FlexLayout from "flexlayout-react";

export default function SongsPage() {
  const json: FlexLayout.IJsonModel = {
    global: {
      tabEnableRename: false,
      splitterSize: 0,
      tabSetMinHeight: 150,
      tabSetMinWidth: 300,
      splitterExtra: 10,
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
      <style>
        {`
        .flexlayout__layout { 
          --font-size: 12px;
          /*--color-base: black;
          --color-text: white;
          --color-background: transparent;
          --color-1: rgba(0,0,0,0.3);*/
          position: relative;
          height: 100%;
        }

        .flexlayout__tab, .flexlayout__tabset {
          border: 1px solid black;
        }
        
        `}
      </style>
      <FlexLayout.Layout
        model={model}
        factory={factory}
        ref={layout}
        onModelChange={(model) => console.log(model.toJson())}
        realtimeResize
      />
    </div>
  );
}
