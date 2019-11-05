import React from "react";
import { PageConfig } from "../../../types/card";
declare type Props = {
    onChangeActiveTab: (x0: string) => any;
    activeTab: string | false;
    className?: string;
    tabProps?: {
        [x: string]: any;
    };
    pageConfigs: PageConfig[];
};
export declare const TabsComponent: React.FC<Props>;
export {};
