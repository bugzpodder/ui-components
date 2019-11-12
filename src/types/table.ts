import { PaginationOptions, SortOption } from "@grailbio/lib";

export type SimpleTableOptions = {
  sortOptions: SortOption[];
};

export type PagedTableOptions = PaginationOptions & {
  sortOptions: SortOption[];
  totalCount?: number;
};
