import { ImageLayer } from "@beamerstream/common";

type Props = {
  layer: ImageLayer;
};

export function ImageLayer({ layer }: Props) {
  return <text>{layer.id}</text>;
}
