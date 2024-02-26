import { PropsWithChildren, useEffect, useState } from "react";
import { ServerContext } from "./ServerContext";
import { trpc } from "../trpc";
import { Slide, Song, Theme } from "@beamerstream/common";

export default function ServerContextProvider({ children }: PropsWithChildren) {
  const utils = trpc.useUtils();
  const songsQuery = trpc.songs.useQuery();
  const themesQuery = trpc.themes.useQuery();

  const [activeSlides, setActiveSlides] = useState<Slide[]>([]);

  useEffect(() => {
    console.log(activeSlides);
  }, [activeSlides]);

  // const initialQuery = useQuery<{
  //   songs: Partial<Song>[];
  //   themes: Theme[];
  //   currentSlide: Slide | null;
  // }>(QUERY_INITIAL);
  // const [getSong, songQuery] = useLazyQuery<{ song: Song | null }>(QUERY_SONG);

  // console.log(songQuery.data);

  // const [setCurrentSlide] = useMutation<{
  //   setCurrentSlide: boolean;
  // }>(MUTATE_CURRENTSLIDE);

  return (
    <ServerContext.Provider
      value={{
        currentSlide: null,
        deleteSong: () => false,
        service: {
          id: "1",
          items: [],
        },
        setCurrentSlide: () => {},
        slides: activeSlides,
        songs: (songsQuery.data as Song[]) ?? [],
        themes: (themesQuery.data as Theme[]) ?? [],
        viewSlides: (id: string) =>
          utils.song.fetch({ id }).then((song) => {
            console.log(song);

            setActiveSlides(song?.slides as Slide[]);
          }),
        // currentSlide: initialQuery.data?.currentSlide ?? null,
        // songs: initialQuery.data?.songs ?? [],
        // deleteSong(id) {
        //   console.log("Deleting ", id);
        //   throw new Error("Not implemented");
        // },
        // slides: songQuery.data?.song?.slides ?? [],
        // themes: initialQuery.data?.themes ?? [],
        // service: {
        //   id: "1",
        //   items: [
        //     {
        //       id: "2",
        //       name: "Dummy",
        //       slides: [],
        //     },
        //   ],
        // },

        // setCurrentSlide: (slide: Slide) =>
        //   setCurrentSlide({
        //     variables: { songId: slide.id, slideId: slide.id },
        //   }),
        // viewSlides: (songId: string) => getSong({ variables: { songId } }),
      }}
    >
      {children}
    </ServerContext.Provider>
  );
}
