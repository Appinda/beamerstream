import { Song } from "@beamerstream/library";
export default class ResourceLoader {
    private initDataDirectory;
    init(): Promise<void>;
    getSongs(): Promise<Song[]>;
    getSong(id: string): Promise<Song | null>;
}
//# sourceMappingURL=ResourceLoader.d.ts.map