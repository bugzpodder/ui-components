import Chip from "@material-ui/core/Chip";

import React from "react";
import styles from "./omni.module.scss";
import {
  OMNI_KEY,
  OmniSearchCommand,
  SET_OMNI_FIELD_COMMAND,
  SearchOptionV2,
} from "@grailbio/lib";

type Props = {
  /** Search Options. */
  searchOptions: SearchOptionV2[];
  /** Function to set searchOptions */
  addOmniSearchCommand?: (x0: OmniSearchCommand) => any;
};

export const OmniChips: React.FC<Props> = props => {
  const { searchOptions, addOmniSearchCommand } = props;
  return (
    <div className={styles.omniChips} data-testid="omni-chips-container">
      {searchOptions.map(searchOption => {
        const { name, values = [] } = searchOption;
        const displayName = name === OMNI_KEY ? "" : `${name}: `;
        const onDelete = addOmniSearchCommand
          ? (omniFieldName, valueIndex) => {
              const omniValues = [...values];
              omniValues.splice(valueIndex, 1);
              addOmniSearchCommand({
                command: SET_OMNI_FIELD_COMMAND,
                omniFieldName,
                omniValues,
              });
            }
          : undefined;
        return values.map((value, valueIndex) => (
          <Chip
            key={`${name}-${valueIndex}`}
            data-testid={`${name}-${valueIndex}`}
            classes={{ root: styles.chip }}
            color="primary"
            variant="default"
            aria-label={name}
            label={`${displayName}${value}`}
            onDelete={onDelete && onDelete.bind(this, name, valueIndex)}
          />
        ));
      })}
    </div>
  );
};
