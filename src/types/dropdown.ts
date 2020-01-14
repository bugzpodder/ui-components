import { ReactNode } from "react";

export type ClickableItem = {
  content?: ReactNode;
  onClick?: Function;
  href?: string;
  isExternal?: boolean;
  [x0: string]: any;
};
