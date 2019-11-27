import ArrowBack from "@material-ui/icons/ArrowBack";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React, {
  ComponentType,
  MouseEvent,
  ReactNode,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import classNames from "classnames";
import pathToRegexp from "path-to-regexp";
import styles from "./sidebar.module.scss";
import { BaseNavbarClasses } from "../../../types/base-navbar";
import { CollapsableListItem } from "./collapsable-list-item";
import { ExternalLink } from "../../../link";
import { SidebarItem } from "@grailbio/lib";
import { getListItemDataTestId } from "../util";

type Props = {
  isOpen: boolean;
  toggle: (event?: MouseEvent<HTMLButtonElement>) => void;
  domain: string;
  externalDomains: Map<string, string>;
  sidebarContent: SidebarItem[];
  InternalLinkComponent?: ComponentType<any>;
  footer?: ReactNode;
  currentPath: string;
  drawerVariant?: "permanent" | "persistent" | "temporary";
  classes?: BaseNavbarClasses;
};

const TOGGLE = "TOGGLE";
const COLLAPSE_ALL = "COLLAPSE_ALL";
const CLEAR = "CLEAR";
const OPEN = "OPEN";

const reducer = (
  state,
  action: {
    [x: string]: any;
  },
) => {
  const { type } = action;
  switch (type) {
    case TOGGLE: {
      const openItems = new Set(state.openItems);
      const { index } = action;
      if (openItems.has(index)) {
        openItems.delete(index);
      } else {
        openItems.add(index);
      }
      return { openItems };
    }
    case OPEN: {
      const openItems = new Set(state.openItems);
      openItems.add(action.matchedItem);
      return { openItems };
    }
    case CLEAR:
      return { openItems: new Set([action.matchedItem]) };
    case COLLAPSE_ALL:
      return { openItems: new Set() };
    default:
      return state;
  }
};

export const Sidebar: React.FC<Props> = props => {
  const {
    sidebarContent = [],
    domain,
    currentPath,
    footer,
    isOpen,
    toggle,
    drawerVariant,
    classes = {},
  } = props;

  const matchedItem = useMemo(
    () =>
      sidebarContent.findIndex(({ children = null }) => {
        if (children == null) {
          return false;
        }
        return children.some((child: SidebarItem) => {
          const childLink: SidebarItem = child;
          const { domain: childDomain, exact = false, path } = childLink;
          if (childDomain === domain) {
            return pathToRegexp(path, [], { end: exact }).test(currentPath);
          }
          return false;
        });
      }),
    [currentPath, domain, sidebarContent],
  );

  const [state, dispatch] = useReducer(reducer, { openItems: new Set() });
  useEffect(() => {
    dispatch({ type: CLEAR, matchedItem });
  }, [matchedItem]);
  useEffect(() => {
    isOpen && dispatch({ type: OPEN, matchedItem });
  }, [isOpen, matchedItem]);

  const getLink = (item: SidebarItem, key: number, nested = false) => {
    const { exact = false, domain: itemDomain, path, name } = item;
    const { currentPath, domain, InternalLinkComponent } = props;
    const isPipelineUi =
      (path && path.startsWith("/pipeline-ui")) ||
      (currentPath && currentPath.startsWith("/pipeline-ui"));
    if (
      InternalLinkComponent !== undefined &&
      itemDomain === domain &&
      !isPipelineUi
    ) {
      const active = pathToRegexp(path, [], { end: exact }).test(currentPath);
      return (
        <ListItem
          id={`${domain}${item.path.replace(/\//g, "-")}`}
          data-testid={getListItemDataTestId(name)}
          key={key}
          component={InternalLinkComponent}
          to={item.path}
          exact={exact.toString()}
          button
          className={classNames({
            [styles.active]: active,
            [styles.nested]: nested,
          })}
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
        // When navigating to or from pipeline-ui we want a full reload instead of react-router handling
        component={isPipelineUi ? "a" : ExternalLink}
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
      const isOpen = state.openItems.has(index);
      return (
        <CollapsableListItem
          key={index}
          isOpen={isOpen}
          toggleList={() => toggleCollapsableListItem(index)}
          headerText={item.name}
        >
          {item.children.map((childItem, childIndex) =>
            getLink(childItem, index * 1000 + childIndex, true),
          )}
        </CollapsableListItem>
      );
    }
    return getLink(item, index);
  };

  const collapseAll = () => {
    dispatch({ type: COLLAPSE_ALL });
  };

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
          {/** the below collapse-all span is a hidden element used in E2E testing */}
          <span
            onClick={collapseAll}
            data-testid="collapse-all-sidebar-items"
            className={styles.collapseAllSidebarItems}
          />
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
      <div data-testid="navbar-sidebar-footer" className={styles.drawerFooter}>
        <Divider />
        {footer}
      </div>
    </Drawer>
  );
};
