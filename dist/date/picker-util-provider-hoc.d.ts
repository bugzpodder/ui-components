import { ComponentType } from "react";
import { ParsableDate } from "@material-ui/pickers/constants/prop-types";
export declare function wrapPickerUtilProvider<P>(WrappedComponent: ComponentType<P>, useOldPicker?: boolean, utils?: any): (props: P) => JSX.Element;
export declare const useMuiPickersContext: () => import("@date-io/core/IUtils").IUtils<any>;
export declare const useDateFormat: () => {
    defaultDateFormat: string;
    defaultDateTimeFormat: string;
};
export declare const useFormattedDateForDisplay: (value: ParsableDate, format: string) => string;
