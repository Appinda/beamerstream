import { Service, Song } from "@beamerstream/library";

export interface Loader {
  getSong(id: string): Promise<Song | null>;
  getService(path: string): Promise<Service>;
}
