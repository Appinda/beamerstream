import { Song } from "@beamerstream/library";

export default class ResourceLoader {
  private initDataDirectory() {}

  async init() {}

  async getSongs(): Promise<Song[]> {
    return [];
  }

  async getSong(id: string): Promise<Song | null> {
    return null;
  }
}
