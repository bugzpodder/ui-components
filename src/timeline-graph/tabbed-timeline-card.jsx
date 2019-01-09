// @flow
import React from "react";
import Tab from "@material-ui/core/Tab/Tab";
import Tabs from "@material-ui/core/Tabs/Tabs";
import classNames from "classnames";
import styles from "./timeline-graph.module.scss";
import { CommonCard } from "../index";
import { type CommonCardProps } from "../common-card/card";
import { TimelineGraphComponent } from "./components/timeline-graph-component";
import { sentenceCase } from "@grail/lib";

type Props = {
  /**
   * The content to display on the timeline graph.
   * Each object should contain an array of objects which should include:
   *
   *  - `date`
   *
   *  - `content`
   *
   *  - `user` (optional)
   *
   */
  tabContents: TimelineGraphRows,
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

type State = {
  selectedTab: string,
};

/** TabbedTimelineCard provides an interactive tabbed timeline component, wrapped inside of the CommonCard */
export class TabbedTimelineCard extends React.Component<Props, State> {
  state = {
    selectedTab: "",
  };

  componentDidMount = () => {
    const { tabContents } = this.props;
    if (!tabContents) {
      return null;
    }
    const [selectedTab] = Object.keys(tabContents);
    this.setState({ selectedTab });
  };

  getTabs = () => {
    const { selectedTab } = this.state;
    const { tabContents } = this.props;
    if (!selectedTab) {
      return null;
    }
    return (
      <Tabs
        data-testid="card-tabs"
        textColor="primary"
        indicatorColor="primary"
        value={selectedTab}
        onChange={(event, selectedTab) => this.setState({ selectedTab })}
      >
        {Object.keys(tabContents).map((entry, index) => {
          return (
            <Tab
              key={index}
              value={entry}
              label={sentenceCase(entry)}
            />
          );
        })}
      </Tabs>
    );
  };

  render = () => {
    const { selectedTab } = this.state;
    const {
      classes = {}, commonCardProps, tabContents, ...timelineProps
    } = this.props;
    const { commonCard = {} } = classes;
    if (!tabContents || !selectedTab) {
      return null;
    }
    const rows = tabContents[selectedTab];
    if (typeof rows !== "object" || rows.constructor !== Array || rows.length === 0) {
      return null;
    }
    return (
      <div className={classNames(styles.timelineContainer, classes.root)}>
        <CommonCard
          classes={{
            ...commonCard,
            root: classNames(styles.timelineCard, commonCard.root),
          }}
          {...commonCardProps}
        >
          {this.getTabs()}
          <TimelineGraphComponent
            rows={rows}
            classes={classes}
            selectedTab={selectedTab}
            {...timelineProps}
          />
        </CommonCard>
      </div>
    );
  };
}
