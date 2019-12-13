import React from "react";
/**
 *  ExternalLink opens in a new tab, while ensuring that the link protects from:
 * https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
 */
export declare const ExternalLink: React.ForwardRefExoticComponent<{
    /** data-testid for the component */
    "data-testid"?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement> & React.RefAttributes<any>>;
