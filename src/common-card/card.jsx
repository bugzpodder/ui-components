// @flow
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import React, { type Node } from "react";
import classNames from "classnames";
import styles from "./common-card.module.scss";
import { MAIN_CARD_ELEVATION } from "@grail/lib";

type Props = {
  /** The content provide to the card's body */
  children: Node,
  /** Provides the card's Title */
  title?: Node,
  /** An avatar for the card */
  avatar?: Node,
  /** Provides for action components to be rendered at the bottom of `CommonCard` */
  footerActions?: Node,
  /** Provides for action components to be rendered in the top right corner */
  headerActions?: Node,
  /** Provides a subheader under the `title` */
  subheader?: Node,
  /** Provides built-in margins for the card */
  hasMargin?: boolean,
  /**
   * Provides classNames to the card and its sub-components. Options include:
   *
   *  - `header`
   *
   *  - `headerActions` (applied to headerActions container)
   *
   *  - `title`
   *
   *  - `subheader`
   *
   *  - `body` (for card's contents)
   *
   *  - `footer`
   *
   *  - `footerActions` (applied to footerActions container)
   */
  classes?: CommonCardClasses,
};

/**
 * `CommonCard` provides a component to create basic Material-UI Cards.
 * This was made in order to standardize how we implement cards across UIs.
 */
export const CommonCard = (props: Props) => {
  const {
    classes = {},
    children,
    footerActions = null,
    headerActions = null,
    subheader = "",
    avatar = null,
    title = "",
    hasMargin = false,
    ...cardProps
  } = props;
  return (
    <Card
      {...cardProps}
      className={classNames(classes.root, styles.card, { [styles.withMargin]: hasMargin })}
      elevation={MAIN_CARD_ELEVATION}
    >
      {(title || headerActions) && (
        <CardHeader
          data-testid="card-header"
          title={title}
          subheader={subheader}
          classes={{
            root: classes.header,
            action: classNames(styles.headerActions, classes.headerActions),
            title: classNames("card-title", classes.title),
            subheader: classes.subheader,
          }}
          avatar={avatar}
          action={headerActions}
        />
      )}
      <CardContent
        data-testid="card-content"
        classes={{
          root: classes.body,
        }}
      >
        {children}
      </CardContent>
      {footerActions && (
        <CardActions
          data-testid="card-actions"
          classes={{
            root: classes.footer,
            action: classes.footerActions,
          }}
        >
          {footerActions}
        </CardActions>
      )}
    </Card>
  );
};
