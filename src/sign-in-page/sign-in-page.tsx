import React, { ReactNode } from "react";
import classNames from "classnames";
import styles from "./sign-in-page.module.scss";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

type Props = {
  /**
    The logo.
    Suggestion:
    `import { GrailLogo } from "@grail/common-private";`
    and set `logo` prop:
    `logo={<GrailLogo />}`
  */
  logo?: ReactNode;
  /** Action when user clicks `Sign In` button */
  onSignIn: () => any;
  /**
    The full screen background image.
    Suggestion:
    `import { signInLandingPage } from "@grail/common-private";`
    and set `backgroundImage` prop:
    `backgroundImage: {signInLandingPage}`
  */
  backgroundImage?: string;
  /** Optional string to override default typography subheader */
  subheader?: string;
};

const useStyles = makeStyles({
  backgroundImage: {
    backgroundImage: ({ backgroundImage }: Props) =>
      backgroundImage ? `url(${backgroundImage})` : undefined,
  },
});

const DEFAULT_SUBHEADER = "Detect cancer early, when it can be cured.";
export const SignInPage: React.FC<Props> = (props) => {
  const cssStyles = useStyles(props);
  const { logo, onSignIn, subheader = DEFAULT_SUBHEADER, children } = props;
  return (
    <div className={styles.signInPage}>
      <div
        className={classNames(
          styles.backgroundImage,
          cssStyles.backgroundImage,
        )}
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
