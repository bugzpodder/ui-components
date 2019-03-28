// @flow
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import React, { type ElementConfig } from "react";
import styles from "./upload-button.module.scss";

type Props = {
  /** If true, allows multiple files to be selected. */
  allowMultiple?: boolean,
  /**
   * Text to show on the button. Default is "Upload File" if allowMultiple
   * is false and "Upload File(s)" if allowMultiple is true.
   */
  text?: string,
  /** Props to pass to the button component. */
  buttonProps?: ElementConfig<typeof Button>,
  /** Props to pass to the input component. */
  inputProps?: Object,
  /**
   * The function used to retrieve the files that have been uploaded.
   * Note that the input value is of type FileList, a type internal to JS. See
   * https://developer.mozilla.org/en-US/docs/Web/API/FileList for details.
   */
  onChange: FileList => any,
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
    <Button
      // The flow type for this prop is incomplete in the libdef; according to
      // material-ui.com, either a component or a string can be passed here.
      // $FlowFixMe: AbstractComponent [1] is incompatible with string [2].
      component="label"
      {...buttonProps}
    >
      <CloudUploadIcon className={styles.cloudUploadIcon} />
      {text}
      <input
        type="file"
        multiple={allowMultiple}
        style={{ display: "none" }}
        onChange={({ currentTarget: { files } }) => onChange(files)}
        {...inputProps}
      />
    </Button>
  );
};
