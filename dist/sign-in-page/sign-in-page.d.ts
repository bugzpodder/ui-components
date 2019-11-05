import React, { ReactNode } from "react";
declare type Props = {
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
    /** Optional inner content shown under `Sign In` button */
    children?: ReactNode;
    /** Optional string to override default typography subheader */
    subheader?: string;
};
export declare const SignInPage: React.FC<Props>;
export {};
