import { HTMLProps } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { classNames } from "../../../utils";
import { Slide } from "@beamerstream/common";
import { SlidePreview } from "../../SlidePreview";
import { useClientState } from "../../../hooks/useClientState";

type SlideProps = HTMLProps<HTMLDivElement> & {
  active: boolean;
  size: number;
  slide: Slide;
};

export function Slide({ active, size, slide, ...props }: SlideProps) {
  return (
    <div
      {...props}
      className="p-1 h-max"
      style={{ width: `calc(100% / ${size})` }}
    >
      <div
        className={classNames(
          "bg-gray-800 h-full text-white border-2 border-gray-500 outline cursor-pointer [&.active]:outline-yellow-300",
          active ? "active" : ""
        )}
      >
        <SlidePreview slide={slide} />
      </div>
    </div>
  );
}

type Props = {
  slides?: Slide[];
  activeSlide?: string | null;
  onSelectSlide?: (id: string) => any;
};

export function ActiveSlidesWindow({
  slides = [],
  onSelectSlide,
  activeSlide = null,
}: Props) {
  const clientState = useClientState();
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <Header />
      <div className="h-full w-full p-1 relative overflow-auto">
        <div className="grow flex relative h-full flex-wrap content-start overflow-y-scroll">
          {slides.map((slide, i) => (
            <Slide
              key={i}
              slide={slide}
              onClick={() => onSelectSlide?.("slide")}
              active={activeSlide == slide.id}
              size={clientState.slideZoom}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
