// @flow
declare type SimpleTableOptions = {
  sortOptions: SortOptions,
};

declare type PagedTableOptions = SimpleTableOptions &
  PaginationOptions & {
    totalCount?: number,
  };
