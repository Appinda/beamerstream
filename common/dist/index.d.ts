interface Size {
    height: number;
    width: number;
}
interface Rectangle {
    height: number;
    width: number;
    x: number;
    y: number;
}
interface PhysicalDisplay {
    accelerometerSupport: "available" | "unavailable" | "unknown";
    bounds: Rectangle;
    colorDepth: number;
    colorSpace: string;
    depthPerComponent: number;
    displayFrequency: number;
    id: number;
    internal: boolean;
    label: string;
    monochrome: boolean;
    rotation: number;
    scaleFactor: number;
    size: Size;
    touchSupport: "available" | "unavailable" | "unknown";
    workArea: Rectangle;
    workAreaSize: Size;
}

interface TextLayer {
    id: string;
    type: "text";
    text: string;
}
interface ImageLayer {
    id: string;
    type: "image";
    src: string;
}
interface ColorLayer {
    id: string;
    type: "color";
    color: string;
}
type Layer = TextLayer | ImageLayer | ColorLayer;
interface Slide {
    id: string;
    name: string;
    layers: Layer[];
}
interface ServiceItem {
    id: string;
    slides: Slide[];
    name: string;
}
interface Verse {
    tag: string;
    text: string;
}
interface Song extends ServiceItem {
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
interface SlideSet {
    id: string;
}
interface Service {
    id: string;
    items: ServiceItem[];
}

interface Theme {
    id: string;
    created: number;
    modified: number;
    name: string;
    slides: Slide[];
}

export type { ColorLayer, ImageLayer, Layer, PhysicalDisplay, Service, ServiceItem, Slide, SlideSet, Song, TextLayer, Theme, Verse };
