// @flow
import Grid from "@material-ui/core/Grid";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import keycode from "keycode";
import moment from "moment";
import {
  DATE_FORMAT, DATE_SEARCH_TYPES, buildDateRangeString, extractDateRange,
} from "@grail/lib";
import { DateInput } from "../../date/date-input";

import styles from "../omni.module.scss";

type Props = {
  placeholder: string,
  onSearch: () => any,
  searchType: Symbol,
} & SearchFieldProps;

export const SearchField = (props: Props) => {
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
  const onChangeComponent = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const {
      target: { id, value: text },
    } = event;
    onChange(id, text);
  };
  const onEnter = event => {
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

  // $FlowFixMe: split is only called on searchValue if it is valid.
  const { startDate, endDate } = extractDateRange(searchValue);
  const onDateSearch = (id: string, startDate: ?string, endDate: ?string) => {
    onChange(id, buildDateRangeString({ startDate, endDate }));
  };
  const onChangeStartDate = (id, date) => {
    date = date ? moment(date).format(DATE_FORMAT) : "";
    onDateSearch(id, date, endDate);
  };
  const onChangeEndDate = (id, date) => {
    date = date ? moment(date).format(DATE_FORMAT) : "";
    onDateSearch(id, startDate, date);
  };
  return (
    <Grid className={styles.dateGrid}>
      <DateInput
        id={`${searchKey}-from`}
        className={styles.input}
        value={startDate}
        onChange={onChangeStartDate.bind(this, searchKey)}
        onKeyDown={onEnter}
        InputProps={{ placeholder: "From date" }}
        {...otherProps}
      />
      <Typography className={styles.typography}>to</Typography>
      <DateInput
        id={`${searchKey}-to`}
        className={styles.dateInput}
        value={endDate}
        onChange={onChangeEndDate.bind(this, searchKey)}
        onKeyDown={onEnter}
        InputProps={{ placeholder: "To date" }}
        {...otherProps}
      />
    </Grid>
  );
};
