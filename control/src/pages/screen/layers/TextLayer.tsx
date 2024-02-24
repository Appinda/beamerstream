import { TextLayer } from "@beamerstream/library";

type Props = {
  layer: TextLayer;
};

export function TextLayer({ layer }: Props) {
  return <text>{layer.id}</text>;
}
