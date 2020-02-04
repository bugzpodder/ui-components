import { ComponentType } from "react";
import { IUtils } from "@date-io/core/IUtils";
import { ParsableDate } from "@material-ui/pickers/constants/prop-types";
export declare function wrapPickerUtilProvider<P>(WrappedComponent: ComponentType<P>, utils: any, useOldPicker?: boolean): (props: P) => JSX.Element;
export declare const useMuiPickersContext: () => IUtils<any>;
export declare const useDateFormat: () => {
    defaultDateFormat: string;
    defaultDateTimeFormat: string;
};
export declare const useParsedDate: (value: ParsableDate) => any;
export declare const useFormattedDateForDisplay: (value: ParsableDate, format: string) => string;
