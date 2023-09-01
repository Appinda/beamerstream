import { useDefaultStore } from "../../../stores/DefaultStore";

export default function Footer() {
  const [slideZoom, setSlideZoom] = useDefaultStore((state: any) => [
    state.slideZoom,
    state.setSlideZoom,
  ]);

  return (
    <div className="w-full h-min border-t flex p-2">
      <input
        type="range"
        min={1}
        max={8}
        value={slideZoom}
        onChange={(e) => setSlideZoom(e.target.value)}
        className="cursor-pointer"
      ></input>
    </div>
  );
}
