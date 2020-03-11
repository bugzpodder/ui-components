/// <reference types="react" />
import { CommonCardProps } from "../common-card/card";
import { TimelineCardClasses, TimelineGraphRow } from "../types/timeline";
declare type Props = {
    /**
     * The content to display on the timeline graph.
     * Each object should include:
     *
     *  - `date`
     *
     *  - `content`
     *
     *  - `user` (optional)
     *
     */
    rows: TimelineGraphRow[];
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
    /** When `true`, displays the time in the timeline graph */
    isTimeVisible?: boolean;
    /** When `true`, displays the day of the week in the timeline graph */
    isDayVisible?: boolean;
    /** The value of the currently selected item. Must be a unique date from the `rows` data objects. */
    selectedItem?: number | null;
    /** If true, shows a spinner indicator over the content. */
    isLoading?: boolean;
};
/** TimelineCard provides an interactive timeline component, wrapped inside of the CommonCard */
export declare const TimelineCard: (props: Props) => JSX.Element;
export {};
