import React from "react";
import keycode from "keycode";
import styles from "../omni.module.scss";
import {
  DATE_SEARCH_TYPES,
  SearchFieldProps,
  buildDateRangeString,
  extractDateRange,
  formatDate,
  parseDate,
} from "@grailbio/lib";
import { DateInput } from "../../date/date-input";
import { Grid, TextField, Typography } from "@material-ui/core";

type Props = {
  placeholder: string;
  onSearch: () => any;
  searchType: symbol;
} & SearchFieldProps;

export const SearchField: React.FC<Props> = props => {
  const {
    searchKey,
    searchType,
    searchValue,
    onChange,
    onSearch = () => {},
    // Unused props
    searchDefs: __searchDefs,
    searchValues: __searchValues,
    ...otherProps
  } = props;
  const onChangeComponent = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const {
      currentTarget: { id, value: text },
    } = event;

    onChange(id, text);
  };
  const onEnter = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.keyCode === keycode("Enter")) {
      event.preventDefault();
      onSearch();
    }
  };
  if (!DATE_SEARCH_TYPES.includes(searchType)) {
    return (
      <TextField
        id={searchKey}
        inputProps={{
          "data-testid": searchKey,
        }}
        className={styles.textField}
        value={searchValue ? String(searchValue) : ""}
        onChange={onChangeComponent}
        onKeyDown={onEnter}
        fullWidth
        {...otherProps}
      />
    );
  }

  const { startDate, endDate } = extractDateRange(searchValue);
  const onDateSearch = (
    id: string,
    startDate?: string | null,
    endDate?: string | null,
  ): void => {
    onChange(id, buildDateRangeString({ startDate, endDate }));
  };
  const onChangeStartDate = (id, date): void => {
    const validDate = formatDate(date);
    if (validDate) {
      onDateSearch(id, validDate, endDate);
    }
  };
  const onChangeEndDate = (id, date): void => {
    const validDate = formatDate(date);
    if (validDate) {
      onDateSearch(id, startDate, validDate);
    }
  };

  return (
    <Grid className={styles.dateGrid}>
      <DateInput
        id={`${searchKey}-from`}
        className={styles.input}
        value={parseDate(startDate)}
        onChange={onChangeStartDate.bind(this, searchKey)}
        onKeyDown={onEnter}
        InputProps={{ placeholder: "From date" }}
        {...otherProps}
      />
      <Typography className={styles.typography}>to</Typography>
      <DateInput
        id={`${searchKey}-to`}
        className={styles.input}
        value={parseDate(endDate)}
        onChange={onChangeEndDate.bind(this, searchKey)}
        onKeyDown={onEnter}
        InputProps={{ placeholder: "To date" }}
        {...otherProps}
      />
    </Grid>
  );
};
