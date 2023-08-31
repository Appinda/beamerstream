import { useState } from "react";
import { DUMMY_SONG, classNames } from "../../utils";
import { gql, useMutation } from "@apollo/client";
import Liturgy from "../../components/Liturgy";
import Window from "../../components/Window";

const SET_CURRENT_VERSE = gql`
  # Increments a back-end counter and gets its resulting value
  mutation SetCurrentVerse($text: String!) {
    setCurrentVerse(text: $text)
  }
`;

export default function ControlPage() {
  // const { qerror, data: currentVerse } = useQuery(GET_LOCATIONS);
  const [mutateFunction] = useMutation(SET_CURRENT_VERSE);

  const [activeVerseIndex] = useState<number>(0);
  const [song] = useState<string[]>(DUMMY_SONG);

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

  return (
    <div className="ControlPage grid grid-cols-4 h-full">
      <Window title="Song">
        <ul className="h-full overflow-y-scroll w-full">
          {song.map((verse, i) => (
            <li
              key={i}
              className={classNames(
                "whitespace-break-spaces hover:bg-gray-700 cursor-pointer select-none p-2 [&.active]:bg-gray-600",
                activeVerseIndex == i ? "active" : ""
              )}
              onClick={() => selectVerse(i)}
            >
              {verse}
            </li>
          ))}
        </ul>
      </Window>
      <Liturgy onSelectItem={onLituryItemSelect} />
    </div>
  );
}
