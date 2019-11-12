import { ClickableItem } from "./dropdown";
import { ComponentType, ReactNode } from "react";
export declare type CommonCardClasses = {
    body?: string;
    footer?: string;
    footerActions?: string;
    header?: string;
    headerActions?: string;
    root?: string;
    subheader?: string;
    title?: string;
};
export declare type CommonPageClasses = {
    root?: string;
    header?: string;
    headerActions?: string;
    title?: string;
    subtitle?: string;
    contentAndMenu?: string;
    content?: string;
    sideMenu?: string;
};
export declare type CommonTabbedPageClasses = CommonPageClasses & {
    tabs?: string;
    contentContainer?: string;
};
export declare type PageConfig = {
    key: string;
    label: ReactNode;
    Component: ComponentType<any>;
    componentProps: Record<string, any>;
    id?: string;
    className?: string;
    menuContents?: MenuItem[];
    tabClasses?: Record<string, any>;
};
export declare type MenuItem = {
    key: string;
    label: ReactNode;
};
export declare type HeaderAction = ClickableItem & {
    id?: string;
    color?: string;
    href?: string;
};
export declare type PageConfigV2 = {
    key: string;
    label: ReactNode;
    Component: ComponentType<any>;
    componentProps: Record<string, any>;
    id?: string;
    className?: string;
    tabClasses?: Record<string, any>;
    isVisible?: boolean;
    isDisabled?: boolean;
};
export declare type CommonPageV2Classes = {
    root?: string;
    centerHeader?: string;
    header?: string;
    headerActions?: string;
    primaryActions?: string;
    secondaryActions?: string;
    titleContainer?: string;
    title?: string;
    subtitle?: string;
    content?: string;
};
export declare type CommonTabbedPageV2Classes = CommonPageV2Classes & {
    tabs?: string;
    tab?: string;
};
