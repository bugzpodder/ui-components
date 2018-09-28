// @flow
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper";
import React from "react";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import moment from "moment";
import styles from "./timeline-graph.module.scss";
import { INNER_CARD_ELEVATION, MAIN_CARD_ELEVATION } from "@grail/lib";

type Props = {
  /**
   * The content to display on the timeline graph.
   * Each object should include a unique `date` and some `content` to render.
   */
  rows: Array<TimelineGraphRow>,
  /** The object used to define `className`s for the TimelineGraph sub components. Options include:
   *
   *  - `root`: the component's root element
   *  - `card`: the component card container
   *  - `content`: the wrapper around the timeline content, inside of the card body
   *  - `item`: class applied to the timeline paper
   *  - `itemContent`: the class applied to the timeline item content wrapper
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
  const {
    onSelect, selectedItem, isTimeVisible, rows, classes = {},
  } = props;
  const entries = rows.map((item, index) => {
    const year = moment(item.date).format("YYYY");
    const paperClass = onSelect ? styles.timelinePaperButton : styles.timelinePaper;
    const content = (
      <Paper
        id={index}
        data-testid={`timeline-item-${index}`}
        onClick={onSelect ? () => (index === selectedItem ? onSelect(null) : onSelect(index)) : null}
        classes={{ root: classNames(paperClass, classes.item) }}
        elevation={INNER_CARD_ELEVATION}
      >
        <div className={classNames(styles.paperContent, classes.itemContent)}>{item.content}</div>
      </Paper>
    );
    return {
      id: index,
      dateNode: (
        <div className={styles.timelineDateContainer}>
          <Typography
            classes={{
              root: classNames(styles.timelineDate, styles.smallDate),
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
            moment(item.date).format("DD MMM")}
          </Typography>
          {isTimeVisible && (
            <Typography
              classes={{
                root: classNames(styles.timelineDate, styles.smallDate),
              }}
              data-testid={`timeline-time-${index}`}
              align="center"
            >
              {`${moment(item.date).format("HH:mm")}`}
            </Typography>
          )}
        </div>
      ),
      content,
    };
  });
  return (
    <div className={classNames(styles.timelineContainer, classes.root)}>
      <Card
        className={classNames(styles.timelineCard, classes.card)}
        elevation={MAIN_CARD_ELEVATION}
      >
        <div className={classNames(styles.timelineContent, classes.content)}>
          {entries.map((entry, index) => {
            const itemIsSelected = selectedItem === entry.id;
            return (
              <Grid
                key={index}
                container
                justify="center"
                alignItems="center"
              >
                {entry.dateNode}
                <div
                  className={classNames(styles.timeline, {
                    [styles.timelineStart]: index === 0,
                    [styles.timelineEnd]: index === entries.length - 1,
                  })}
                >
                  <div className={classNames(styles.notch, { [styles.selected]: itemIsSelected })} />
                </div>
                {entry.content}
              </Grid>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
