import React, { ReactNode, forwardRef } from "react";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import styles from "../common-page-v2.module.scss";
import { CommonPageV2Classes } from "../../../types/card";

type Props = {
  title?: ReactNode;
  subtitle?: ReactNode;
  classes?: CommonPageV2Classes;
};

export const TitleComponent = forwardRef<any, Props>(
  (props: Props, ref: any) => {
    const { title = "", subtitle = "", classes = {} } = props;
    if (!title && !subtitle) {
      return <div ref={ref} className={styles.titleContainer} />;
    }
    return (
      <div
        ref={ref}
        data-testid="common-page-title-container"
        className={classNames(styles.titleContainer, classes.titleContainer)}
      >
        {title && (
          <Typography
            noWrap
            data-testid="common-page-title"
            variant="h6"
            className={classNames(styles.title, classes.title)}
          >
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography
            noWrap
            data-testid="common-page-subtitle"
            variant="body2"
            className={classNames(classes.subtitle)}
            color="textSecondary"
          >
            {subtitle}
          </Typography>
        )}
      </div>
    );
  },
);
