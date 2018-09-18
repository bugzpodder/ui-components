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

declare type TabbedCardClasses = {
  content?: string,
  header?: string,
  headerActions?: string,
  tabs?: string,
  root?: string,
  subheader?: string,
  title?: string,
}

declare type TabConfig = {
  label: string,
  value: string,
  content: Node<*>,
  id: string,
  [string]: any,
}

declare type HeaderAction = {
  content: Node<*>,
  onClick: Function,
  id: string,
  color?: Color,
  [string]: any,
}