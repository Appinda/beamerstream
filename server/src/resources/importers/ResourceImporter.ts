import { Service, Song } from "@beamerstream/common";

export interface ResourceImporter {
  importSong(filepath: string): Promise<Song>;
  importService(filepath: string): Promise<Service>;
}
