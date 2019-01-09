// @flow
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import React, { type Node } from "react";
import classNames from "classnames";
import styles from "./common-page.module.scss";
import { SideMenu } from "./components/side-menu";
import { SideMenuButton } from "./components/side-menu-button";

type Props = {
  /** Provides the page's Title */
  title?: Node,
  /** Provides for action components to be rendered in the top right corner */
  headerActions?: Array<HeaderAction>,
  /** Provides a subtitle under the `title` */
  subtitle?: Node,
  /**
   * Provides classNames to the page and its sub-components. Options include:
   *
   *  - `root`
   *
   *  - `header` (applied to entire header container which contains headerActions, title, subtitle, and side menu
   *     button)
   *
   *  - `headerActions` (applied to headerActions container)
   *
   *  - `title`
   *
   *  - `subtitle`
   *
   *  - `contentAndMenu` - container around content and side menu.
   *
   *  - `content` - a container inside of contentAndMenu but still around content. This exists to stop the content
   *     from being considered part of a flexbox with the side menu.
   *
   *  - `sideMenu`
   */
  classes?: CommonPageClasses,
  /** Takes a `node` that goes beneath the header. For example, page tabs. */
  subheader?: Node,
  /** Takes a `node` to show on the page */
  children?: Node,
  /** Defines the list of items in the menu. The menu is hidden by default but can be revealed by clicking a hamburger
   *  button to the left of the page. Clicking on each item will scroll to the element with an id matching the key.
   *  If empty, no hamburger icon will appear. */
  menuContents?: Array<MenuItem>,
};

type State = {
  sideMenuIsExpanded: boolean,
};

/**
 * `CommonPage` provides a component for a page with a flush card header and an
 * optional side menu. Note: if you are using this component
 * in a new environment, we recommend building a new child component for your
 * environment; take a look at the `LimsPage` component as an example.
 */
export class CommonPage extends React.Component<Props, State> {
  state = {
    sideMenuIsExpanded: false,
  };

  toggleSideMenu = () => {
    this.setState(state => ({ sideMenuIsExpanded: !state.sideMenuIsExpanded }));
  };

  render = () => {
    const {
      classes = {},
      headerActions = [],
      subtitle = "",
      title = "",
      subheader,
      children,
      menuContents = [],
      ...cardProps
    } = this.props;
    const { sideMenuIsExpanded } = this.state;
    const mappedHeaderActions = headerActions.map((action, index) => {
      const {
        Component, content = "", id, componentProps, ...buttonProps
      } = action;
      if (Component) {
        return (
          <Component
            key={`header-action-${index}`}
            id={id}
            {...componentProps}
          >
            {content}
          </Component>
        );
      }
      return (
        <Button
          key={`header-action-${index}`}
          id={id}
          data-testid={id}
          {...buttonProps}
        >
          {content}
        </Button>
      );
    });

    return (
      <div
        className={classNames(classes.root, styles.pageContainer)}
        data-testid="common-page"
      >
        <Card
          classes={{
            root: classNames(classes.header, styles.stickyHeader, styles.pageHeader),
          }}
          {...cardProps}
        >
          <CardHeader
            data-testid="common-page-card-header"
            title={title}
            titleTypographyProps={{
              variant: "h5",
            }}
            classes={{
              root: styles.cardHeader,
              action: classNames(styles.headerActions, classes.headerActions),
              title: classNames("header-title", classes.title),
              subheader: classes.subtitle,
            }}
            action={mappedHeaderActions}
            subheader={subtitle}
            avatar={
              menuContents.length > 0 && (
                <SideMenuButton
                  isExpanded={sideMenuIsExpanded}
                  toggleMenu={this.toggleSideMenu}
                />
              )
            }
          />
          {subheader && subheader}
        </Card>
        <div className={classNames(styles.contentAndMenu, classes.contentAndMenu)}>
          {menuContents.length > 0 && (
            <SideMenu
              data-testid="common-page-side-menu"
              isExpanded={sideMenuIsExpanded}
              menuContents={menuContents}
              classes={classes.sideMenu}
            />
          )}
          <div className={classNames(styles.content, classes.content)}>{children}</div>
        </div>
      </div>
    );
  };
}
