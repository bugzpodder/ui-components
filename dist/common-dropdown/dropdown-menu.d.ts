import React, { ReactNode } from "react";
import { ClickableItem } from "../types/dropdown";
import { PopoverOrigin } from "@material-ui/core/Popover";
export declare type DropdownMenuProps = {
    /** The id of the dropdown portion of the menu, used for accessibility */
    dropdownId: string;
    /** The content of the dropdown activator button */
    buttonContent: ReactNode;
    /** An array of ClickableItems to render in the dropdown. Options include:
     *
     *  - `content`: The text to display in the menu item.
     *
     *  - `isEnabled`: Optional. Whether the MenuItem is disabled (i.e. not clickable).
     *
     *  - `onClick`: Optional. Function to call when the MenuItem is clicked.
     *
     */
    menuItems: ClickableItem[];
    /** Determines if the dropdown button is disabled */
    isDisabled?: boolean;
    /** Defaults to false. When true, the underlying component of the button is an IconButton, rather than a Button. */
    isIconButton?: boolean;
    /** classes object for the Button component */
    buttonClasses?: {
        [x: string]: any;
    };
    /** classes object for the Menu component */
    menuClasses?: {
        [x: string]: any;
    };
    /** The anchor point on the button where the menu will attach to. Uses GRAIL's default "left bottom" */
    anchorOrigin?: PopoverOrigin;
    /** The point on the menu that will attach to the anchor origin. Uses Material-UI's default to "top left" */
    transformOrigin?: PopoverOrigin;
};
export declare const CommonDropdownMenu: React.FC<DropdownMenuProps>;
