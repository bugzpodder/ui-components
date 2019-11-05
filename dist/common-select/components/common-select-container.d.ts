import React, { ReactNode } from "react";
import { CommonSelectOption } from "../../types/select";
declare type Props = {
    selectType: string;
    createMessage?: (x0: string) => ReactNode;
    defaultOptions: CommonSelectOption[];
    loadOptions?: (x0: string) => Promise<any>;
};
export declare const CommonSelectContainer: React.FC<Props>;
export {};
