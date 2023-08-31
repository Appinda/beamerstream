import { HTMLProps, useState } from "react";
import Footer from "./footer";
import Header from "./header";
import { classNames } from "../../utils";
import { useDefaultStore } from "../../stores/store";

const slides = [
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
];

type SlideProps = HTMLProps<HTMLDivElement> & {
  active: boolean;
  size: number;
};

export function Slide({ active, size, ...props }: SlideProps) {
  return (
    <div
      {...props}
      className="p-1 aspect-video"
      style={{ width: `calc(100% / ${size})` }}
    >
      <div
        className={classNames(
          "bg-gray-800 h-full text-white border-2 border-gray-500 outline cursor-pointer [&.active]:outline-yellow-300",
          active ? "active" : ""
        )}
      >
        Slide
      </div>
    </div>
  );
}

export default function ActiveSlides() {
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [slideZoom] = useDefaultStore((state: any) => [state.slideZoom]);

  function selectSlide(index: number) {
    setSelectedSlide(index);
  }

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <Header />
      <div className="h-full w-full p-1 relative overflow-auto">
        <div className="grow flex relative h-full flex-wrap content-start overflow-y-scroll">
          {slides.map((slide, i) => (
            <Slide
              key={i}
              onClick={() => selectSlide(i)}
              active={selectedSlide == i}
              size={slideZoom}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
