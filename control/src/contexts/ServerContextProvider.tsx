import { PropsWithChildren } from "react";
import { Slide, Song, Theme } from "@beamerstream/common";
import { MUTATE_CURRENTSLIDE, QUERY_INITIAL, QUERY_SONG } from "./queries";
import { ServerContext } from "./ServerContext";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  loadDevMessages();
  loadErrorMessages();
} else {
  // production code
}

export default function ServerContextProvider({ children }: PropsWithChildren) {
  const initialQuery = useQuery<{
    songs: Partial<Song>[];
    themes: Theme[];
    currentSlide: Slide | null;
  }>(QUERY_INITIAL);
  const [getSong, songQuery] = useLazyQuery<{ song: Song | null }>(QUERY_SONG);

  console.log(songQuery.data);

  const [setCurrentSlide] = useMutation<{
    setCurrentSlide: boolean;
  }>(MUTATE_CURRENTSLIDE);

  return (
    <ServerContext.Provider
      value={{
        currentSlide: initialQuery.data?.currentSlide ?? null,
        songs: initialQuery.data?.songs ?? [],
        deleteSong(id) {
          console.log("Deleting ", id);
          throw new Error("Not implemented");
        },
        slides: songQuery.data?.song?.slides ?? [],
        themes: initialQuery.data?.themes ?? [],
        service: {
          id: "1",
          items: [
            {
              id: "2",
              name: "Dummy",
              slides: [],
            },
          ],
        },

        setCurrentSlide: (slide: Slide) =>
          setCurrentSlide({
            variables: { songId: slide.id, slideId: slide.id },
          }),
        viewSlides: (songId: string) => getSong({ variables: { songId } }),
      }}
    >
      {children}
    </ServerContext.Provider>
  );
}
