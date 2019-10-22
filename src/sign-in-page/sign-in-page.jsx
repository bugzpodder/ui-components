// @flow
import Button from "@material-ui/core/Button";
import React from "react";
import Typography from "@material-ui/core/Typography";
import styles from "./sign-in-page.module.scss";

type Props = {
  /**
    The logo.
    Suggestion:
    `import { GrailLogo } from "@grail/common-private";`
    and set `logo` prop:
    `logo={<GrailLogo />}`
  */
  logo: Node<>,
  /** Action when user clicks `Sign In` button */
  onSignIn: () => any,
  /**
    The full screen background image.
    Suggestion:
    `import { signInLandingPage } from "@grail/common-private";`
    and set `backgroundImage` prop:
    `backgroundImage: {signInLandingPage}`
  */
  backgroundImage?: string,
  /** Optional inner content shown under `Sign In` button */
  children?: Node<>,
  /** Optional string to override default typography subheader */
  subheader?: string,
};

const DEFAULT_SUBHEADER = "Detect cancer early, when it can be cured.";
export const SignInPage = (props: Props) => {
  const {
    logo, onSignIn, backgroundImage, subheader = DEFAULT_SUBHEADER, children,
  } = props;
  return (
    <div className={styles.signInPage}>
      <div
        className={styles.backgroundImage}
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        }}
      />
      <div className={styles.contents}>
        {logo}
        <Typography className={styles.mission}>{subheader}</Typography>
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
