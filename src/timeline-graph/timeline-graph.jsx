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
  /**
   * The function used to set the value of the `selectedItem`. Returns the unique date of the
   * timeline entry
   */
  onSelect?: (?number) => any,
  /** The value of the currently selected item. Must be a unique date from the `rows` data objects. */
  selectedItem?: ?number,
};

/** TimelineGraph provides an interactive timeline component */
export const TimelineGraph = (props: Props) => {
  const { onSelect, selectedItem, rows } = props;
  const entries = rows.map((item, index) => {
    const year = moment(item.date).format("YYYY");
    const paperClass = onSelect ? styles.timelinePaperButton : styles.timelinePaper;
    const content = (
      <Paper
        id={index}
        data-testid={`timeline-item-${index}`}
        onClick={onSelect ? () => (index === selectedItem ? onSelect(null) : onSelect(index)) : null}
        classes={{ root: paperClass }}
        elevation={INNER_CARD_ELEVATION}
      >
        <div className={styles.paperContent}>{item.content}</div>
      </Paper>
    );
    return {
      id: index,
      dateNode: (
        <div className={styles.timelineDateContainer}>
          <Typography
            classes={{
              root: styles.timelineDate,
            }}
            align="center"
          >
            {year}
          </Typography>
          <Typography
            classes={{
              root: styles.timelineDate,
            }}
            align="center"
          >
            {`${moment(item.date).format("MM")}/${moment(item.date).format("DD")}`}
          </Typography>
        </div>
      ),
      content,
    };
  });
  return (
    <div className={styles.timelineContainer}>
      <Card
        className={styles.timelineCard}
        elevation={MAIN_CARD_ELEVATION}
      >
        <div className={styles.timelineContent}>
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
