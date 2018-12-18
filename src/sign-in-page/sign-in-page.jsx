// @flow
import Button from "@material-ui/core/Button";
import React from "react";
import Typography from "@material-ui/core/Typography";
import styles from "./sign-in-page.module.scss";
import { GrailLogo } from "../logos";

type Props = {
  onSignIn: () => any,
  children?: Node<>,
};

export const SignInPage = (props: Props) => {
  const { onSignIn, children } = props;
  return (
    <div className={styles.signInPage}>
      <div className={styles.backgroundImage} />
      <div className={styles.contents}>
        <GrailLogo color="purple" />
        <Typography className={styles.mission}>Detect cancer early, when it can be cured.</Typography>
        <div className="sign-in">
          <Button
            data-testid="sign-in-button"
            variant="contained"
            color="primary"
            size="large"
            onClick={onSignIn}
          >
            Sign In
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};
