import { Service, Song } from "@beamerstream/library";

export interface ResourceImporter {
  importSong(filepath: string): Promise<Song>;
  importService(filepath: string): Promise<Service>;
}
