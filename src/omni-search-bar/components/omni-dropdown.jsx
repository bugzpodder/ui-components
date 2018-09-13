// @flow
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React, { type Node } from "react";
import styles from "../omni.module.scss";
import { OMNI_KEY, OMNI_TEXT_SEARCH_TYPE } from "@grail/lib";
import { SearchField } from "./search-field";
import { TwoColumnRow } from "../../two-column-grid";

type Props = {
  searchDefs: SearchDefs,
  searchValues: SearchValues,
  onChange: (string, string) => void,
  onClear: () => void,
  onSearch: () => void,
  width: number | string,
  children?: Node,
};

export const OmniDropdown = (props: Props) => {
  const {
    searchDefs, searchValues, onChange, onSearch, onClear, width, children,
  } = props;
  return (
    <div style={{ width }}>
      <Paper
        square
        className={styles.paper}
      >
        <Grid container>
          {searchDefs.map((searchDef, index) => {
            const {
              name, type, Component = SearchField, description = "",
            } = searchDef;
            if (type === OMNI_TEXT_SEARCH_TYPE) {
              return null;
            }
            const searchValue = searchValues.get(index);
            const row: GridRow = {
              label: name,
              value: (
                <Component
                  searchKey={`${OMNI_KEY}-${index}`}
                  placeholder={description}
                  searchType={type}
                  searchValue={searchValue}
                  onChange={onChange}
                  onSearch={onSearch}
                />
              ),
            };
            return (
              <TwoColumnRow
                key={index}
                row={row}
                labelWidth={3}
              />
            );
          })}
          {children}
          <Grid
            item
            className={styles.footer}
          >
            <Button
              disableRipple
              onClick={onClear}
            >
              Clear
            </Button>
            <Button
              disableRipple
              onClick={onSearch}
              color="primary"
              variant="raised"
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
