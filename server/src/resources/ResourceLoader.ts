import fs from "fs";
import path from "path";
import os from "os";
import { Song } from "@beamerstream/common";
import { ResourceImporter, OpenLPImporter, BeamerstreamImporter } from "./importers/index.js";
import {} from "./importers/OpenLPImporter.js";
import { log } from "console";

export default class ResourceLoader {
  private static readonly beamerstreamImporter = new BeamerstreamImporter();
  private static readonly openLPImporter = new OpenLPImporter();

  private _dataDirectory: string;
  private songsDirectory: string;
  private themesDirectory: string;
  private songs: Song[] = [];

  private get sortedSongs() {
    return this.songs.sort((a, b) => (a.titles[0] ?? "").localeCompare(b.titles[0] ?? ""));
  }
  public get dataDirectory() {
    return this._dataDirectory;
  }
  public async setDataDirectory(value: string): Promise<boolean> {
    if (this._dataDirectory == value) return false;
    this._dataDirectory = value;
    await this.initDataDirectory(this._dataDirectory);
    return true;
  }

  constructor(dataDirectory?: string) {
    const homedir = path.join(os.homedir(), "Documents", "Beamerstream");
    this._dataDirectory = dataDirectory ?? homedir;
    this.songsDirectory = path.join(this._dataDirectory, "songs");
    this.themesDirectory = path.join(this._dataDirectory, "themes");
  }

  private async initDataDirectory(directory: string) {
    console.log(`Opening data directory: "${directory}"`);
    if (!fs.existsSync(directory)) {
      await fs.promises.mkdir(directory);
      await Promise.allSettled([
        fs.promises.mkdir(path.join(directory, "songs")),
        fs.promises.mkdir(path.join(directory, "themes")),
        fs.promises.mkdir(path.join(directory, "services"))
      ]);

      console.log(`Initiated data directory in ${directory}`);
    }
  }

  public async loadSong(songFile: string, importer: ResourceImporter): Promise<Song> {
    const filePath = path.join(this.songsDirectory, songFile);
    const song = await importer.importSong(filePath);
    this.songs.push(song);
    return song;
  }

  private async initSongs(): Promise<number> {
    const dir = await fs.promises.readdir(this.songsDirectory);
    const songs = (
      await Promise.all(
        dir.map((songFile) => this.loadSong(songFile, ResourceLoader.openLPImporter).catch((e) => console.error(e)))
      )
    ).filter((s) => !!s);

    console.log(`${songs.length} song(s) loaded.`);
    return songs.length;
  }

  async init() {
    console.log("Loading resources..");
    await this.initDataDirectory(this._dataDirectory);
    await this.initSongs();
  }

  async getSongs(): Promise<Song[]> {
    return this.sortedSongs;
  }

  async getSong(id: string): Promise<Song | null> {
    return this.songs.find((song) => song.id == id) ?? null;
  }
}
