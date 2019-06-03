### Simple TimelineGraph

```js
import { ExampleWrapper } from "../test-utils";
import { TimelineGraph } from "./";
const rows = [
  {
    user: "wikipedia",
    date: "1848-02-23T16:20:00Z",
    content: <div>John Quincy Adams dies.</div>,
  },
  {
    user: "wikipedia",
    date: "1818-04-10T12:00:00Z",
    content: (
      <div>
        John Quincy Adams tries to dig to the middle of the Earth to conduct trade with the people living there.
      </div>
    ),
  },
  {
    user: "wikipedia",
    date: "1767-07-11T12:20:00Z",
    content: <div>John Quincy Adams is born.</div>,
  },
];

<ExampleWrapper>
  <TimelineGraph rows={rows} />
</ExampleWrapper>;
```

### Selectable TimelineGraph (with Time)

```js
import { useState } from "react";
import { ExampleBlock, ExampleWrapper } from "../test-utils";
import { TimelineGraph } from "./";
const rows = [
  {
    date: "1848-02-23T16:20:00Z",
    content: <div>John Quincy Adams dies.</div>,
  },
  {
    date: "1818-04-10T12:00:00Z",
    content: (
      <div>
        John Quincy Adams tries to dig to the middle of the Earth to conduct trade with the people living there.
      </div>
    ),
  },
  {
    date: "1767-07-11T12:20:00Z",
    content: <div>John Quincy Adams is born.</div>,
  },
];

const ExampleTimelineGraph = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div>
      <TimelineGraph isTimeVisible onSelect={setSelectedItem} selectedItem={selectedItem} rows={rows} />
      <ExampleBlock strongHeader="State " content={selectedItem} />
    </div>
  );
};

<ExampleWrapper>
  <ExampleTimelineGraph />
</ExampleWrapper>;
```
