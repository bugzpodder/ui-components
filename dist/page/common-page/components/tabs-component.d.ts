/// <reference types="react" />
import { TabProps } from "@material-ui/core/Tab";
import { PageConfig } from "../../../types/card";
declare type Props = {
    onChangeActiveTab: (x0: string) => any;
    activeTab: string | false;
    className?: string;
    tabProps?: Partial<TabProps>;
    pageConfigs: PageConfig[];
};
export declare const TabsComponent: (props: Props) => JSX.Element;
export {};
