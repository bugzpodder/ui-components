import React, { ComponentType, ReactNode } from "react";
import { BaseNavbarClasses } from "../../types/base-navbar";
import { SidebarItem } from "@grailbio/lib";
declare type Props = {
    isOpen: boolean;
    toggle: () => void;
    domain: string;
    externalDomains?: Map<string, string>;
    sidebarContent: SidebarItem[];
    InternalLinkComponent?: ComponentType<any>;
    footer?: ReactNode;
    currentPath: string;
    drawerVariant?: "permanent" | "persistent" | "temporary";
    classes?: BaseNavbarClasses;
};
export declare const Sidebar: React.FC<Props>;
export {};
