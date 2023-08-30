import { Service, Song } from "@beamerstream/library";
import { Loader } from "./Loader.js";

export class OpenLPLoader implements Loader {
  getService(path: string): Promise<Service> {
    throw new Error("Method not implemented.");
  }
  getSong(id: string): Promise<Song | null> {
    throw new Error("Method not implemented.");
  }
}
