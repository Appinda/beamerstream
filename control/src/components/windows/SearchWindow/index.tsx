import { useServer } from "../../../hooks/useServer";
import { ContextMenu } from "../../ContextMenu";

type SearchFilter = "songs";

type Props = {
  filter?: SearchFilter[];
};

export function SearchWindow({ filter = [] }: Props) {
  const server = useServer();

  return (
    <div className="SearchWindow w-full select-none">
      {server.songs.map((song) => (
        <ContextMenu
          key={song.id}
          menu={[
            {
              name: "Delete",
              onClick: () => server.deleteSong(song.id!),
            },
          ]}
        >
          <div
            className="hover:bg-gray-200 active:bg-gray-300 cursor-pointer px-2 py-1"
            key={song.id}
            onClick={() => server.viewSlides(song.id!)}
          >
            {song.titles![0]}
          </div>
        </ContextMenu>
      ))}
      {filter}
    </div>
  );
}
