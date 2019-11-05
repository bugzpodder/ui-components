export type ExportableColumn = {
  exportHeaderName: string;
  exportAccessor: string | ((x0: Record<string, any>) => string);
};

export type PaginationOptions = {
  offset: number;
  count: number;
};

export type ReportOptions = {
  delimiter?: string;
  fileMimeType?: string;
};
