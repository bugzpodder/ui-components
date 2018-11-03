### Example

```js
const Alert = require("@grail/components").Alert;
const ExampleWrapper = require("@grail/components").ExampleWrapper;
const ExampleBlock = require("@grail/components").ExampleBlock;
const Fragment = require("react").Fragment;

class ExampleTabbedCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "one",
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(activeTab) {
    this.setState({ activeTab });
  }

  render() {
    return (
      <Fragment>
        <CommonTabbedPage
          title="Example Tabbed Page"
          subtitle="This is a subtitle"
          activeTab={this.state.activeTab}
          onChangeActiveTab={this.onChange}
          headerActions={[
            {
              content: "Button Two",
              color: "primary",
              onClick: () => console.log("Button Two was clicked."),
            },
            {
              content: "Button One",
              color: "primary",
              variant: "contained",
              onClick: () => console.log("Button One was clicked."),
            },
          ]}
          pageConfigs={[
            {
              label: "Tab One",
              key: "one",
              Component: Alert,
              componentProps: {
                color: "success",
                message: "Tab One!",
              },
            },
            {
              label: "Tab Two",
              key: "two",
              Component: Alert,
              componentProps: {
                color: "warning",
                message: "Tab Two!",
              },
            },
          ]}
        />
        <ExampleBlock strongHeader="state " content={this.state} />
      </Fragment>
    );
  }
}

<ExampleWrapper>
  <ExampleTabbedCard />
</ExampleWrapper>;
```

Here is an example with a side menu as well. Note that clicking on the
menu will typically cause the page to scroll to the element whose `id`
matches the `key` given in the object in `menuContents`. However, it
uses CSS anchors and these do not work on styleguidist.

```js
const Fragment = require("react").Fragment;
const Alert = require("@grail/components").Alert;
const ExampleWrapper = require("@grail/components").ExampleWrapper;
const ExampleBlock = require("@grail/components").ExampleBlock;

const TabOneComponent = () => {
  return (
    <Fragment>
      <Alert color="success" message="Tab One Element A!" id="elementA" />
      <Alert color="success" message="Tab One Element B!" id="elementB" />
      <Alert color="success" message="Tab One Element C!" id="elementC" />
    </Fragment>
  );
};

const TabTwoComponent = () => {
  return (
    <Fragment>
      <Alert color="warning" message="Tab Two Element I!" id="elementI" />
      <Alert color="warning" message="Tab Two Element II!" id="elementII" />
      <Alert color="warning" message="Tab Two Element III!" id="elementIII" />
    </Fragment>
  );
};

class ExampleTabbedCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "one",
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(activeTab) {
    this.setState({ activeTab });
  }

  render() {
    return (
      <Fragment>
        <CommonTabbedPage
          title="Example With Menu"
          subtitle="Another subtitle"
          activeTab={this.state.activeTab}
          onChangeActiveTab={this.onChange}
          headerActions={[
            {
              content: "Button Two",
              color: "primary",
              onClick: () => console.log("Button Two was clicked."),
            },
            {
              content: "Button One",
              color: "primary",
              variant: "contained",
              onClick: () => console.log("Button One was clicked."),
            },
          ]}
          pageConfigs={[
            {
              label: "Tab One",
              key: "one",
              Component: TabOneComponent,
              componentProps: {},
              menuContents: [
                {
                  label: "Element A",
                  key: "elementA",
                },
                {
                  label: "Element B",
                  key: "elementB",
                },
                {
                  label: "Element C",
                  key: "elementC",
                },
              ],
            },
            {
              label: "Tab Two",
              key: "two",
              Component: TabTwoComponent,
              componentProps: {},
              menuContents: [
                {
                  label: "Element I",
                  key: "elementI",
                },
                {
                  label: "Element II",
                  key: "elementII",
                },
                {
                  label: "Element III",
                  key: "elementIII",
                },
              ],
            },
          ]}
        />
        <ExampleBlock strongHeader="state " content={this.state} />
      </Fragment>
    );
  }
}

<ExampleWrapper>
  <ExampleTabbedCard />
</ExampleWrapper>;
```
