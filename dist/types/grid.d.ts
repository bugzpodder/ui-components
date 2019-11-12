import { ReactNode } from "react";
export declare type GridRow = {
    label: ReactNode;
    value: ReactNode;
    classes?: {
        row?: string;
        labelColumn?: string;
        valueColumn?: string;
        label?: string;
        value?: string;
    };
    [x0: string]: any;
};
