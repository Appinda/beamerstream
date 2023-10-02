export type ContextMenuOption = {
  name: string;
  onClick?: () => boolean | void;
};
type ContextMenuData = ContextMenuOption[];

export default ContextMenuData;
