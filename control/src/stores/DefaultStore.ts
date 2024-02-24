import {
  Service,
  ServiceItem,
  Slide,
  Song,
  Theme,
} from "@beamerstream/library";
import { create } from "zustand";

// const { qerror, data: currentVerse } = useQuery(GET_LOCATIONS);
// const [mutateFunction] = useMutation(SET_CURRENT_VERSE);

// const { subscribeToMore, data } = useQuery(GET_SONG);
//   useEffect(() => {
//     subscribeToMore({
//       document: SUBSCRIBE_SONG,
//       // variables: { postID: params.postID },
//       updateQuery: (prev, { subscriptionData }) => {
//         console.log("A", prev, subscriptionData);

//         // if (!subscriptionData.data) return prev;
//         // const newFeedItem = subscriptionData.data.commentAdded;

//         return Object.assign({}, prev, {
//           currentVerse: subscriptionData.data.currentVerseChanged,
//         });
//       },
//     });
//   }, []);

export type State = {
  loading: boolean;
  setLoading: (value: boolean) => void;

  songlist: Song[];
  setSonglist: (value: Song[]) => void;
  deleteSong: (id: string) => void;

  service: Service;
  currentTheme: Theme | null;
  setThemes: (value: Theme[]) => void;
  themes: Theme[];
  currentServiceItem: ServiceItem | null;
  currentSlide: Slide | null;
  setCurrentServiceItem: (id: string) => Promise<void>;
  slideZoom: number;
  setSlideZoom: (value: number) => void;
};

const dummyService: Service = {
  id: "1",
  items: [],
};

export const useDefaultStore = create<State>((set) => ({
  loading: true,
  setLoading: (value: boolean) => set({ loading: value }),

  songlist: [],
  setSonglist: (value: Song[]) => set({ songlist: value }),
  deleteSong: (id: string) => {
    alert(`Song ${id} deleted`);
  },

  service: dummyService,
  currentSlide: null,
  currentTheme: null,
  setThemes: (value: Theme[]) => set({ themes: value }),
  themes: [],
  currentServiceItem: null,
  setCurrentServiceItem: async (id: string) => {
    console.log(id);
    return set({ currentServiceItem: null });
  },
  slideZoom: 4,
  setSlideZoom: (value: number) => set({ slideZoom: value }),
}));
