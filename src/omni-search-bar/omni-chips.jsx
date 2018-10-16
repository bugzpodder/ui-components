// @flow
import Chip from "@material-ui/core/Chip";
import React from "react";
import styles from "./omni.module.scss";
import { OMNI_DELETE_COMMAND, OMNI_KEY } from "@grail/lib";

type Props = {
  /** Search Options. */
  searchOptions: SearchOptionsV2,
  /** Function to set searchOptions */
  addOmniSearchCommand?: OmniSearchCommand => any,
};

export const OmniChips = (props: Props) => {
  const { searchOptions, addOmniSearchCommand } = props;
  const onDelete = addOmniSearchCommand
    ? deletedName => {
      addOmniSearchCommand({ command: OMNI_DELETE_COMMAND, omniFieldName: deletedName });
    }
    : undefined;
  return (
    <div className={styles.omniChips}>
      {searchOptions.map(searchOption => {
        const { name, values = [] } = searchOption;
        const displayName = name === OMNI_KEY ? "" : `${name}: `;
        return (
          <Chip
            key={name}
            data-testid={name}
            classes={{ root: styles.chip }}
            color="primary"
            variant="default"
            aria-label={name}
            label={`${displayName}${values.join(", ")}`}
            onDelete={onDelete && onDelete.bind(this, name)}
          />
        );
      })}
    </div>
  );
};
