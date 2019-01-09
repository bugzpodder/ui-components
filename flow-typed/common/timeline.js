declare type TimelineRow = {
  columns: Array<Array<string>>,
  date: string,
};

declare type TimelineGraphRows = {
  [string]: Array<TimelineGraphRow>
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
}

declare type TimelineCardClasses = {
  commonCard?: CommonCardClasses,
} & TimelineGraphClasses;
