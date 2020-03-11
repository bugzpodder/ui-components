/// <reference types="react" />
import { SlimPageConfig, SlimTabbedPageClasses } from "../../../types/card";
declare type Props = {
    onChangeActiveTab: (x0: string) => any;
    activeTab: string | false;
    tabProps: Record<string, any>;
    pageConfigs: SlimPageConfig[];
    wrapTabLabels: boolean;
    classes: SlimTabbedPageClasses;
};
export declare const TabsComponent: (props: Props) => JSX.Element;
export {};
