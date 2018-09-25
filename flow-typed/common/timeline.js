declare type TimelineRow = {
  columns: Array<Array<string>>,
  date: string,
};

declare type TimelineGraphRow = {
  date: string,
  content: Node<*>
};
