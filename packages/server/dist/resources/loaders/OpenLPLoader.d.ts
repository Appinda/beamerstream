import { Service, Song } from "@beamerstream/library";
import { Loader } from "./Loader.js";
export declare class OpenLPLoader implements Loader {
    getService(path: string): Promise<Service>;
    getSong(id: string): Promise<Song | null>;
}
//# sourceMappingURL=OpenLPLoader.d.ts.map