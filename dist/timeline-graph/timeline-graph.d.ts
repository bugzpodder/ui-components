import React from "react";
import { TimelineGraphClasses, TimelineGraphRow } from "../types/timeline";
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
     *  - `pictureUrl` (url for the user avatar picture when `user` is provided`)
     *
     */
    rows: TimelineGraphRow[];
    /** The object used to define `className`s for the TimelineGraph sub components. Options include:
     *  - `root`: the component's root element
     *  - `content`: the wrapper around the timeline content
     *  - `item`: class applied to the timeline paper
     *  - `itemContent`: the class applied to the timeline item content wrapper
     *  - `username`: applied to the username when displayed in the timeline item content
     *
     */
    classes?: TimelineGraphClasses;
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
};
/** TimelineGraph provides an interactive timeline component */
export declare const TimelineGraph: React.FC<Props>;
export {};
