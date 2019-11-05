import React, { ReactElement, ReactNode } from "react";
declare type Props = {
    /** Defines the text of the main item. */
    headerText: ReactNode;
    /** Defines props passed into main item's `ListItemText` component. */
    headerTextProps?: {
        [x: string]: any;
    };
    /** Defines props passed into main item's `ListItem` component. */
    headerItemProps?: {
        [x: string]: any;
    };
    /** Defines icon to be placed to the left of main item text. */
    headerIcon?: ReactElement;
    /** Defines the items to be collapsed (wrapped in a `List` component). */
    children: ReactNode;
    /** Overrides initial state (default: false) */
    isOpen?: boolean;
    /** Overrides the internal toggleList function */
    toggleList?: () => any;
};
export declare const CollapsableListItem: React.FC<Props>;
export {};
