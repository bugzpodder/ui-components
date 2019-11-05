import React from "react";
import { CommonTabbedPageV2Classes, PageConfigV2 } from "../../../types/card";
declare type Props = {
    onChangeActiveTab: (x0: string) => any;
    activeTab: string | false;
    tabProps: {
        [x: string]: any;
    };
    pageConfigs: PageConfigV2[];
    wrapTabLabels: boolean;
    classes: CommonTabbedPageV2Classes;
};
export declare const TabsComponent: React.FC<Props>;
export {};
