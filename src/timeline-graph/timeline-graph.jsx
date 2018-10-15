// @flow
import React from "react";
import classNames from "classnames";
import styles from "./timeline-graph.module.scss";
import { TimelineGraphComponent } from "./components/timeline-graph-component";

type Props = {
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
  rows: Array<TimelineGraphRow>,
  /** The object used to define `className`s for the TimelineGraph sub components. Options include:
   *  - `root`: the component's root element
   *  - `content`: the wrapper around the timeline content
   *  - `item`: class applied to the timeline paper
   *  - `itemContent`: the class applied to the timeline item content wrapper
   *  - `username`: applied to the username when displayed in the timeline item content
   *
   */
  classes?: TimelineGraphClasses,
  /**
   * The function used to set the value of the `selectedItem`. Returns the unique date of the
   * timeline entry
   */
  onSelect?: (?number) => any,
  /** When `true`, displays the time in the timeline graph */
  isTimeVisible?: boolean,
  /** The value of the currently selected item. Must be a unique date from the `rows` data objects. */
  selectedItem?: ?number,
};

/** TimelineGraph provides an interactive timeline component */
export const TimelineGraph = (props: Props) => {
  const { classes = {}, ...timelineProps } = props;
  return (
    <div className={classNames(styles.timelineContainer, classes.root)}>
      <TimelineGraphComponent
        classes={classes}
        {...timelineProps}
      />
    </div>
  );
};
