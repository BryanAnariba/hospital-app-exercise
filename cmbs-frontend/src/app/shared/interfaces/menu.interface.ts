export interface Menu {
  title: string;
  icon: string;
  subMenu: SubMenu[];
}

export interface SubMenu {
  title: string;
  url: string;
}
