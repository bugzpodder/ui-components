import React, { ReactNode, forwardRef } from "react";

type Props = {
  /** Takes a node to include in the omni dropdown after the search fields */
  children?: ReactNode;
  /** The link */
  href: string;
  /** data-testid for the component */
  "data-testid"?: string;
};

/**
 *  ExternalLink opens in a new tab, while ensuring that the link protects from:
 * https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
 */
export const ExternalLink = forwardRef<any, Props>((props: Props, ref: any) => {
  const {
    children,
    "data-testid": dataTestId = "external-link",
    ...aTagProps
  } = props;
  return (
    <a
      ref={ref}
      data-testid={dataTestId}
      {...aTagProps}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
});