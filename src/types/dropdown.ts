import { ReactNode } from "react";

export type ClickableItem = {
  content?: ReactNode;
  onClick?: Function;
  href?: string;
  isExternal?: boolean;
  isEnabled?: boolean;
  className?: string;
  [x0: string]: any;
};
