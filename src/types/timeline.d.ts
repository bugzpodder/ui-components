import { CommonCardClasses } from "./card";
import { ReactNode } from "react";

export type TimelineGraphRow = {
  date: string;
  content: ReactNode;
  user?: string;
  pictureUrl?: string;
};

export type TimelineGraphClasses = {
  root?: string;
  content?: string;
  item?: string;
  itemContent?: string;
  username?: string;
};

export type TimelineCardClasses = TimelineGraphClasses & {
  commonCard?: CommonCardClasses;
};
