import { ContextMenu } from "../../ContextMenu";

export default function Header() {
  return (
    <ContextMenu
      menu={[
        {
          name: "Option A",
          onClick: () => {
            alert("A");
          },
        },
        {
          name: "Option B",
          onClick: () => {
            alert("B");
          },
        },
      ]}
    >
      <div className="w-full h-min border-b">Header</div>
    </ContextMenu>
  );
}
