import { ImageLayer } from "@beamerstream/library";

type Props = {
  layer: ImageLayer;
};

export function ImageLayer({ layer }: Props) {
  return <text>{layer.id}</text>;
}
