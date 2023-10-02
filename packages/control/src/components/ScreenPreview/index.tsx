type Props = {
  screen: string;
};

export function ScreenPreview({ screen }: Props) {
  const url = `http://localhost:5173/#/output/${screen}`;

  return (
    <div className="ScreenPreview w-full aspect-video">
      <iframe src={url} className="w-full h-full border-none"></iframe>
    </div>
  );
}
