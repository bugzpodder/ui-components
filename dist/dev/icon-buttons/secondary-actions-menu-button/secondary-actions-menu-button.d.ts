import React from "react";
import { DropdownMenuProps } from "../../../common-dropdown/dropdown-menu";
import { HeaderAction } from "../../../types/card";
declare type Props = {
    secondaryActions?: HeaderAction[] | null;
    id?: string;
} & Partial<DropdownMenuProps>;
export declare const SecondaryActionsMenuButton: React.FC<Props>;
export {};
