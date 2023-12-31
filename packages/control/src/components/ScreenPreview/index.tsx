type Props = {
  screen: string;
};

export function ScreenPreview({ screen }: Props) {
  const url = `#/output/${screen}`;

  return (
    <div className="ScreenPreview w-full aspect-video">
      <iframe src={url} className="w-full h-full border-none"></iframe>
    </div>
  );
}
