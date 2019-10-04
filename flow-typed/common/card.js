// @flow
declare type Color = "default" | "inherit" | "primary" | "secondary";

declare type CommonCardClasses = {
  body?: string,
  footer?: string,
  footerActions?: string,
  header?: string,
  headerActions?: string,
  root?: string,
  subheader?: string,
  title?: string,
};

declare type CommonPageClasses = {
  root?: string,
  header?: string,
  headerActions?: string,
  title?: string,
  subtitle?: string,
  contentAndMenu?: string,
  content?: string,
  sideMenu?: string,
};

declare type CommonTabbedPageClasses = {
  tabs?: string,
  contentContainer?: string,
} & CommonPageClasses;

declare type PageConfig = {
  key: string,
  label: Node,
  Component: React$ComponentType<*>,
  componentProps: Object,
  id?: string,
  className?: string,
  menuContents?: Array<MenuItem>,
  tabClasses?: Object,
};

declare type MenuItem = {
  key: string,
  label: Node,
};

declare type HeaderAction = {
  id: string,
  color?: Color,
  href?: string,
} & ClickableItem;

declare type PageConfigV2 = {
  key: string,
  label: Node,
  Component: React$ComponentType<*>,
  componentProps: Object,
  id?: string,
  className?: string,
  tabClasses?: Object,
  isVisible?: boolean,
  isDisabled?: boolean,
};

declare type CommonPageV2Classes = {
  root?: string,
  centerHeader?: string,
  header?: string,
  headerActions?: string,
  primaryActions?: string,
  secondaryActions?: string,
  titleContainer?: string,
  title?: string,
  subtitle?: string,
  content?: string,
};

declare type CommonTabbedPageV2Classes = {
  tabs?: string,
  tab?: string,
} & CommonPageV2Classes;
