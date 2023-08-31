import { Service, Song } from "@beamerstream/library";
import { ResourceImporter } from "./ResourceImporter.js";

export class BeamerstreamImporter implements ResourceImporter {
  importSong(filepath: string): Promise<Song> {
    throw new Error("Method not implemented.");
  }
  importService(filepath: string): Promise<Service> {
    throw new Error("Method not implemented.");
  }
}
