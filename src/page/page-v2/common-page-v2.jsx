// @flow
import Paper from "@material-ui/core/Paper";
import React, { type Node } from "react";
import classNames from "classnames";
import styles from "./common-page-v2.module.scss";
import { HeaderActions } from "./components/header-actions";
import { SpinnerOverlay } from "../../spinner-overlay";
import { TitleComponent } from "./components/title-component";

type Props = {
  /** Page title */
  title?: Node,
  /** Subtitle shown under the `title` */
  subtitle?: Node,
  /**
   *
   * ClassNames for the page and its sub-components. Options include:
   *
   *  - `root`
   *
   *  - `header` (applied to entire header container which contains headerActions, title, subtitle, and special actions)
   *
   *  - `headerActions` (applied to the container around the header actions)
   *
   *  - `primaryActions`
   *
   *  - `secondaryActions`
   *
   *  - `titleContainer` (applied to the container around the title and subtitle)
   *
   *  - `title`
   *
   *  - `subtitle`
   *
   *  - `content` - (applied to the container around the content)
   */
  classes?: CommonTabbedPageV2Classes,
  /** `Node` displayed in the center of the header. For example, page tabs. */
  centerHeader?: Node,
  /** Takes a `node` to show on the page */
  children?: Node,
  /** Displays a non-interactive loading animation */
  isLoading?: boolean,
  /** Primary actions to display on the header */
  primaryActions?: Array<HeaderAction>,
  /** Secondary actions to display in the secondary actions menu */
  secondaryActions?: Array<HeaderAction>,
};

/**
 * `CommonPageV2` provides a component for a page with a flush card header.
 * Note: if you are using this component
 * in a new environment, we recommend building a new child component for your
 * environment; take a look at the `LimsPageV2` component as an example.
 */
export const CommonPageV2 = (props: Props) => {
  const {
    classes = {},
    subtitle = "",
    title = "",
    children,
    primaryActions = [],
    secondaryActions = [],
    centerHeader,
    isLoading = false,
    ...cardProps
  } = props;
  const hasChildren = Array.isArray(children) ? children.filter(child => child).length > 0 : !!children;
  return (
    <div
      className={classNames(classes.root, styles.pageContainer)}
      data-testid="common-page"
    >
      <Paper
        square
        data-testid="common-page-header"
        classes={{
          root: classNames(classes.header, styles.stickyHeader, styles.pageHeader),
        }}
        {...cardProps}
      >
        {(title || subtitle) && (
        <TitleComponent
          title={title}
          classes={classes}
          subtitle={subtitle}
        />
        )}
        {centerHeader && centerHeader}
        {(primaryActions || secondaryActions) && (
          <HeaderActions
            classes={classes}
            primaryActions={primaryActions}
            secondaryActions={secondaryActions}
          />
        )}
      </Paper>
      {hasChildren && (
        <div
          data-testid="common-page-content"
          className={classNames(styles.content, classes.content)}
        >
          {children}
          <SpinnerOverlay isActive={isLoading} />
        </div>
      )}
    </div>
  );
};
