import Button, { ButtonProps } from "@material-ui/core/Button";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import React, { Fragment, useState } from "react";
import TextField from "@material-ui/core/TextField";
import format from "date-fns/format";
import isString from "lodash/isString";
import styles from "./export-button.module.scss";
import { Alert } from "../alert";
import { CommonDialog } from "../common-dialog";
import { DATE_TIME_UNICODE_FORMAT, ExportableColumn } from "@grailbio/lib";
import { PagedTableColumn } from "../types/paged-table";
import { SpinnerOverlay } from "../spinner-overlay";
import { TwoColumnGrid } from "../two-column-grid";
import { generateReport } from "./utils/export-utils";

type Props = {
  /* The column configurations in the downloaded file. */
  columns: Array<ExportableColumn<any> | PagedTableColumn<any>>;
  /* The list of objects to be exported if "visible rows" is selected. */
  visibleRows?: Record<string, any>[];
  /* The list of objects to be exported if "selected rows" is selected. */
  selectedRows?: Record<string, any>[];
  /* A function which takes no input and returns a promise to a list of the
   * data that will be exported if "bulk rows" is selected. */
  fetchBulkExportRows?: () => Promise<Record<string, any>[]>;
  /* A string which, along with the current timestamp, will be used as the
   * filename (i.e. "prefix 2019-04-20 04-20-00.csv"). Prefix defaults to
   * "export". */
  filenamePrefix?: string;
  /* Props applied to the button component */
  buttonProps?: Partial<ButtonProps>;
  /* Classname applied to the button */
  className?: string;
};

const DATA_SOURCE = {
  VISIBLE_ROWS: "visible-rows",
  SELECTED_ROWS: "selected-rows",
  BULK_ROWS: "bulk-rows",
};
const DELIMITERS = {
  COMMA: "comma",
  TAB: "tab",
  CUSTOM: "custom",
};

const pagedTableColumnsToExportableColumnsIfNecessary = (
  columns: PagedTableColumn<any>[],
): ExportableColumn<any>[] => {
  return columns
    .filter(column => !column.excludeFromExport)
    .map(({ accessor, Header, exportHeaderName, exportAccessor }, index) => {
      const exportHeaderNameToUse =
        exportHeaderName ||
        (isString(Header) ? Header : null) ||
        (isString(exportAccessor) ? exportAccessor : null) ||
        (isString(accessor) ? accessor : null) ||
        String(index);
      const accessorToUse = exportAccessor || accessor || "";
      return {
        exportAccessor: accessorToUse,
        exportHeaderName: exportHeaderNameToUse,
      };
    });
};

