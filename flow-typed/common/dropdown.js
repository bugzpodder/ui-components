// @flow

declare type ClickableItem = {
  content?: Node<*>,
  onClick?: Function,
  href?: string,
  [string]: any,
};

declare type DropdownMenuItem = ClickableItem;
