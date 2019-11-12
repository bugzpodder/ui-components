import { PaginationOptions, SortOption } from "@grailbio/lib";
export declare type SimpleTableOptions = {
    sortOptions: SortOption[];
};
export declare type PagedTableOptions = PaginationOptions & {
    sortOptions: SortOption[];
    totalCount?: number;
};
