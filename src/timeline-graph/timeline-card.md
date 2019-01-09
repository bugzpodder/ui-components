### Simple TimelineCard

```js
const ExampleWrapper = require("@grail/components").ExampleWrapper;
const ADAMS_DATA = require("@grail/components/utils").ADAMS_DATA;

<ExampleWrapper>
  <TimelineCard
    rows={ADAMS_DATA}
    commonCardProps={{
      title: "America 101",
      subheader: "The life of John Quincy Adams.",
    }}
    classes={{
      root: "timelinecard-root-class",
      commonCard: {
        title: "timelinecard-title-class",
        subheader: "timelinecard-subheader-class",
      },
    }}
  />
</ExampleWrapper>;
```

### Selectable TimelineCard (with Time)

```js
const ExampleBlock = require("@grail/components").ExampleBlock;
const ExampleWrapper = require("@grail/components").ExampleWrapper;
const ADAMS_DATA = require("@grail/components/utils").ADAMS_DATA;

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
          rows={ADAMS_DATA}
          classes={{
            root: "timelinecard-root-class",
            commonCard: {
              title: "timelinecard-title-class",
              subheader: "timelinecard-subheader-class",
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
