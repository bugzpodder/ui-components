// @flow

declare type ClickableItem = {
  content: Node<*>,
  onClick?: Function,
  [string]: any,
};

declare type DropdownMenuItem = ClickableItem;
