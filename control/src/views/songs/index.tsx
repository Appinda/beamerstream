import { useState, useRef } from "react";
import * as FlexLayout from "flexlayout-react";
import { SongEditorWindow } from "../../components/windows/SongEditorWindow";
import { Song } from "@beamerstream/common";
import { SearchWindow } from "../../components/windows";
import { useServer } from "../../hooks/useServer";

export function SongsView() {
  const [selectedSong, setSelectedSong] = useState<Song | undefined>();

  const server = useServer();

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
              component: "SearchWindow",
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
              component: "SongEditorWindow",
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
      case "SearchWindow":
        return (
          <SearchWindow
            items={server.songs}
            activeItem={selectedSong}
            onSelect={setSelectedSong}
          />
        );
      case "SongEditorWindow":
        return <SongEditorWindow song={selectedSong} />;
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
