import React, { ReactNode } from "react";
import { OmniQueryOptionsV2, OmniSearchCommand, OmniSearchDef, OmniSearchDefs, OmniSearchValues, SearchOptionsV2 } from "../types/api";
import { RouteComponentProps } from "react-router-dom";
declare type Props = {
    /** Defines the search parameters. */
    searchDefs: OmniSearchDefs;
    /** Handles a request to search. */
    setSearchOptions: (x0: OmniQueryOptionsV2) => any;
    /** Handles a request to update search options but not perform the search. */
    updateSearchOptions: (x0: {
        searchOptions: SearchOptionsV2;
    }) => any;
    /** getInitialValues gets values to default to for omni-search. */
    getInitialValues?: (searchDefs: OmniSearchDefs) => OmniSearchValues;
    /** Takes a `node` to include in the omni dropdown after the search fields */
    children?: ReactNode;
    /** Omni search change command queue */
    omniSearchCommands?: OmniSearchCommand[];
    /** Function to set omni search change command queue */
    setOmniSearchCommands?: (x0: OmniSearchCommand[]) => any;
} & RouteComponentProps<any>;
declare type State = {
    isOpen: boolean;
    omniText: string;
    error: string;
    searchValues: OmniSearchValues;
};
/**
 * Provides a search input that maps to provided search options and
 * populates a dropdown with fields to the individual options.
 *
 * OmniSearchBar initializes based on several sources, with an order of precedence:
 * 1. URL query parameters
 * 2. Local storage
 * 3. Response from `props.getInitialValues()`
 *
 * After initialization, this component then calls `setSearchOptions`, which should
 * trigger the caller's search. This includes an extra option `isUserSearchAction: false`
 *
 * Subsequently, a user may change the search contents. There are a few ways that a user can
 * update search:
 * 1. Enter into the bar or the popup form
 * 2. Trigger an `OmniSearchCommand` (typically via closing an `OmniChip`)
 * Both of these will trigger a call to `setSearchOptions` with `isUserSearchAction: true`
 */
export declare class OmniSearchBar extends React.Component<Props, State> {
    state: State;
    lastSearchedValues: OmniSearchValues | null;
    componentDidMount: () => Promise<void>;
    componentDidUpdate: (prevProps: Props) => Promise<void>;
    getLocalStorageKey: (pathname: string, searchDef: OmniSearchDef) => string;
    getValuesFromLocalStorage: (pathname: string, searchDefs: OmniSearchDef[]) => Map<number, string>;
    setValuesToLocalStorage: (pathname: string, searchDefs: OmniSearchDef[], searchValues: Map<number, string>) => void;
    mergeOmniWithLocalStorage: (omniText: string) => string;
    mergeOmniWithInitialValues: (omniText: string) => string;
    toggleOmniIsOpen: () => void;
    setOmniIsOpen: (isOpen: boolean) => void;
    updateOmniText: (omniText: string) => Promise<any>;
    onSearch: (options?: {
        [x: string]: any;
    }) => void;
    updateOmniUrl: (shouldUpdateBrowserHistory?: boolean) => void;
    handleClear: () => Promise<void>;
    onChange: (id: string, value: string) => Promise<any>;
    render: () => JSX.Element;
}
export {};
