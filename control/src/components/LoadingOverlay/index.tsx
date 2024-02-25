type Props = {
  percentage: number;
};

export default function LoadingOverlay({ percentage }: Props) {
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
          style={{ width: percentage + "%" }}
        ></div>
      </div>
    </div>
  );
}
