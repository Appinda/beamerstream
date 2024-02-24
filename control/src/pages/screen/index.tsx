import { ReactNode } from "react";
import { useDefaultStore } from "../../stores/DefaultStore";
import { Slide } from "@beamerstream/library";
import { TextLayer, ColorLayer, ImageLayer } from "./layers";

export default function Screen() {
  const [currentSlide] = useDefaultStore((state) => [state.currentSlide]);

  // const lyrics = useRef<SVGTextElement>(null);
  const fontSize = 100;
  const textColor = "white";
  const textStrokeColor = "black";
  const textStrokeWidth = 20;
  const screenSize = [1920, 1080];
  const style = `
  
  .Screen {
    background-color: black;
    color: white;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .Lyrics {
    font-size: ${fontSize}px;
    font-weight: 600;
    z-index: 10;
    fill: ${textColor};
    paint-order: stroke;
    stroke: ${textStrokeColor};
    stroke-width: ${textStrokeWidth}px;
    stroke-linecap: butt;
    stroke-linejoin: round;
    dominant-baseline: hanging;
    text-anchor: middle;
  }

  .Background {
    fill: black;
  }

  .BackgroundImage {
    
  }

  .FTB {
    fill: black;
    z-index: 100;
    opacity: 0.5;
  }

  .fill {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  svg {
    width: 100%;
    height: 100%;
    background-color: black;
    fill: red;
  }

  `;

  // useEffect(() => {
  //   if (!lyrics.current || !currentSlide) return;

  //   const verse = currentSlide?.split("\n");

  //   lyrics.current.innerHTML = `
  //       <tspan x="50%" dy="-1.2em">${verse[1] ?? ""}</tspan>
  //       <tspan x="50%" dy="-1.2em">${verse[0] ?? ""}</tspan>
  //       <tspan x="50%" dy="2.4em">${verse[2] ?? ""}</tspan>
  //       <tspan x="50%" dy="1.2em">${verse[3] ?? ""}</tspan>
  //   `;
  // }, [lyrics, currentSlide]);

  function onDoubleClick() {
    document.body.requestFullscreen();
  }

  function renderLayers(slide: Slide): ReactNode {
    return slide.layers.map((layer) => {
      switch (layer.type) {
        case "text":
          return <TextLayer layer={layer} />;
        case "color":
          return <ColorLayer layer={layer} />;
        case "image":
          return <ImageLayer layer={layer} />;
        default:
          return <div></div>;
      }
    });
  }

  return (
    <div className="Screen w-full h-full" onDoubleClick={() => onDoubleClick()}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${screenSize[0]} ${screenSize[1]}`}
        overflow="hidden"
      >
        {currentSlide && renderLayers(currentSlide)}
        {/* <defs>
          <rect
            id="rect"
            width="100%"
            height="100%"
            fill="none"
            stroke="blue"
          />
          <clipPath id="clip">
            <use href="#rect" />
          </clipPath>
        </defs>
        <rect width="100%" height="100%" className="Background" />
        <image
          href="https://images.pexels.com/photos/1250283/pexels-photo-1250283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          height="100%"
          width="100%"
          preserveAspectRatio="xMinYMin slice"
          className="BackgroundImage"
        />
        <rect width="100%" height="100%" className="FTB" />
        <text
          x="50%"
          y="50%"
          className="Lyrics"
          clipPath="url(#clip)"
          ref={lyrics}
        ></text>*/}
      </svg>
      <style dangerouslySetInnerHTML={{ __html: style }}></style>
    </div>
  );
}
