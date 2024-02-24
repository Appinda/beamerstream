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
export interface PhysicalDisplay {
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
export {};
