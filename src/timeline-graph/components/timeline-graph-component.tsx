import Grid from "@material-ui/core/Grid/Grid";

import Paper from "@material-ui/core/Paper";
import React from "react";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import format from "date-fns/format";
import styles from "../timeline-graph.module.scss";
import { AvatarIcon } from "../../avatar-icon";
import {
  INNER_CARD_ELEVATION,
  MAIN_CARD_ELEVATION,
  parseDate,
} from "@grailbio/lib";
import { TimelineGraphClasses, TimelineGraphRow } from "../../types/timeline";

type Props = {
  rows: TimelineGraphRow[];
  classes?: TimelineGraphClasses;
  onSelect?: (x0: number | null) => any;
  isTimeVisible?: boolean;
  isDayVisible?: boolean;
  selectedItem?: number | null;
  hasTabs?: boolean;
  selectedTab?: string;
};

export const TimelineGraphComponent: React.FC<Props> = props => {
  const {
    onSelect,
    selectedItem,
    isTimeVisible,
    isDayVisible,
    rows,
    classes = {},
  } = props;
  const entries = rows.map((item, index) => {
    const date = parseDate(item.date);
    const year = format(date, "yyyy");
    const paperClass = onSelect
      ? styles.timelinePaperButton
      : styles.timelinePaper;
    const itemIsSelected = selectedItem === index;
    const content = (
      <Paper
        id={`${index}`}
        data-testid={`timeline-item-${index}`}
        onClick={
          onSelect
            ? () => (index === selectedItem ? onSelect(null) : onSelect(index))
            : null
        }
        classes={{
          root: classNames(paperClass, classes.item, {
            [styles.timelinePaperSelected]: itemIsSelected,
          }),
        }}
        elevation={itemIsSelected ? INNER_CARD_ELEVATION : MAIN_CARD_ELEVATION}
      >
        <div className={classNames(styles.paperContent, classes.itemContent)}>
          {item.content}
          {item.user && (
            <div
              className={classNames(styles.user, classes.username, {
                [styles.timelinePaperSelected]: itemIsSelected,
              })}
            >
              <AvatarIcon
                id="timeline-avatar"
                classes={{
                  root: classes.username,
                  avatar: styles.userAvatar,
                  button: styles.userButton,
                }}
              />
              {item.user}
            </div>
          )}
        </div>
      </Paper>
    );
    return {
      id: index,
      dateNode: (
        <div className={styles.timelineDateContainer}>
          <Typography
            classes={{
              root: styles.smallDate,
            }}
            data-testid={`timeline-year-${index}`}
            align="center"
          >
            {year}
          </Typography>
          <Typography
            classes={{
              root: styles.timelineDate,
            }}
            data-testid={`timeline-date-${index}`}
            align="center"
          >
            {// Since year is separate from month and day, we can not use ISO-8601 format or numeric date format.
            // These would be confusing to HK, etc.
            format(date, "dd MMM")}
            {isDayVisible && (
              <div data-testid={`timeline-day-${index}`}>
                {format(date, "EEE")}
              </div>
            )}
          </Typography>
          {isTimeVisible && (
            <Typography
              classes={{
                root: styles.smallDate,
              }}
              data-testid={`timeline-time-${index}`}
              align="center"
            >
              {`${format(date, "HH:mm")}`}
            </Typography>
          )}
        </div>
      ),
      content,
    };
  });
  return (
    <div className={classNames(styles.timelineContent, classes.content)}>
      {entries.map((entry, index) => {
        const itemIsSelected = selectedItem === entry.id;
        const timelineEnd = entries.length - 1;
        const isLastItem = index === timelineEnd;
        return (
          <Grid
            key={index}
            container
            justify="center"
            alignItems="center"
            className={classNames({ [styles.lastItem]: isLastItem })}
          >
            {entry.dateNode}
            <div
              className={classNames(styles.timeline, {
                [styles.timelineStart]: index === 0,
                [styles.timelineEnd]: index === timelineEnd,
              })}
            >
              <div
                className={classNames(styles.notch, {
                  [styles.selected]: itemIsSelected,
                })}
              />
              {entry.content}
            </div>
          </Grid>
        );
      })}
    </div>
  );
};
