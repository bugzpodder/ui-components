#### CommonDialogActions

```js
const Button = require("@material-ui/core/Button").default;
class MultiPageDialogDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false, pageIndex: 0 };
  }
  render() {
    const { isVisible, pageIndex } = this.state;
    const pages = [<div> Page 1 Content </div>, <div> Page 2 Content </div>];
    const setPage = pageIndex => {
      this.setState({ pageIndex });
    };
    return (
      <div>
        <Button onClick={() => this.setState({ isVisible: true })}>Open multi page dialog</Button>
        <CommonMultiPageDialog
          title="Example Dialog"
          hideModal={() => this.setState({ isVisible: false })}
          isVisible={isVisible}
          actions={[
            {
              name: "Next page",
              callback: () => {
                setPage(pageIndex + 1);
              },
              isEnabled: true,
              variant: "contained",
              icon: "arrow_forward",
              color: "primary",
              pages: [0],
            },
            {
              name: "Alert & Close",
              callback: () => {
                alert("No more pages!");
                this.setState({ isVisible: false });
              },
              isEnabled: true,
              variant: "contained",
              color: "primary",
              pages: [1],
            },
          ]}
          pages={pages}
          pageIndex={pageIndex}
          setPage={setPage}
        />
      </div>
    );
  }
}

<MultiPageDialogDemo />;
```
