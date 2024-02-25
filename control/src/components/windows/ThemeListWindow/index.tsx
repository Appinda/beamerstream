import { Slide, Theme } from "@beamerstream/common";
import { SlidePreview } from "../..";
import { Disclosure } from "@headlessui/react";
import { ChevronRight } from "react-bootstrap-icons";
import { classNames } from "../../../utils";

type Props = {
  themes: Theme[];
  activeSlide?: Slide;
  onSlideSelect?: (slide: Slide) => any;
};

export function ThemeListWindow({ themes, onSlideSelect, activeSlide }: Props) {
  function renderSlide(slide: Slide) {
    return (
      <div
        key={slide.id}
        className={classNames(
          "flex bg-gray-600 hover:bg-gray-500 text-white cursor-pointer p-1 gap-2 [&.active]:bg-gray-500",
          activeSlide?.id == slide.id ? "active" : ""
        )}
        onClick={() => onSlideSelect?.(slide)}
      >
        <div className="w-1/3 min-w-[100px] max-w-[200px]">
          <SlidePreview slide={slide} />
        </div>
        <span>{slide.name}</span>
      </div>
    );
  }

  function renderTheme(theme: Theme) {
    return (
      <Disclosure key={theme.id} defaultOpen>
        <Disclosure.Button className="py-2 px-2 w-full text-left bg-gray-700 text-white hover:bg-gray-600 flex border-b border-gray-700">
          {theme.name}
          <ChevronRight className="ml-auto mt-1 ui-open:rotate-90 ui-open:transform" />
        </Disclosure.Button>
        <Disclosure.Panel className="text-gray-500">
          {theme.slides?.map((slide) => renderSlide(slide))}
        </Disclosure.Panel>
      </Disclosure>
    );
  }

  return (
    <div className="ThemeListWindow w-full select-none">
      {themes.map((theme) => renderTheme(theme))}
    </div>
  );
}
