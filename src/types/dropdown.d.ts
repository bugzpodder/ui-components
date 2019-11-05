import { ReactNode } from "react";

export type ClickableItem = {
  content?: ReactNode;
  onClick?: Function;
  href?: string;
  [x0: string]: any;
};
