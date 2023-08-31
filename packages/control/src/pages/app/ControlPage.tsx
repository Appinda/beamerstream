import { useState, useRef } from "react";
import { DUMMY_SONG } from "../../utils";
import { gql, useMutation } from "@apollo/client";
import * as FlexLayout from "flexlayout-react";
import Liturgy from "../../components/Liturgy";
import ActiveSlides from "../../components/ActiveSlides";

const SET_CURRENT_VERSE = gql`
  # Increments a back-end counter and gets its resulting value
  mutation SetCurrentVerse($text: String!) {
    setCurrentVerse(text: $text)
  }
`;

export default function ControlPage() {
  // const { qerror, data: currentVerse } = useQuery(GET_LOCATIONS);
  const [mutateFunction] = useMutation(SET_CURRENT_VERSE);

  function selectVerse(index: number) {
    mutateFunction({
      variables: {
        text: DUMMY_SONG[index],
      },
    });
  }

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
                  name: "Liturgy",
                  component: "Liturgy",
                },
              ],
            },
            {
              type: "tabset",
              weight: 60,
              children: [
                {
                  type: "tab",
                  name: "Screen",
                  component: "button",
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
              name: "List",
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
      case "Liturgy":
        return <Liturgy onSelectItem={onLituryItemSelect} />;
      case "ActiveSlides":
        return <ActiveSlides />;
      default:
        return <p>Unassigned</p>;
    }
  }

  return (
    <div className="ControlPage h-full">
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
    //
    //   <Window title="Song">
    //     <ul className="h-full overflow-y-scroll w-full">
    //       {song.map((verse, i) => (
    //         <li
    //           key={i}
    //           className={classNames(
    //             "whitespace-break-spaces hover:bg-gray-700 cursor-pointer select-none p-2 [&.active]:bg-gray-600",
    //             activeVerseIndex == i ? "active" : ""
    //           )}
    //           onClick={() => selectVerse(i)}
    //         >
    //           {verse}
    //         </li>
    //       ))}
    //     </ul>
    //   </Window>
    //   <Liturgy  />
    // </div>
  );
}
