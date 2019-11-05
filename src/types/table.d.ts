import { PaginationOptions, SortOption } from "./api";

export type SimpleTableOptions = {
  sortOptions: SortOption[];
};

export type PagedTableOptions = PaginationOptions & {
  sortOptions: SortOption[];
  totalCount?: number;
};
