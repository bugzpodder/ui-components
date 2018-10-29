### Simple TimelineCard

```js
const ExampleWrapper = require("@grail/components").ExampleWrapper;
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
  <TimelineCard
    rows={rows}
    commonCardProps={{
      title: "America 101",
      subheader: "The life of John Quincy Adams.",
    }}
    classes={{
      root: "timlinecard-root-class",
      commonCard: {
        title: "timlinecard-title-class",
        subheader: "timlinecard-subheader-class",
      },
    }}
  />
</ExampleWrapper>;
```

### Selectable TimelineCard (with Time)

```js
const ExampleBlock = require("@grail/components").ExampleBlock;
const ExampleWrapper = require("@grail/components").ExampleWrapper;
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

class ExampleTimelineCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(selectedItem) {
    this.setState({ selectedItem });
  }

  render() {
    return (
      <div>
        <TimelineCard
          isTimeVisible
          onSelect={this.handleSelect}
          selectedItem={this.state.selectedItem}
          rows={rows}
          commonCardProps={{
            title: "America 101",
            subheader: "The life of John Quincy Adams.",
          }}
          classes={{
            root: "timlinecard-root-class",
            commonCard: {
              title: "timlinecard-title-class",
              subheader: "timlinecard-subheader-class",
            },
          }}
        />
        <ExampleBlock strongHeader="State " content={this.state} />
      </div>
    );
  }
}

<ExampleWrapper>
  <ExampleTimelineCard />
</ExampleWrapper>;
```
