import { gql, useQuery } from "@apollo/client";
import Window from "../Window";
import { MusicNoteBeamed } from "react-bootstrap-icons";
import { Song } from "@beamerstream/library";

const GET_SONGLIST = gql`
  query Songs {
    songs {
      id
      titles
      authors
    }
  }
`;

type LiturgyProps = {
  onSelectItem?: (id: string) => void;
};

export default function Liturgy({ onSelectItem }: LiturgyProps) {
  const { loading, data: songlist } = useQuery(GET_SONGLIST);

  function renderSonglist() {
    if (loading) return <p>Loading..</p>;
    return (songlist.songs as Song[]).map((song, i) => (
      <div
        className="cursor-pointer hover:bg-slate-700 px-1 select-none flex"
        key={i}
        onDoubleClick={() => onSelectItem?.(songlist.songs[i].id)}
      >
        <MusicNoteBeamed className="mt-1 mr-2" />
        {song.titles[0]}
      </div>
    ));
  }

  return renderSonglist();
}
