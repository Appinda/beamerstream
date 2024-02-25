import { useState, useRef } from "react";
import * as FlexLayout from "flexlayout-react";
import { SlideEditorWindow, ThemeListWindow } from "../../components/windows";
import { useServer } from "../../hooks/useServer";

export function ThemesView() {
  const server = useServer();

  const json: FlexLayout.IJsonModel = {
    global: {
      tabEnableRename: false,
      splitterSize: 0,
      tabSetMinHeight: 150,
      tabSetMinWidth: 250,
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
          weight: 15,
          children: [
            {
              type: "tab",
              name: "Themes",
              component: "ThemeList",
            },
          ],
        },
        {
          type: "tabset",
          weight: 85,
          children: [
            {
              type: "tab",
              name: "Edit",
              component: "SlideEditor",
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
      case "ThemeList":
        return (
          <ThemeListWindow
            themes={server.themes ?? []}
            activeSlide={undefined}
            // onSlideSelect={null}
          />
        );
      case "SlideEditor":
        return <SlideEditorWindow slide={undefined} />;
      default:
        return <p>Unassigned</p>;
    }
  }

  return (
    <div className="ThemesPage h-full">
      <FlexLayout.Layout
        model={model}
        factory={factory}
        ref={layout}
        realtimeResize
      />
    </div>
  );
}
