import { Song } from "@beamerstream/common";
import classNames from "classnames";

type Props = {
  items: Song[];
  activeItem?: Song;
  onSelect?: (song: Song) => any;
};

export function SearchWindow({ items = [], activeItem, onSelect }: Props) {
  return (
    <div className="SearchWindow w-full select-none">
      {items.map((song) => (
        <div
          className={classNames(
            "hover:bg-gray-200 active:bg-gray-300 cursor-pointer px-2",
            { "active bg-blue-100": activeItem && song.id == activeItem.id }
          )}
          key={song.id}
          onClick={() => onSelect?.(song)}
        >
          {song.titles![0]}
        </div>
      ))}
    </div>
  );
}
