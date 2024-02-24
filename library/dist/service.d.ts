export interface TextLayer {
    id: string;
    type: "text";
    text: string;
}
export interface ImageLayer {
    id: string;
    type: "image";
    src: string;
}
export interface ColorLayer {
    id: string;
    type: "color";
    color: string;
}
export type Layer = TextLayer | ImageLayer | ColorLayer;
export interface Slide {
    id: string;
    name: string;
    layers: Layer[];
}
export interface ServiceItem {
    id: string;
    slides: Slide[];
    name: string;
}
export interface Verse {
    tag: string;
    text: string;
}
export interface Song extends ServiceItem {
    id: string;
    created: number;
    modified: number;
    titles: string[];
    authors: string[];
    copyright?: string;
    ccli?: number;
    comments?: string;
    verseOrder: string;
    lyrics: Verse[];
}
export interface SlideSet {
    id: string;
}
export interface Service {
    id: string;
    items: ServiceItem[];
}
