// @flow
import Card from "@material-ui/core/Card";
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
  tabContents: TabbedTimelineGraphContents,
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
      <Card
        square
        classes={{
          root: styles.tabsWrapper,
        }}
      >
        <Tabs
          classes={{
            root: styles.tabs,
            flexContainer: styles.tabsContainer,
          }}
          variant="fullWidth"
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
      </Card>
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
    const tabContent = tabContents[selectedTab];
    const rows = tabContent.content;
    return (
      <div className={classNames(styles.timelineContainer, classes.root)}>
        <CommonCard
          classes={{
            ...commonCard,
            root: classNames(styles.timelineCard, commonCard.root),
            body: classNames(styles.timelineCardBody, commonCard.body),
          }}
          {...commonCardProps}
        >
          {this.getTabs()}
          <TimelineGraphComponent
            rows={rows}
            classes={classes}
            selectedTab={selectedTab}
            {...timelineProps}
            isDayVisible={tabContent.isDayVisible}
            isTimeVisible={tabContent.isTimeVisible}
          />
        </CommonCard>
      </div>
    );
  };
}
