// @flow
import ArrowBack from "@material-ui/icons/ArrowBack";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import classNames from "classnames";
import pathToRegexp from "path-to-regexp";
import styles from "./sidebar.module.scss";
import { CollapsableListItem } from "../../list";
import { ExternalLink } from "../../external-link";
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

export class Sidebar extends React.Component<Props, State> {
  state = {
    openItems: new Set(),
    touchedItems: new Set(),
  };

  componentDidUpdate = (prevProps: Props, prevState: State) => {
    if (this.props !== prevProps && prevState.touchedItems.size) {
      this.setState({ touchedItems: new Set() });
    }
  };

  getPlaceholderLink = (item: SidebarItemPlaceholder, key: number, nested: boolean = false) => {
    return (
      <ListItem
        key={key}
        disabled
        button
        className={classNames({ [styles.nested]: nested })}
        dense={nested}
        disableRipple
      >
        <ListItemText primary={`${item.name} (coming soon)`} />
      </ListItem>
    );
  };

  getLink = (item: SidebarItemLink, key: number, nested: boolean = false) => {
    const {
      exact = false, domain: itemDomain, path, name,
    } = item;
    const { currentPath, domain, InternalLinkComponent } = this.props;
    if (InternalLinkComponent !== undefined && itemDomain === domain) {
      const active = pathToRegexp(path, [], { end: exact }).test(currentPath);
      return (
        <ListItem
          id={`${domain}${item.path.replace(/\//g, "-")}`}
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
          <ListItemText primary={name} />
        </ListItem>
      );
    }
    const domainString = this.props.externalDomains.get(itemDomain) || "";
    return (
      <ListItem
        key={key}
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
        <ListItemText primary={item.name} />
      </ListItem>
    );
  };

  getIsOpen = (
    index: number,
    { sidebarContent = sidebarItems, domain, currentPath }: Props = this.props,
    state: State = this.state,
  ): boolean => {
    if (state.openItems.has(index) || state.touchedItems.has(index)) {
      return state.openItems.has(index);
    }
    // $FlowFixMe: getIsOpen is called on SidebarItemParent and returns false otherwise.
    const { children } = sidebarContent[index];
    if (children === undefined) {
      return false;
    }
    return children.some((child: SidebarItemChild) => {
      if (child.placeholder || false) {
        return false;
      }
      const childLink: SidebarItemLink = child;
      const { domain: childDomain, exact = false, path } = childLink;
      if (childDomain === domain) {
        return pathToRegexp(path, [], { end: exact }).test(currentPath);
      }
      return false;
    });
  };

  toggleCollapsableListItem = (index: number) => {
    this.setState((prevState: State, props: Props) => {
      const touchedItems = new Set(prevState.touchedItems || []);
      const openItems = new Set(prevState.openItems);
      if (this.getIsOpen(index, props, prevState)) {
        openItems.delete(index);
      } else {
        openItems.add(index);
      }
      if (!prevState.touchedItems.has(index)) {
        touchedItems.add(index);
        return { openItems, touchedItems };
      }
      return { openItems };
    });
  };

  renderItem = (item: SidebarItem, index: number) => {
    if (item.children !== undefined) {
      const isOpen = this.getIsOpen(index);
      return (
        <CollapsableListItem
          key={index}
          isOpen={isOpen}
          toggleList={this.toggleCollapsableListItem.bind(this, index)}
          headerText={item.name}
        >
          {/* $FlowFixMe item is SidebarItemParent if item.children is defined. */
          item.children.map((childItem, childIndex) => {
            if (childItem.placeholder) {
              return this.getPlaceholderLink(childItem, index * 1000 + childIndex, true);
            }
            return this.getLink(childItem, index * 1000 + childIndex, true);
          })}
        </CollapsableListItem>
      );
    }
    if (item.placeholder) {
      return this.getPlaceholderLink(item, index);
    }
    // $FlowFixMe if item.children is undefined it must be type SidebarItemLink.
    return this.getLink(item, index);
  };

  collapseAll = (sidebarItems: Array<SidebarItem>) => {
    const itemIndices = sidebarItems.map((__item, index) => index);
    this.setState({ openItems: new Set(), touchedItems: new Set(itemIndices) });
  };

  render() {
    const {
      sidebarContent = sidebarItems, footer, isOpen, toggle, drawerVariant, classes = {},
    } = this.props;
    return (
      <Drawer
        id="sidebar-drawer"
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
              onClick={toggle}
            >
              <ArrowBack />
            </IconButton>
            <Divider />
            <span
              onClick={() => this.collapseAll(sidebarContent)}
              data-testid="collapse-all-sidebar-items"
              className={styles.collapseAllSidebarItems}
            />
          </div>
        )}
        <div
          tabIndex={0}
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
          <List className={styles.list}>{sidebarContent.map(this.renderItem)}</List>
        </div>
        <div className={styles.drawerFooter}>
          <Divider />
          {footer}
        </div>
      </Drawer>
    );
  }
}
