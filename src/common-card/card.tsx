import Card, { CardProps } from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import React, { ReactNode } from "react";
import classNames from "classnames";
import styles from "./common-card.module.scss";
import { CommonCardClasses, HeaderAction } from "../types/card";
import { MAIN_CARD_ELEVATION } from "@grailbio/lib";
import { SecondaryActionsMenuButton } from "../dev";

export type CommonCardProps = {
  /** The content provide to the card's body */
  children: ReactNode;
  /** Provides the card's Title */
  title?: ReactNode;
  /** An avatar for the card */
  avatar?: ReactNode;
  /** Provides for action components to be rendered at the bottom of `CommonCard` */
  footerActions?: ReactNode;
  /** Provides for action components to be rendered in the top right corner */
  headerActions?: ReactNode;
  /** Provides secondary actions */
  secondaryActions?: HeaderAction[] | null;
  /** Provides a subheader under the `title` */
  subheader?: ReactNode;
  /** Provides built-in margins for the card */
  hasMargin?: boolean;
  /**
   * Provides classNames to the card and its sub-components. Options include:
   *  - `root`
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
  classes?: CommonCardClasses;
  /** Shadow depth, corresponds to dp in the spec. It's accepting values between 0 and 24 inclusive. */
  elevation?: number;
} & CardProps;

/**
 * `CommonCard` provides a component to create basic Material-UI Cards.
 * This was made in order to standardize how we implement cards across UIs.
 */
export const CommonCard: React.FC<CommonCardProps> = props => {
  const {
    classes = {},
    children,
    footerActions = null,
    headerActions = null,
    secondaryActions = null,
    subheader = "",
    avatar = null,
    title = "",
    hasMargin = false,
    elevation = MAIN_CARD_ELEVATION,
    ...cardProps
  } = props;
  return (
    <Card
      data-testid="card"
      className={classNames(classes.root, styles.card, {
        [styles.withMargin]: hasMargin,
      })}
      elevation={elevation}
      {...cardProps}
    >
      {(title || subheader || headerActions || secondaryActions) && (
        // @ts-ignore: data-testid does not exist on type.
        <CardHeader
          data-testid="card-header"
          title={title}
          subheader={subheader}
          titleTypographyProps={{
            "data-testid": "card-title",
          }}
          subheaderTypographyProps={{
            "data-testid": "card-subheader",
          }}
          classes={{
            root: classes.header,
            action: classNames(styles.headerActions, classes.headerActions),
            title: classNames("card-title", classes.title),
            subheader: classes.subheader,
          }}
          avatar={avatar}
          action={
            <>
              {headerActions}
              <SecondaryActionsMenuButton
                id="common-card"
                secondaryActions={secondaryActions}
              />
            </>
          }
        />
      )}
      <CardContent
        data-testid="card-body"
        classes={{
          root: classes.body,
        }}
      >
        {children}
      </CardContent>
      {footerActions && (
        <CardActions
          data-testid="card-footer-actions"
          classes={{
            root: classes.footer,
            spacing: classNames(styles.footerActions, classes.footerActions),
          }}
        >
          {footerActions}
        </CardActions>
      )}
    </Card>
  );
};
