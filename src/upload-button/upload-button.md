### Example

```js
const styles = require("../test-utils/example-styles.module.scss");
const ExampleWrapper = require("../test-utils").ExampleWrapper;
const ExampleBlock = require("../test-utils").ExampleBlock;

class UploadButtonExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filesMetadata: [],
    };
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleFileUpload(fileList) {
    const filesMetadata = [];
    for (let i = 0; i < fileList.length; i++) {
      let file = fileList.item(i);
      const fileValues = {
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModifiedDate,
        name: file.name,
        type: file.type,
        size: file.size,
      };
      filesMetadata.push(fileValues);
    }
    this.setState({ filesMetadata });
  }

  render() {
    return (
      <div className={styles.container}>
        <UploadButton
          allowMultiple
          buttonProps={{
            variant: "contained",
            color: "primary",
          }}
          onChange={this.handleFileUpload}
        />
        <ExampleBlock strongHeader="state " content={this.state} />
      </div>
    );
  }
}

<ExampleWrapper>
  <UploadButtonExample />
</ExampleWrapper>;
```
