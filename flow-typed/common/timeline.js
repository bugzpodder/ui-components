// @flow
declare type TimelineTabProps = {
  content: Array<TimelineGraphRow>,
  isDayVisible?: boolean,
  isTimeVisible?: boolean,
};

declare type TabbedTimelineGraphContents = {
  [string]: TimelineTabProps,
};

declare type TimelineGraphRow = {
  date: string,
  content: Node<*>,
  user?: string,
  pictureUrl?: string,
};

declare type TimelineGraphClasses = {
  root?: string,
  content?: string,
  item?: string,
  itemContent?: string,
  username?: string,
};

declare type TimelineCardClasses = {
  commonCard?: CommonCardClasses,
} & TimelineGraphClasses;
