// @flow
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import React, { Fragment } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { OMNI_KEY } from "@grail/lib";

type Props = {
  searchOptions: SearchOptionsV2,
  setSearchOptions?: SearchOptionsV2 => any,
};

export const OmniChips = (props: Props) => {
  const { searchOptions, setSearchOptions } = props;
  const onDelete = setSearchOptions
    ? deletedName => {
      const newSearchOptions = searchOptions.filter(({ name }) => deletedName !== name);
      setSearchOptions(newSearchOptions);
    }
    : undefined;
  return (
    <Fragment>
      {searchOptions.map(searchOption => {
        const { name, values = [] } = searchOption;
        const displayName = name === OMNI_KEY ? "" : `${name}: `;
        const initials = displayName
          .split(" ")
          .map(word => word.substring(0, 1).toUpperCase())
          .join("");
        return (
          <Chip
            key={name}
            data-testid={name}
            className="margin-right-10"
            color="primary"
            variant="outlined"
            aria-label={name}
            label={`${displayName}${values.join(", ")}`}
            avatar={<Avatar>{initials || <SearchIcon />}</Avatar>}
            onDelete={onDelete && onDelete.bind(this, name)}
          />
        );
      })}
    </Fragment>
  );
};
