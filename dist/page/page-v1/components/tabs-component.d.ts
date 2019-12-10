import React from "react";
import { TabProps } from "@material-ui/core/Tab";
import { PageConfig } from "../../../types/card";
declare type Props = {
    onChangeActiveTab: (x0: string) => any;
    activeTab: string | false;
    className?: string;
    tabProps?: Partial<TabProps>;
    pageConfigs: PageConfig[];
};
export declare const TabsComponent: React.FC<Props>;
export {};
