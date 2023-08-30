type Props = {
  children: any;
  title?: string;
};

function Header({ children }: { children?: string }) {
  return (
    <div className="border-b border-gray-500 px-1 text-xs bg-gray-800 cursor-pointer select-none">
      {children}
    </div>
  );
}

export default function Window({ children, title }: Props) {
  return (
    <div className="Window w-full h-full border border-gray-600 rounded-sm flex flex-col overflow-auto">
      {title && <Header>{title}</Header>}
      <div className="grow overflow-auto">{children}</div>
    </div>
  );
}
