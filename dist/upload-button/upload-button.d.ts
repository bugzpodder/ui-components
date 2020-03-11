/// <reference types="react" />
import { ButtonProps } from "@material-ui/core/Button";
declare type Props = {
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
export declare const UploadButton: (props: Props) => JSX.Element;
export {};
