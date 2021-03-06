import Button, { ButtonProps } from "@material-ui/core/Button";
import React from "react";
import styles from "./upload-button.module.scss";
import { CloudUpload as CloudUploadIcon } from "@material-ui/icons";

type Props = {
  /** If true, allows multiple files to be selected. */
  allowMultiple?: boolean;
  /**
   * Text to show on the button. Default is "Upload File" if allowMultiple
   * is false and "Upload File(s)" if allowMultiple is true.
   */
  text?: string;
  /** Props to pass to the button component. */
  buttonProps?: ButtonProps;
  /** Props to pass to the input component. */
  inputProps?: Record<string, any>;
  /**
   * The function used to retrieve the files that have been uploaded.
   * Note that the input value is of type FileList, a type internal to JS. See
   * https://developer.mozilla.org/en-US/docs/Web/API/FileList for details.
   */
  onChange: (x0: FileList) => any;
};

/** `UploadButton` handles file uploads through a `Button` component. */
export const UploadButton = (props: Props) => {
  const {
    allowMultiple = false,
    text = allowMultiple ? "Upload File(s)" : "Upload File",
    buttonProps = {},
    inputProps = {},
    onChange,
  } = props;
  return (
    // @ts-ignore cannot assign component to props.
    <Button component="label" {...buttonProps}>
      <CloudUploadIcon className={styles.cloudUpload} />
      {text}
      <input
        type="file"
        data-testid="upload-button-input-field"
        multiple={allowMultiple}
        className={styles.fileInput}
        onChange={({ currentTarget: { files } }) => onChange(files)}
        {...inputProps}
      />
    </Button>
  );
};
