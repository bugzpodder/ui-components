/// <reference types="react" />
import { CommonCardProps } from "../common-card/card";
import { TimelineCardClasses, TimelineGraphRow } from "../types/timeline";
declare type TimelineTabProps = {
    content: TimelineGraphRow[];
    isDayVisible?: boolean;
    isTimeVisible?: boolean;
};
declare type TabbedTimelineGraphContents = {
    [x0: string]: TimelineTabProps;
};
declare type Props = {
    /**
     * An object where each key is used as the tab name. The value should be an object that contains:
     *   - content: An array of TimelineGraphRow items. TimelineGraphRow items include:
     *           - `date`
     *           - `content`
     *           - `user` (optional)
     *
     *   - isDayVisible: when `true`, displays the day of the week in the timeline
     *   - isTimeVisible: when `true`, displays the time of the operation
     *
     */
    tabContents: TabbedTimelineGraphContents;
    /** The object used to define `className`s for the TimelineGraph sub components. Options include:
     *
     *  - `root`: the component's root element
     *  - `commonCard`: the `classes` object passed to the CommonCard container. See the CommonCard for
     *     information regarding CommonCard classes.
     *  - `content`: the wrapper around the timeline content, inside of the card body
     *  - `item`: class applied to the timeline paper
     *  - `itemContent`: the class applied to the timeline item content wrapper
     *
     */
    classes?: TimelineCardClasses;
    /** The object used to apply props to the CommonCard container */
    commonCardProps?: Partial<CommonCardProps>;
    /**
     * The function used to set the value of the `selectedItem`. Returns the unique date of the
     * timeline entry
     */
    onSelect?: (x0: number | null) => any;
    /** The value of the currently selected item. Must be a unique date from the `rows` data objects. */
    selectedItem?: number | null;
};
/** TabbedTimelineCard provides an interactive tabbed timeline component, wrapped inside of the CommonCard */
export declare const TabbedTimelineCard: (props: Props) => JSX.Element;
export {};
