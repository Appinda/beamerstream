import { MusicNoteBeamed } from "react-bootstrap-icons";
import { useDefaultStore } from "../../../stores/DefaultStore";

type LiturgyProps = {
  onSelectItem?: (id: string) => void;
};

export function ServiceWindow({ onSelectItem }: LiturgyProps) {
  const [service] = useDefaultStore((state) => [state.service]);

  function renderSonglist() {
    return service.items.map((item, i) => (
      <div
        className="cursor-pointer hover:bg-slate-700 px-1 select-none flex"
        key={i}
        onClick={() => onSelectItem?.(item.id)}
      >
        <MusicNoteBeamed className="mt-1 mr-2" />
        {item.name}
      </div>
    ));
  }

  return renderSonglist();
}
