import React from "react";
import { ClickableItem } from "../../../types/dropdown";
import { DropdownMenuProps } from "../../../common-dropdown/dropdown-menu";
declare type Props = {
    secondaryActions?: ClickableItem[] | null;
    id?: string;
} & Partial<DropdownMenuProps>;
export declare const SecondaryActionsMenuButton: React.FC<Props>;
export {};
