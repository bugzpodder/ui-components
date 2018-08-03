#### CommonDialogAction

```js
const Button = require("@material-ui/core/Button").default;
class DialogDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false };
  }

  render() {
    const { isVisible } = this.state;
    return (
      <div>
        <Button onClick={() => this.setState({ isVisible: true })}>Open simple dialog</Button>
        <CommonDialog
          title="Example Dialog"
          classes={{
            root: "root-class",
            title: "title-class",
            content: "content-class",
            actions: "actions-class",
          }}
          hideModal={() => this.setState({ isVisible: false })}
          isVisible={isVisible}
          actions={[
            {
              name: "Button 2",
              callback: () => this.setState({ isVisible: false }),
              isEnabled: true,
              color: "secondary",
              positionLeft: true,
            },
            {
              name: "Button 1",
              callback: () => this.setState({ isVisible: false }),
              icon: "done",
              isEnabled: true,
              variant: "raised",
              color: "primary",
            },
          ]}
        >
          <div>Put something cool in here</div>
        </CommonDialog>
      </div>
    );
  }
}

<DialogDemo />;
```
