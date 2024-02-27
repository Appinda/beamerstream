import { Song } from "@beamerstream/common";
import { useEffect, useState } from "react";

type Props = {
  song?: Song;
};

export function SongEditorWindow({ song }: Props) {
  const [jsonData, setJsonData] = useState<string | undefined>();

  useEffect(() => {
    setJsonData(JSON.stringify(song, null, 2));
  }, [song]);

  return (
    <div className="SongEditorWindow w-full h-full bg-gray-800 overflow-hidden p-4">
      <textarea
        disabled={!jsonData}
        id="about"
        name="about"
        rows={30}
        value={jsonData}
        onChange={(event) => setJsonData(event.target.value)}
        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  );
}
