import { useDefaultStore } from "../../../stores/DefaultStore";
import { ContextMenu } from "../../ContextMenu";

type SearchFilter = "songs";

type Props = {
  filter?: SearchFilter[];
};

export function SearchWindow({ filter = [] }: Props) {
  const [songlist, deleteSong] = useDefaultStore((state) => [
    state.songlist,
    state.deleteSong,
  ]);

  return (
    <div className="SearchWindow w-full select-none">
      {songlist.map((song) => (
        <ContextMenu
          menu={[
            {
              name: "Delete",
              onClick: () => deleteSong(song.id),
            },
          ]}
        >
          <div
            className="hover:bg-gray-200 active:bg-gray-300 cursor-pointer"
            key={song.id}
          >
            {song.titles[0]}
          </div>
        </ContextMenu>
      ))}
      {filter}
    </div>
  );
}
