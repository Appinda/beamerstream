import { useClientState } from "../../../hooks/useClientState";

export default function Footer() {
  const clientState = useClientState();

  return (
    <div className="w-full h-min border-t flex p-2">
      <input
        type="range"
        min={1}
        max={8}
        value={clientState.slideZoom}
        onChange={(e) => clientState.setSlideZoom(e.target.valueAsNumber)}
        className="cursor-pointer"
      ></input>
    </div>
  );
}
