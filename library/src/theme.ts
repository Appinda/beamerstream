import { Slide } from "./service";

export interface Theme {
  id: string;
  created: number;
  modified: number;
  name: string;
  slides: Slide[];
}
