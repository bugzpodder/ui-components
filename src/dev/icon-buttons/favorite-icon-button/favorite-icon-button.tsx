import React from "react";
import styles from "./favorite-icon-button.module.scss";
import { IconButton } from "@material-ui/core";
import {
  StarBorder as StarBorderIcon,
  Star as StarIcon,
} from "@material-ui/icons";

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
        {isSelected ? <StarIcon color="secondary" /> : <StarBorderIcon />}
      </IconButton>
    </div>
  );
};
