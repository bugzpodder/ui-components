import Grid from "@material-ui/core/Grid";

import React, { ReactNode } from "react";
import styles from "../omni.module.scss";
import { CommonDialog } from "../../common-dialog";
import { GridRow } from "../../types/grid";
import {
  OMNI_TEXT_SEARCH_TYPE,
  OmniSearchDef,
  OmniSearchValues,
} from "@grailbio/lib";
import { SearchField } from "./search-field";
import { TwoColumnRow } from "../../two-column-grid";

type Props = {
  searchDefs: OmniSearchDef[];
  searchValues: OmniSearchValues;
  onChange: (x0: string, x1: string) => any;
  onClear: () => any;
  onSearch: () => void;
  setIsOpen: (x0: boolean) => any;
  children?: ReactNode;
};

export const OmniDialog: React.FC<Props> = props => {
  const {
    setIsOpen,
    searchDefs,
    searchValues,
    onChange,
    onSearch,
    onClear,
    children,
  } = props;
  return (
    <CommonDialog
      id="omni-dialog"
      data-testid="omni-dialog"
      title="Filter"
      classes={{
        root: styles.omniDialog,
        content: styles.content,
      }}
      hideModal={() => setIsOpen(false)}
      isVisible
      actions={[
        {
          id: "omni-dialog-clear-button",
          name: "Clear",
          callback: onClear,
          isEnabled: true,
        },
        {
          id: "omni-dialog-filter-button",
          name: "Filter",
          callback: onSearch,
          isEnabled: true,
          icon: "search",
          variant: "contained",
          color: "primary",
        },
      ]}
    >
      <Grid container>
        {searchDefs.map((searchDef, index) => {
          const {
            name,
            type,
            Component = SearchField,
            description = "",
          } = searchDef;
          const label = type === OMNI_TEXT_SEARCH_TYPE ? "Global" : name;
          const searchValue = searchValues.get(index);
          const row: GridRow = {
            label,
            value: (
              // @ts-ignore searchType does not exist.
              <Component
                searchKey={name}
                placeholder={description}
                // @ts-ignore searchType does not exist.
                searchType={type}
                searchDefs={searchDefs}
                searchValues={searchValues}
                searchValue={searchValue}
                onChange={onChange}
                onSearch={onSearch}
              />
            ),
          };
          return (
            <TwoColumnRow
              key={index}
              rowIndex={index}
              row={row}
              labelWidth={2}
            />
          );
        })}
        {children}
      </Grid>
    </CommonDialog>
  );
};
