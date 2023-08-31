export interface Verse {
    tag: string;
    text: string;
}
export interface Song {
    id: string;
    titles: string[];
    authors: string[];
    copyright?: string;
    ccli?: number;
    comments?: string;
    verseOrder: string;
    lyrics: Verse[];
}
export interface Slide {
    id: string;
}
export interface Service {
    id: string;
}
