import { Service, Slide, Song, Theme } from "@beamerstream/common";
import { createContext } from "react";

export type ServerContextType = {
  songs: Partial<Song>[];
  deleteSong: (id: string) => boolean;

  currentSlide: Slide | null;
  setCurrentSlide: (slide: Slide) => void;

  slides: Slide[];
  viewSlides: (id: string) => void;

  themes: Theme[];
  service: Service;
};

export const ServerContext = createContext<ServerContextType>(null!);
