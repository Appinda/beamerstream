import { Slide } from "@beamerstream/common";

type Props = {
  slide: Slide;
};

export function SlidePreview({ slide }: Props) {
  return (
    <div className="SlidePreview w-full aspect-video bg-black">
      Slide {slide.id}
    </div>
  );
}
