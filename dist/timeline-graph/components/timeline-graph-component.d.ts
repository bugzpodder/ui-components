/// <reference types="react" />
import { TimelineGraphClasses, TimelineGraphRow } from "../../types/timeline";
declare type Props = {
    rows: TimelineGraphRow[];
    classes?: TimelineGraphClasses;
    onSelect?: (x0: number | null) => any;
    isTimeVisible?: boolean;
    isDayVisible?: boolean;
    selectedItem?: number | null;
    hasTabs?: boolean;
    selectedTab?: string;
};
export declare const TimelineGraphComponent: (props: Props) => JSX.Element;
export {};
