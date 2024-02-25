import { MusicNoteBeamed } from "react-bootstrap-icons";
import { useServer } from "../../../hooks/useServer";

type LiturgyProps = {
  onSelectItem?: (id: string) => void;
};

export function ServiceWindow({ onSelectItem }: LiturgyProps) {
  const server = useServer();

  function renderSonglist() {
    return server.service.items.map((item, i) => (
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
