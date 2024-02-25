import { ImageLayer, Slide } from "@beamerstream/common";
import { useRef } from "react";

type Props = {
  slide?: Slide;
};

export function SlideEditorWindow({ slide = undefined }: Props) {
  const canvas = useRef<SVGSVGElement>(null);

  return (
    <div className="SlideEditorWindow w-full h-full bg-gray-800 p-10 overflow-hidden">
      <div
        className="absolute text-white top-0 left-0"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(slide, null, 2).replace(/\n/g, "<br/>"),
        }}
      ></div>
      <svg
        className="Canvas bg-black w-full aspect-video text-white overflow-hidden"
        ref={canvas}
        overflow="hidden"
        viewBox="0 0 1920 1080"
      >
        <image
          href={(slide?.layers[0] as ImageLayer)?.src}
          width="100%"
          height="100%"
          preserveAspectRatio="xMinYMin slice"
        ></image>
        {/* <rect
        //   x={100}
        //   y={100}
        //   width={100}
        //   height={100}
        //   fill="red"
        //   className="cursor-pointer"
      // ></rect> */}
      </svg>
    </div>
  );
}
