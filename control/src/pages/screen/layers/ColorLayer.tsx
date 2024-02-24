import { ColorLayer } from "@beamerstream/common";

type Props = {
  layer: ColorLayer;
};

export function ColorLayer({ layer }: Props) {
  return <text>{layer.id}</text>;
}
