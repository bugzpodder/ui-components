declare type TimelineRow = {
  columns: Array<Array<string>>,
  date: string,
};

declare type TimelineGraphRow = {
  date: string,
  content: Node<*>
};

declare type TimelineGraphClasses = {
  root?: string,
  content?: string,
  item?: string,
  itemContent?: string,
}

declare type TimelineCardClasses = {
  commonCard?: CommonCardClasses,
} & TimelineGraphClasses;
