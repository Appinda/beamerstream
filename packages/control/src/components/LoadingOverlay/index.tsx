import { useEffect, useState } from "react";
import { useDefaultStore } from "../../stores/DefaultStore";

export default function LoadingOverlay() {
  const setLoading = useDefaultStore((state) => state.setLoading);

  const [value, setValue] = useState(0);
  useEffect(() => {
    setValue(100);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div
      className="absolute w-screen h-screen left-0 top-0 z-[100] bg-blue-500 flex flex-col gap-16 justify-center items-center select-none"
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <span className="text-8xl text-white">Beamerstream</span>
      <div className="progrss bg-white w-full max-w-[700px] h-[13px] rounded-md overflow-hidden">
        <div
          className="bg-blue-700 h-full transition-all duration-1000"
          style={{ width: value + "%" }}
        ></div>
      </div>
    </div>
  );
}
