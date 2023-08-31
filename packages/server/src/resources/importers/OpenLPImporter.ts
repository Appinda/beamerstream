import fs from "fs";
import { Service, Song, Verse } from "@beamerstream/library";
import { ResourceImporter } from "./ResourceImporter.js";
import convert from "xml-js";
import { v4 as uuidv4 } from "uuid";

export class OpenLPImporter implements ResourceImporter {
  async importSong(filepath: string): Promise<Song> {
    const fileContent = await fs.promises.readFile(filepath, { encoding: "utf-8" });
    const xmlContent = JSON.parse(convert.xml2json(fileContent, { compact: true, alwaysArray: true }));

    return {
      id: uuidv4().substring(0, 8),
      authors: xmlContent?.song[0]?.properties[0]?.authors[0]?.author?.map((author: any) => author?._text[0]) ?? [],
      ccli: xmlContent?.song?.[0]?.properties?.[0]?.ccliNo?.[0]?._text[0],
      copyright: xmlContent?.song?.[0]?.properties?.[0]?.copyright?.[0]?._text[0],
      titles: xmlContent?.song?.[0]?.properties?.[0]?.titles?.[0]?.title?.map((title: any) => title?._text[0]) ?? [],
      verseOrder: xmlContent?.song?.[0]?.properties?.[0]?.verseOrder?.[0]?._text[0],
      lyrics: xmlContent?.song?.[0]?.lyrics?.[0]?.verse?.map((v: any) => ({
        tag: v._attributes.name,
        text: v.lines[0]._text.join("<br/>")
      }))
    };
  }
  importService(filepath: string): Promise<Service> {
    throw new Error("Method not implemented.");
  }
}
