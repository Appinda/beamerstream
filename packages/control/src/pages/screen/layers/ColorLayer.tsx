import { ColorLayer } from "@beamerstream/library";

type Props = {
  layer: ColorLayer;
};

export function ColorLayer({ layer }: Props) {
  return <text>{layer.id}</text>;
}
