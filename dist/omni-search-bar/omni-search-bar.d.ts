import React from "react";
import { History, Location } from "history";
import { OmniQueryOptions, OmniSearchCommand, OmniSearchDef, SearchOption } from "@grailbio/lib";
export declare const setOmniSearchValuesToLocalStorage: (pathname: string, searchDefs: OmniSearchDef[], searchValues: Map<number, string>) => void;
declare type Props = {
    /** Defines the search parameters. */
    searchDefs: OmniSearchDef[];
    /** Handles a request to search. */
    setSearchOptions: (x0: OmniQueryOptions) => any;
    /** Handles a request to update search options but not perform the search. */
    updateSearchOptions?: (x0: {
        searchOptions: SearchOption[];
    }) => any;
    /** Omni search change command queue */
    omniSearchCommands?: OmniSearchCommand[];
    /** Function to set omni search change command queue */
    setOmniSearchCommands?: (x0: OmniSearchCommand[]) => any;
    /** Location object */
    location: Location;
    /** History object */
    history: History;
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
export declare const OmniSearchBar: React.FC<Props>;
export {};
