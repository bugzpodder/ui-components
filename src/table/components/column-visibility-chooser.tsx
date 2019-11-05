import Button from "@material-ui/core/Button/Button";

import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Popover from "@material-ui/core/Popover/Popover";
import React, { useRef, useState } from "react";
import Typography from "@material-ui/core/Typography";
import isEqual from "lodash/isEqual";
import styles from "./column-visibility-chooser.module.scss";
import { InternalPagedTableColumn } from "../../types/paged-table";

type Props = {
  columns: InternalPagedTableColumn[];
  columnVisibility: {
    [x: number]: boolean;
  };
  setColumnVisibility: (x0: { [x: number]: boolean }) => any;
};

export const ColumnVisibilityChooser: React.FC<Props> = props => {
  const { setColumnVisibility, columnVisibility, columns } = props;
  const [popoverIsVisible, setPopoverIsVisible] = useState(false);
  const anchorRef = useRef(null);
  const [draftColumnVisibility, setDraftColumnVisibility] = useState(
    columnVisibility,
  );
  return (
    <>
      <IconButton
        onClick={() => setPopoverIsVisible(true)}
        data-testid="column-visibility-chooser-button"
        buttonRef={anchorRef}
      >
        <MoreHorizIcon />
      </IconButton>
      <Popover
        open={popoverIsVisible}
        onClose={() => {
          setPopoverIsVisible(false);
          // Reset checkboxes.
          setDraftColumnVisibility(columnVisibility);
        }}
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        classes={{
          paper: styles.paper,
        }}
        data-testid="column-visibility-chooser-popover"
      >
        <Typography variant="subtitle2" className={styles.header}>
          Customize Columns
        </Typography>
        <div key="popover-column-list" className={styles.columnList}>
          {columns.map(({ index, Header, isRequired = false }) => {
            return (
              <div key={`column-item-${index}`} className={styles.columnItem}>
                <Checkbox
                  onChange={() =>
                    setDraftColumnVisibility({
                      ...draftColumnVisibility,
                      [index]: !draftColumnVisibility[index],
                    })
                  }
                  checked={draftColumnVisibility[index] || false}
                  color="primary"
                  disabled={isRequired}
                  inputProps={{
                    // @ts-ignore: data-testid is nnt assignable.
                    "data-testid": `column-item-checkbox-${index}`,
                  }}
                  className={styles.columnItemCheckbox}
                />
                <span>{Header}</span>
              </div>
            );
          })}
        </div>
        <div
          className={styles.applyButtonContainer}
          key="apply-button-container"
        >
          <Button
            variant="contained"
            color="primary"
            disabled={isEqual(draftColumnVisibility, columnVisibility)}
            className={styles.applyButton}
            onClick={() => {
              setPopoverIsVisible(false);
              // TODO(ecarrel): maybe store visibility values in localstorage.
              setColumnVisibility(draftColumnVisibility);
            }}
            data-testid="column-visibility-chooser-popover-apply-button"
          >
            Apply
          </Button>
        </div>
      </Popover>
    </>
  );
};
