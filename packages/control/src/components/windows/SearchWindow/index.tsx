import { useDefaultStore } from "../../../stores/DefaultStore";

export function SearchWindow() {
  const [songlist] = useDefaultStore((state) => [state.songlist]);

  return (
    <div className="SearchWindow w-full">
      {songlist.map((s) => (
        <div key={s.id}>{s.titles[0]}</div>
      ))}
    </div>
  );
}
