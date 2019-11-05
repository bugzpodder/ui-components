import React, { ReactNode } from "react";
declare type AvatarIconClasses = {
    root?: string;
    button?: string;
    avatar?: string;
    menu?: string;
    menuItem?: string;
};
declare type Props = {
    /** Classes applied to the AvatarIcon sub components. Options include:
     *
     *  - root: root div element
     *
     *  - button: button component
     *
     *  - avatar: avatar image
     *
     *  - menu: menu wrapper
     *
     *  - menuItem: applied to each menu item
     *
     */
    classes?: AvatarIconClasses;
    /** id applied to the button element */
    id?: string;
    /** Change handler when avatar is clicked. Returns the reverse value of `isMenuOpen` */
    onClick?: (x0: boolean) => any;
    /** The URL used to display a picture on the avatar */
    pictureUrl?: string;
    /** Determines if the avatar menu is open */
    isMenuOpen?: boolean;
    /** Array of objects containing keys that are valid Material-UI `MenuItem` props */
    menuItems?: Array<{
        [x: string]: any;
    }>;
    /** Children passed to the AvatarIcon component. Can be used to implement custom icons or letters in the Avatar */
    children?: ReactNode;
};
export declare const AvatarIcon: React.FC<Props>;
export {};
