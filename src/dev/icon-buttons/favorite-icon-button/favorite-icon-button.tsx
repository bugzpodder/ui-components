import IconButton from "@material-ui/core/IconButton";

import React from "react";
import SelectedStarIcon from "@material-ui/icons/Star";
import UnselectedStarIcon from "@material-ui/icons/StarBorder";
import styles from "./favorite-icon-button.module.scss";

type Props = {
  isSelected: boolean;
  onClick: (x0: boolean) => any;
};

export const FavoriteIconButton: React.FC<Props> = props => {
  const { isSelected = false, onClick } = props;
  return (
    <div className={styles.iconContainer}>
      <IconButton
        classes={{ root: styles.iconButton }}
        onClick={() => onClick(!isSelected)}
      >
        {isSelected ? (
          <SelectedStarIcon color="secondary" />
        ) : (
          <UnselectedStarIcon />
        )}
      </IconButton>
    </div>
  );
};
