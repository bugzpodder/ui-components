import { ClickableItem } from "./dropdown";
import { ComponentType, ReactNode } from "react";

export type CommonCardClasses = {
  body?: string;
  footer?: string;
  footerActions?: string;
  header?: string;
  headerActions?: string;
  root?: string;
  subheader?: string;
  title?: string;
};

export type CommonPageClasses = {
  root?: string;
  header?: string;
  headerActions?: string;
  title?: string;
  subtitle?: string;
  contentAndMenu?: string;
  content?: string;
  sideMenu?: string;
};

export type CommonTabbedPageClasses = CommonPageClasses & {
  tabs?: string;
  contentContainer?: string;
};

export type PageConfig = {
  key: string;
  label: ReactNode;
  Component: ComponentType<any>;
  componentProps?: Record<string, any>;
  id?: string;
  className?: string;
  menuContents?: MenuItem[];
  tabClasses?: Record<string, any>;
};

export type MenuItem = {
  key: string;
  label: ReactNode;
};

export type HeaderAction = ClickableItem & {
  id?: string;
  color?: string;
  href?: string;
};

export type PageConfigV2 = {
  key: string;
  label: ReactNode;
  Component: ComponentType<any>;
  componentProps?: Record<string, any>;
  id?: string;
  className?: string;
  tabClasses?: Record<string, any>;
  isVisible?: boolean;
  isDisabled?: boolean;
};

export type CommonPageV2Classes = {
  root?: string;
  centerHeader?: string;
  header?: string;
  headerActions?: string;
  primaryActions?: string;
  secondaryActions?: string;
  titleContainer?: string;
  title?: string;
  subtitle?: string;
  content?: string;
};

export type CommonTabbedPageV2Classes = CommonPageV2Classes & {
  tabs?: string;
  tab?: string;
};
