import { Slide } from "@beamerstream/library";

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
