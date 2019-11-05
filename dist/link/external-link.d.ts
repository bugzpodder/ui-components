import React, { ReactNode } from "react";
declare type Props = {
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
export declare const ExternalLink: React.ForwardRefExoticComponent<Props & React.RefAttributes<any>>;
export {};
