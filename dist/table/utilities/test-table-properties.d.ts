import { ApiQueryOptions } from "@grailbio/lib";
export declare const data: {
    columnOne: string;
    columnTwo: string;
    columnThree: string;
}[];
export declare const columns: ({
    Header: string;
    accessor: string;
    isSortable: boolean;
    Cell: ({ value }: {
        value: string;
    }) => JSX.Element;
    className?: undefined;
} | {
    Header: string;
    accessor: string;
    isSortable: boolean;
    Cell?: undefined;
    className?: undefined;
} | {
    accessor: (instance: Record<string, any>) => any;
    className: (value: string) => string;
    Cell: ({ value }: {
        value: string;
    }) => JSX.Element;
    Header?: undefined;
    isSortable?: undefined;
})[];
export declare const invalidColumns: {
    Header: string;
}[];
export declare const someSelectedRows: string[];
export declare const allSelectedRows: string[];
export declare const tableOptions: ApiQueryOptions;
export declare const invalidTableOptions: {
    count: number;
};
export declare const headerActions: JSX.Element;
