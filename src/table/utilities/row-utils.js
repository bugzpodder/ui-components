// @flow
import keycode from "keycode";

export const getRowId = (idKey: ?string | ?number, instance: Object, index: number) => {
  if (idKey) {
    return instance[idKey];
  }
  return `${index}`;
};

export const getIndexOffset = (event: SyntheticKeyboardEvent<HTMLElement>) => {
  switch (event.keyCode) {
    case keycode("up"):
      return -1;
    case keycode("down"):
      return 1;
    default:
      return 0;
  }
};

export const handleKeyboardHighlight = (event: SyntheticKeyboardEvent<HTMLElement>, props: HighlightRowProps) => {
  const {
    data, idKey, onHighlightRow, highlightedRowId,
  } = props;
  if (!onHighlightRow) {
    return;
  }
  const selectedRowIndex = data.findIndex((instance, index) => getRowId(idKey, instance, index) === highlightedRowId);
  if (selectedRowIndex !== -1) {
    const indexOffset = getIndexOffset(event);
    if (indexOffset === 0) {
      return;
    }
    const newSelectionIndex = selectedRowIndex + indexOffset;
    const newInstance = data[newSelectionIndex];
    if (newInstance) {
      const newRowId = getRowId(idKey, newInstance, newSelectionIndex);
      onHighlightRow(newRowId);
    } else {
      onHighlightRow(highlightedRowId);
    }
  }
};
