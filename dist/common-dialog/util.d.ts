import React, { MouseEvent } from "react";
export declare type CommonDialogAction = {
    name: string;
    callback: (event: MouseEvent<HTMLInputElement>) => void;
    icon?: string;
    id?: string;
    isEnabled?: boolean;
    variant?: "text" | "flat" | "outlined" | "contained" | "raised" | "fab" | "extendedFab";
    color?: "default" | "inherit" | "primary" | "secondary";
    isLeftButton?: boolean;
    "data-testid"?: string;
};
export declare const actionToButton: (action: CommonDialogAction) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>;
