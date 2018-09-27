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
  card?: string,
  content?: string,
  item?: string,
  itemContent?: string,
}
