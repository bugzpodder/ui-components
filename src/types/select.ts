// Suggestion object must include the following keys, but may also include others.
import { ReactNode } from "react";

export type CommonSelectOption = {
  label: ReactNode;
  value: string;
  [x0: string]: any;
};

export type Suggestion = {
  label: string;
  value: string;
  [x0: string]: any;
};