export const ExportButton: React.FC<Props> = props => {
  const {
    columns,
    visibleRows,
    filenamePrefix = "export",
    fetchBulkExportRows,
    selectedRows,
    buttonProps,
    className,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState("");
  const [delimiterKey, setDelimiterKey] = useState(DELIMITERS.COMMA);
  const [customDelimiter, setCustomDelimiter] = useState("");
  const [filename, setFilename] = useState(
    filenamePrefix
      .toString()
      .concat(" ")
      .concat(format(new Date(), DATE_TIME_UNICODE_FORMAT).replace(/:/g, "-")),
  );

  const delimiterMap = {
    [DELIMITERS.COMMA]: ",",
    [DELIMITERS.TAB]: "\t",
    [DELIMITERS.CUSTOM]: customDelimiter,
  };
  const delimiter =
    delimiterMap[delimiterKey] || delimiterMap[DELIMITERS.COMMA];
  const extension =
    delimiter === delimiterMap[DELIMITERS.TAB] ? ".tsv" : ".csv";

  // The three data source options are all handled very similarly, so we just
  // put them in an array of objects to make this symmetry more explicit.
  const dataSourceOptions = [
    {
      key: DATA_SOURCE.SELECTED_ROWS,
      isVisible: selectedRows != null,
      optionNode: (
        <FormControlLabel
          control={<Radio />}
          label={`Selected Rows (${selectedRows ? selectedRows.length : ""})`}
          data-testid="selected-rows-data-source-radio-option"
          value={DATA_SOURCE.SELECTED_ROWS}
          disabled={!selectedRows || selectedRows.length === 0}
        />
      ),
      dataFetcher: async () => {
        if (selectedRows == null) {
          throw new Error(
            "Cannot download selected rows if selectedRows is not defined.",
          );
        }
        return selectedRows;
      },
    },
    {
      key: DATA_SOURCE.VISIBLE_ROWS,
      isVisible: visibleRows != null,
      optionNode: (
        <FormControlLabel
          control={<Radio />}
          label={`Visible Rows (${visibleRows ? visibleRows.length : ""})`}
          data-testid="visible-rows-data-source-radio-option"
          value={DATA_SOURCE.VISIBLE_ROWS}
        />
      ),
      dataFetcher: async () => {
        if (visibleRows == null) {
          throw new Error(
            "Cannot download visible rows if visibleRows is not defined.",
          );
        }
        return visibleRows;
      },
    },
    {
      key: DATA_SOURCE.BULK_ROWS,
      isVisible: fetchBulkExportRows != null,
      optionNode: (
        <>
          <FormControlLabel
            control={<Radio />}
            // TODO(ecarrel): incorporate the expected length once there's
            //  a "lookahead" (a way to know how many rows to expect).
            label="Bulk Rows"
            data-testid="bulk-rows-data-source-radio-option"
            value={DATA_SOURCE.BULK_ROWS}
          />
          {dataSource === DATA_SOURCE.BULK_ROWS && (
            <Alert
              className={styles.warning}
              color="warning"
              message="This action may be slow."
            />
          )}
        </>
      ),
      dataFetcher: async () => {
        if (fetchBulkExportRows == null) {
          throw new Error(
            "Cannot download bulk rows if fetchBulkExportRows is not defined.",
          );
        }
        return fetchBulkExportRows();
      },
    },
  ];

  const onSubmit = async (): Promise<void> => {
    setIsLoading(true);
    const dataSourceOption = dataSourceOptions.find(
      ({ key }) => key === dataSource,
    );
    if (dataSourceOption == null) {
      console.error("undefined dataSourceOption");
      setIsLoading(false);
      return;
    }
    const dataToDownload = await dataSourceOption.dataFetcher();
    const exportableColumns = pagedTableColumnsToExportableColumnsIfNecessary(
      columns,
    );
    if (dataToDownload && dataToDownload.length > 0) {
      generateReport(
        `${filename}${extension}`,
        exportableColumns,
        dataToDownload,
        {
          delimiter,
        },
      );
      setIsOpen(false);
    }
    setIsLoading(false);
  };

  const rows = [
    {
      label: "Separator",
      value: (
        <RadioGroup
          classes={{
            root: styles.radioGroup,
          }}
          onChange={({ currentTarget: { value } }) => setDelimiterKey(value)}
          value={delimiterKey}
        >
          <FormControlLabel
            control={<Radio />}
            label="Comma"
            data-testid="comma-delimiter-radio-option"
            value={DELIMITERS.COMMA}
          />
          <FormControlLabel
            control={<Radio />}
            label="Tab"
            data-testid="tab-delimiter-radio-option"
            value={DELIMITERS.TAB}
          />
          <FormControlLabel
            control={<Radio />}
            label={
              <span className={styles.customDelimiterContainer}>
                Custom
                <TextField
                  onChange={({ currentTarget: { value } }) =>
                    setCustomDelimiter(value)
                  }
                  value={customDelimiter}
                  disabled={delimiterKey !== DELIMITERS.CUSTOM}
                  classes={{
                    root: styles.customDelimiterField,
                  }}
                />
              </span>
            }
            data-testid="custom-delimiter-radio-option"
            value={DELIMITERS.CUSTOM}
          />
        </RadioGroup>
      ),
    },
    {
      label: "File Name",
      value: (
        <Input
          onChange={({ currentTarget: { value } }) => setFilename(value)}
          value={filename}
          endAdornment={
            <InputAdornment position="end">{extension}</InputAdornment>
          }
          fullWidth
        />
      ),
    },
  ];

  const visibleDataSourceOptions = dataSourceOptions.filter(
    ({ isVisible }) => isVisible,
  );
  if (visibleDataSourceOptions.length === 0) {
    return null;
  }
  if (visibleDataSourceOptions.length === 1) {
    // If there's just one option, there is no point displaying a radio group
    // to the user. Decide for them.
    if (dataSource !== visibleDataSourceOptions[0].key) {
      setDataSource(visibleDataSourceOptions[0].key);
    }
  } else {
    rows.unshift({
      label: "Data Source",
      value: (
        <RadioGroup
          classes={{
            root: styles.radioGroup,
          }}
          onChange={({ currentTarget: { value } }) => setDataSource(value)}
          value={dataSource}
        >
          {visibleDataSourceOptions.map(({ optionNode, key }) => (
            <Fragment key={key}>{optionNode}</Fragment>
          ))}
        </RadioGroup>
      ),
    });
  }

  return (
    <>
      <CommonDialog
        data-testid="export-modal"
        isVisible={isOpen}
        title="Export Rows"
        actions={[
          {
            name: "Download",
            callback: onSubmit,
            // @ts-ignore string is not assignable.
            variant: "contained",
            icon: "cloud_download",
            // @ts-ignore: should this be isEnabled instead of disabled?
            disabled: dataSource === "" || isLoading,
            "data-testid": "download-button",
          },
        ]}
        hideModal={() => setIsOpen(false)}
        maxWidth="sm"
      >
        <SpinnerOverlay isActive={isLoading} />
        <TwoColumnGrid rows={rows} />
      </CommonDialog>
      <Button
        data-testid="export-button"
        className={className}
        {...buttonProps}
        onClick={() => setIsOpen(true)}
      >
        <CloudDownloadIcon className={styles.exportButton} />
        Export
      </Button>
    </>
  );
};
