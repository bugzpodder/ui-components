import Card from "@material-ui/core/Card";
import React, { useEffect, useState } from "react";
import Tab from "@material-ui/core/Tab/Tab";
import Tabs from "@material-ui/core/Tabs/Tabs";
import classNames from "classnames";
import isEmpty from "lodash/isEmpty";
import styles from "./timeline-graph.module.scss";
import { CommonCard } from "../common-card";
import { CommonCardProps } from "../common-card/card";
import { TimelineCardClasses, TimelineGraphRow } from "../types/timeline";
import { TimelineGraphComponent } from "./components/timeline-graph-component";
import { sentenceCase } from "@grailbio/lib";

type TimelineTabProps = {
  content: TimelineGraphRow[];
  isDayVisible?: boolean;
  isTimeVisible?: boolean;
};

type TabbedTimelineGraphContents = {
  [x0: string]: TimelineTabProps;
};

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
  commonCardProps?: CommonCardProps;
  /**
   * The function used to set the value of the `selectedItem`. Returns the unique date of the
   * timeline entry
   */
  onSelect?: (x0: number | null) => any;
  /** The value of the currently selected item. Must be a unique date from the `rows` data objects. */
  selectedItem?: number | null;
};

/** TabbedTimelineCard provides an interactive tabbed timeline component, wrapped inside of the CommonCard */
export const TabbedTimelineCard: React.FC<Props> = props => {
  const {
    classes = {},
    commonCardProps,
    tabContents,
    ...timelineProps
  } = props;
  const { commonCard = {} } = classes;

  // TODO(nsawas): Reconsider local state.
  const [selectedTab, setSelectedTab] = useState("");
  if (!tabContents || isEmpty(tabContents)) {
    throw new Error("tabContents must be defined");
  }

  useEffect(() => {
    setSelectedTab(Object.keys(tabContents)[0]);
  }, [tabContents]);

  const tabContent: TimelineTabProps = tabContents[selectedTab] || {
    content: [],
  };
  const rows = tabContent.content || [];

  const getTabs = () => {
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
          onChange={(_, selectedTab) => setSelectedTab(selectedTab)}
        >
          {Object.keys(tabContents).map((entry, index) => {
            return (
              <Tab
                data-testid={`timeline-tab-${entry}`}
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

  const card = (
    // @ts-ignore: body does not exist on type
    <CommonCard
      classes={{
        ...commonCard,
        root: classNames(styles.timelineCard, commonCard.root),
        body: classNames(styles.timelineCardBody, commonCard.body),
      }}
      {...commonCardProps}
    >
      {getTabs()}
      <TimelineGraphComponent
        rows={rows}
        classes={classes}
        selectedTab={selectedTab}
        {...timelineProps}
        isDayVisible={tabContent.isDayVisible}
        isTimeVisible={tabContent.isTimeVisible}
      />
    </CommonCard>
  );
  return (
    <div className={classNames(styles.timelineContainer, classes.root)}>
      {card}
    </div>
  );
};
