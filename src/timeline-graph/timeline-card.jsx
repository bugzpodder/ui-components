// @flow
import React from "react";
import classNames from "classnames";
import styles from "./timeline-graph.module.scss";
import { CommonCard } from "../index";
import { type CommonCardProps } from "../common-card/card";
import { TimelineGraphComponent } from "./components/timeline-graph-component";

type Props = {
  /**
   * The content to display on the timeline graph.
   * Each object should include a unique `date` and some `content` to render.
   */
  rows: Array<TimelineGraphRow>,
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
  classes?: TimelineCardClasses,
  /** The object used to apply props to the CommonCard container */
  commonCardProps?: CommonCardProps,
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

/** TimelineCard provides an interactive timeline component, wrapped inside of the CommonCard */
export const TimelineCard = (props: Props) => {
  const { classes = {}, commonCardProps, ...timelineProps } = props;
  const { commonCard = {} } = classes;
  return (
    <div className={classNames(styles.timelineContainer, classes.root)}>
      <CommonCard
        classes={{
          ...commonCard,
          root: classNames(styles.timelineCard, commonCard.root),
        }}
        {...commonCardProps}
      >
        <TimelineGraphComponent
          classes={classes}
          {...timelineProps}
        />
      </CommonCard>
    </div>
  );
};
