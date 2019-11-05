import React, { ReactNode } from "react";
import { SortingProps } from "../../types/paged-table";
declare type Props = {
    sortingProps: SortingProps;
    sortFieldId: string;
    children: ReactNode;
};
export declare const InnerTableHeader: React.FC<Props>;
export {};
