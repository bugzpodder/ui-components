import React, { ReactNode } from "react";
import { CommonDialogAction } from "./util";
import { CommonDialogClasses } from "../types/dialog";
declare type CommonMultiPageDialogAction = {
    pages?: number[];
} & CommonDialogAction;
declare type Props = {
    /** Custom action Buttons */
    actions: CommonMultiPageDialogAction[];
    /** The callback used to hide the modal */
    hideModal: () => any;
    /** Is the modal visible */
    isVisible: boolean;
    /** Gives a Title to the Dialog */
    title: ReactNode;
    /** Dialog content */
    pages: ReactNode[];
    /** Page index */
    pageIndex: number;
    /** The callback used to set page */
    setPage: Function;
    /** shows the back button if it's true */
    showBackButton?: boolean;
    /**
     * Provides classNames to the dialog's sub-components. Options include:
     *
     *  - `root`: dialog's outermost div
     *
     *  - `paper`: wrapper around dialog
     *
     *  - `container`: wrapper around container content
     *
     *  - `title`
     *
     *  - `content`: dialog content wrapper
     *
     *  - `actions`: dialog actions wrapper
     *
     *  - `action`: wrapper around each individual dialog action
     */
    classes?: CommonDialogClasses;
};
export declare const CommonMultiPageDialog: React.FC<Props>;
export {};
