### Example

```js
import { ALPHABET_ANIMALS_DATA, ExampleWrapper } from "../test-utils";
import { useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import { SelectionGrid } from "./";

const ExampleSelectionGrid = () => {
  const [selectedCoordinates, setSelectedCoordinates] = useState([]);
  const numRows = ALPHABET_ANIMALS_DATA.length;
  const numCols = ALPHABET_ANIMALS_DATA[0].length;
  const cellRenderer = gridCellInfo => {
    const { rowIndex, colIndex, cellIndex, instance: animal } = gridCellInfo;
    if (isCellEmpty(gridCellInfo)) {
      return null;
    }
    return (
      <div>
        <div>Row index: {rowIndex}</div>
        <div>Col index: {colIndex}</div>
        <div>Cell index: {cellIndex}</div>
        <div>{animal}</div>
      </div>
    );
  };
  const isCellEmpty = ({ instance }) => instance == null;
  const isCellSelectable = ({ instance }) => instance != null;
  const onSelect = ({ rowIndex, colIndex }) => {
    const coordinates = cloneDeep(selectedCoordinates);
    const index = coordinates.findIndex(
      coordinate => coordinate.rowIndex === rowIndex && coordinate.colIndex === colIndex,
    );
    if (index >= 0) {
      coordinates.splice(index, 1);
    } else {
      coordinates.push({ rowIndex, colIndex });
    }
    setSelectedCoordinates(coordinates);
  };

  return (
    <SelectionGrid
      gridData={ALPHABET_ANIMALS_DATA}
      numRows={numRows}
      numCols={numCols}
      selectedCoordinates={selectedCoordinates}
      cellRenderer={cellRenderer}
      isCellEmpty={isCellEmpty}
      isCellSelectable={isCellSelectable}
      onSelect={onSelect}
    />
  );
};

<ExampleWrapper>
  <ExampleSelectionGrid />
</ExampleWrapper>;
```
