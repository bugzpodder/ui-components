### Example

```js
const styles = require("../test-utils/example-styles.module.scss");
const { ExampleBlock, ExampleWrapper } = require("../test-utils");
const { useState } = require("react");

const UploadButtonExample = () => {
  const [filesMetadata, setFilesMetadata] = useState([]);

  const handleFileUpload = fileList => {
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
    setFilesMetadata(filesMetadata);
  };

  return (
    <div className={styles.container}>
      <UploadButton
        allowMultiple
        buttonProps={{
          variant: "contained",
          color: "primary",
        }}
        onChange={handleFileUpload}
      />
      <ExampleBlock strongHeader="state " content={filesMetadata} />
    </div>
  );
};

<ExampleWrapper>
  <UploadButtonExample />
</ExampleWrapper>;
```
