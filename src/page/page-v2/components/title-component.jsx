// @flow

import React from "react";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import styles from "../common-page-v2.module.scss";

type Props = {
  title: string,
  subtitle: string,
  classes: CommonPageV2Classes,
};

export const TitleComponent = (props: Props) => {
  const { title, subtitle, classes = {} } = props;
  return (
    <div
      data-testid="common-page-title-container"
      className={classNames(styles.titleContainer, classes.titleContainer)}
    >
      <Typography
        data-testid="common-page-title"
        variant="subtitle1"
        className={classNames(styles.title, classes.title)}
      >
        {title}
      </Typography>
      <Typography
        data-testid="common-page-subtitle"
        variant="body2"
        className={classNames(classes.subtitle)}
        color="textSecondary"
      >
        {subtitle}
      </Typography>
    </div>
  );
};
