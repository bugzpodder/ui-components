// @flow
import ArrowBack from "@material-ui/icons/ArrowBack";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React, { useEffect, useReducer } from "react";
import classNames from "classnames";
import pathToRegexp from "path-to-regexp";
import styles from "./sidebar.module.scss";
import { CollapsableListItem } from "./collapsable-list-item";
import { ExternalLink } from "../../link";
import { getListItemDataTestId } from "../util";
import { sidebarItems } from "@grail/lib";

type Props = {
  isOpen: boolean,
  toggle: Function,
  domain: string,
  externalDomains: Map<string, string>,
  sidebarContent: SidebarItem[],
  InternalLinkComponent?: React$ElementType,
  footer?: React$Node,
  currentPath: string,
  drawerVariant?: "permanent" | "persistent" | "temporary",
  classes?: BaseNavbarClasses,
};

type State = {
  openItems: Set<number>,
  touchedItems: Set<number>,
};

const getIsOpen = (
  index: number,
  { sidebarContent = sidebarItems, domain, currentPath }: Props,
  state: State,
): boolean => {
  if (state.openItems.has(index) || state.touchedItems.has(index)) {
    return state.openItems.has(index);
  }
  // $FlowFixMe: getIsOpen is called on SidebarItemParent and returns false otherwise.
  const { children } = sidebarContent[index];
  if (children == null) {
    return false;
  }
  return children.some((child: SidebarItemChild) => {
    const childLink: SidebarItemLink = child;
    const { domain: childDomain, exact = false, path } = childLink;
    if (childDomain === domain) {
      return pathToRegexp(path, [], { end: exact }).test(currentPath);
    }
    return false;
  });
};

const TOGGLE = "TOGGLE";
const CLEAR = "CLEAR";

const reducer = (state, action: Object) => {
  const { type } = action;
  switch (type) {
    case TOGGLE: {
      const touchedItems = new Set(state.touchedItems || []);
      const openItems = new Set(state.openItems);
      const { props, index } = action;
      if (getIsOpen(index, props, state)) {
        openItems.delete(index);
      } else {
        openItems.add(index);
      }
      if (!state.touchedItems.has(index)) {
        touchedItems.add(index);
      }
      return { openItems, touchedItems };
    }
    case CLEAR:
      return { ...state, touchedItems: new Set() };
    default:
      return state;
  }
};

export const Sidebar = (props: Props) => {
  const [state, dispatch] = useReducer(reducer, { openItems: new Set(), touchedItems: new Set() });
  useEffect(() => {
    dispatch({ type: CLEAR });
  }, [props.isOpen]);

  const getLink = (item: SidebarItemLink, key: number, nested: boolean = false) => {
    const {
      exact = false, domain: itemDomain, path, name,
    } = item;
    const { currentPath, domain, InternalLinkComponent } = props;
    if (InternalLinkComponent !== undefined && itemDomain === domain) {
      const active = pathToRegexp(path, [], { end: exact }).test(currentPath);
      return (
        <ListItem
          id={`${domain}${item.path.replace(/\//g, "-")}`}
          data-testid={getListItemDataTestId(name)}
          key={key}
          component={InternalLinkComponent}
          to={item.path}
          exact={exact.toString()}
          // When navigating to or from pipeline-ui we want a full reload instead of react-router handling
          target={path.startsWith("/pipeline-ui") || currentPath.startsWith("/pipeline-ui") ? "_self" : undefined}
          button
          className={classNames({ [styles.active]: active, [styles.nested]: nested })}
          dense={nested}
          disableRipple
        >
          <ListItemText
            data-testid={`${getListItemDataTestId(name)}-text`}
            primary={name}
          />
        </ListItem>
      );
    }
    const domainString = props.externalDomains.get(itemDomain) || "";
    return (
      <ListItem
        key={key}
        data-testid={`${getListItemDataTestId(name)}`}
        component={ExternalLink}
        href={`${domainString}${path}`}
        button
        className={classNames({ [styles.nested]: nested })}
        dense={nested}
        disableRipple
        onClick={event => {
          event.stopPropagation();
        }}
      >
        <ListItemText
          data-testid={`${getListItemDataTestId(name)}-text`}
          primary={item.name}
        />
      </ListItem>
    );
  };

  const toggleCollapsableListItem = (index: number) => {
    dispatch({ type: TOGGLE, index, props });
  };

  const renderItem = (item: SidebarItem, index: number) => {
    if (item.children !== undefined) {
      const isOpen = getIsOpen(index, props, state);
      return (
        <CollapsableListItem
          key={index}
          isOpen={isOpen}
          toggleList={() => toggleCollapsableListItem(index)}
          headerText={item.name}
        >
          {/* $FlowFixMe item is SidebarItemParent if item.children is defined. */
          item.children.map((childItem, childIndex) => getLink(childItem, index * 1000 + childIndex, true))}
        </CollapsableListItem>
      );
    }
    // $FlowFixMe if item.children is undefined it must be type SidebarItemLink.
    return getLink(item, index);
  };

  const {
    sidebarContent = sidebarItems, footer, isOpen, toggle, drawerVariant, classes = {},
  } = props;
  return (
    <Drawer
      id="sidebar-drawer"
      data-testid="navbar-sidebar"
      anchor="left"
      open={isOpen}
      transitionDuration={0}
      onClose={toggle}
      className={classes.sideBar}
      variant={drawerVariant}
    >
      {drawerVariant !== "persistent" && (
        <div>
          <IconButton
            id="close-sidebar"
            data-testid="navbar-sidebar-close"
            onClick={toggle}
          >
            <ArrowBack />
          </IconButton>
          <Divider />
        </div>
      )}
      <div
        tabIndex={0}
        data-testid="navbar-sidebar-list"
        role="button"
        onClick={event => {
          if (
            event.ctrlKey ||
            event.shiftKey ||
            event.metaKey || // apple
            (event.button && event.button === 1) // middle click, >IE9 + everyone else
          ) {
            return;
          }
          if (drawerVariant !== "persistent") {
            toggle();
          }
        }}
        className={classNames(styles.drawer, classes.drawer)}
      >
        <List className={styles.list}>{sidebarContent.map(renderItem)}</List>
      </div>
      <div
        data-testid="navbar-sidebar-footer"
        className={styles.drawerFooter}
      >
        <Divider />
        {footer}
      </div>
    </Drawer>
  );
};
