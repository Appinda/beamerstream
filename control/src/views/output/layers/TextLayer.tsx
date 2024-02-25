import { TextLayer } from "@beamerstream/common";

type Props = {
  layer: TextLayer;
};

export function TextLayer({ layer }: Props) {
  return <text>{layer.id}</text>;
}
