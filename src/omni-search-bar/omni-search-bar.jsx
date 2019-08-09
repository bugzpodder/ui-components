// @flow
import React from "react";
import isEqual from "lodash/isEqual";
import styles from "./omni.module.scss";
import {
  OMNI_ERROR,
  OMNI_KEY,
  SET_OMNI_FIELD_COMMAND,
  getOmniTextFromSearchValues,
  getQuery,
  getSearchOptions,
  getSearchValuesFromOmniText,
  localStorage,
  updateQuery,
} from "@grail/lib";
import { OMNI_INPUT_FIELD_ID, OmniField } from "./components/omni-field";
import { OmniDialog } from "./components/omni-dialog";

type Props = {
  /** Defines the search parameters. */
  searchDefs: OmniSearchDefs,
  /** Handles a request to search. */
  setSearchOptions: ({ searchOptions: SearchOptionsV2 }) => any,
  /** Handles a request to update search options but not perform the search. */
  updateSearchOptions: ({ searchOptions: SearchOptionsV2 }) => any,
  /** getInitialValues gets values to default to for omni-search. */
  getInitialValues?: (searchDefs: OmniSearchDefs) => OmniSearchValues,
  /** Takes a `node` to include in the omni dropdown after the search fields */
  children?: React$Node,
  /** Omni search change command queue */
  omniSearchCommands?: Array<OmniSearchCommand>,
  /** Function to set omni search change command queue */
  setOmniSearchCommands?: (Array<OmniSearchCommand>) => any,
} & NavProps;

type State = {
  isOpen: boolean,
  omniText: string,
  error: string,
  searchValues: OmniSearchValues,
};

/**
 * Provides a search input that maps to provided search options and
 * populates a dropdown with fields to the individual options.
 */
export class OmniSearchBar extends React.Component<Props, State> {
  state: State = {
    isOpen: false,
    omniText: "",
    error: "",
    searchValues: new Map(),
  };

  lastSearchedValues: ?OmniSearchValues = null;

  componentDidMount = async () => {
    const { location, getInitialValues } = this.props;
    let omniText = getQuery({ location })[OMNI_KEY];
    if (!omniText) {
      omniText = this.mergeOmniWithLocalStorage(omniText);
    }
    if (getInitialValues) {
      omniText = this.mergeOmniWithInitialValues(omniText);
    }
    await this.updateOmniText(omniText);
    this.onSearch();
  };

  componentDidUpdate = async (prevProps: Props) => {
    const { location = {}, searchDefs, getInitialValues } = this.props;
    const { location: prevLocation = {} } = prevProps;
    let omniText = getQuery({ location })[OMNI_KEY] || "";
    const prevOmniText = getQuery({ location: prevLocation })[OMNI_KEY] || "";
    if (searchDefs !== prevProps.searchDefs) {
      if (!omniText) {
        omniText = this.mergeOmniWithLocalStorage(omniText);
      }
      if (getInitialValues) {
        omniText = this.mergeOmniWithInitialValues(omniText);
      }
    }
    let shouldSearch = false;
    let shouldUpdateBrowserHistory = false;
    const isNewPath = prevLocation.pathname !== location.pathname;
    if (isNewPath) {
      this.lastSearchedValues = null;
    }
    if (searchDefs !== prevProps.searchDefs || (prevOmniText !== omniText && !isNewPath)) {
      await this.updateOmniText(omniText);
      shouldSearch = true;
    }
    const { omniSearchCommands, setOmniSearchCommands } = this.props;
    if (omniSearchCommands && omniSearchCommands.length && omniSearchCommands !== prevProps.omniSearchCommands) {
      const promises = omniSearchCommands.map(async ({ command, omniFieldName, omniValues = [] }) => {
        if (command === SET_OMNI_FIELD_COMMAND) {
          return await this.onChange(omniFieldName, omniValues.join(","));
        }
      });
      await Promise.all(promises);
      setOmniSearchCommands && setOmniSearchCommands([]);
      shouldSearch = true;
      shouldUpdateBrowserHistory = true;
    }
    if (shouldSearch) {
      this.onSearch(shouldUpdateBrowserHistory);
    }
  };

  getLocalStorageKey = (pathname: string, searchDef: OmniSearchDef) => {
    const { name, localStorageKeySuffix } = searchDef;
    return localStorageKeySuffix != null ? `omni-${localStorageKeySuffix}` : `omni-${pathname}-${name}`;
  };

  getValuesFromLocalStorage = (pathname: string, searchDefs: OmniSearchDefs) => {
    const storageValues: Map<number, string> = new Map();
    if (!pathname) {
      return storageValues;
    }
    searchDefs.forEach((searchDef, index) => {
      const storageValue = localStorage.get(this.getLocalStorageKey(pathname, searchDef));
      if (storageValue !== undefined) {
        storageValues.set(index, String(storageValue));
      }
    });
    return storageValues;
  };

  setValuesToLocalStorage = (pathname: string, searchDefs: OmniSearchDefs, searchValues: OmniSearchValues) => {
    if (!pathname) {
      return;
    }
    searchDefs.forEach((searchDef, index) => {
      const localStorageKey = this.getLocalStorageKey(pathname, searchDef);
      if (searchValues.has(index)) {
        const searchValue = searchValues.get(index);
        localStorage.set(localStorageKey, searchValue);
      } else {
        localStorage.remove(localStorageKey);
      }
    });
  };

  mergeOmniWithLocalStorage = (omniText: string): string => {
    const { location = {}, searchDefs } = this.props;
    try {
      const searchValues = getSearchValuesFromOmniText(searchDefs, omniText);
      const storageValues = this.getValuesFromLocalStorage(location.pathname, searchDefs);
      storageValues.forEach((value, key) => {
        if (!searchValues.has(key)) {
          searchValues.set(key, value);
        }
      });
      return getOmniTextFromSearchValues(searchDefs, searchValues);
    } catch (error) {
      if (error.name === OMNI_ERROR) {
        return omniText;
      }
      console.error(error);
      this.setState({ error: error.message });
      return "";
    }
  };

  mergeOmniWithInitialValues = (omniText: string): string => {
    const { searchDefs, getInitialValues } = this.props;
    if (!getInitialValues) {
      return omniText;
    }
    try {
      const searchValues = getSearchValuesFromOmniText(searchDefs, omniText);
      const initialValues = getInitialValues(searchDefs);
      initialValues.forEach((value, key) => {
        if (!searchValues.has(key)) {
          searchValues.set(key, value);
        }
      });
      return getOmniTextFromSearchValues(searchDefs, searchValues);
    } catch (error) {
      if (error.name === OMNI_ERROR) {
        return omniText;
      }
      console.error(error);
      this.setState({ error: error.message });
      return "";
    }
  };

  toggleOmniIsOpen = () => {
    this.setState(prevState => {
      return { isOpen: !prevState.isOpen };
    });
  };

  setOmniIsOpen = (isOpen: boolean) => {
    this.setState({ isOpen });
  };

  updateOmniText = (omniText: string): Promise<*> => {
    return new Promise(resolve => {
      this.setState(() => {
        const { location = {}, searchDefs, updateSearchOptions } = this.props;
        try {
          const searchValues = getSearchValuesFromOmniText(searchDefs, omniText);
          this.setValuesToLocalStorage(location.pathname, searchDefs, searchValues);
          if (updateSearchOptions) {
            updateSearchOptions({ searchOptions: getSearchOptions(searchDefs, searchValues) });
          }
          return {
            omniText,
            searchValues,
            error: "",
          };
        } catch (error) {
          if (error.name !== OMNI_ERROR) {
            console.error(error);
          }
          return { omniText, error: error.message };
        }
      }, resolve);
    });
  };

  onSearch = (shouldUpdateBrowserHistory: boolean = false) => {
    this.setState({ isOpen: false });
    const { searchValues } = this.state;
    if (isEqual(searchValues, this.lastSearchedValues)) {
      return;
    }
    this.lastSearchedValues = searchValues;
    this.props.setSearchOptions({ searchOptions: getSearchOptions(this.props.searchDefs, searchValues) });
    this.updateOmniUrl(shouldUpdateBrowserHistory);
  };

  updateOmniUrl = (shouldUpdateBrowserHistory: boolean = false) => {
    const { omniText } = this.state;
    updateQuery(
      this.props,
      { [OMNI_KEY]: omniText },
      {
        shouldUpdateBrowserHistory,
      },
    );
  };

  handleClear = async () => {
    await this.updateOmniText("");
  };

  onChange = async (id: string, value: string) => {
    let omniText = value;
    if (id !== OMNI_INPUT_FIELD_ID) {
      const { searchDefs } = this.props;
      const index = searchDefs.findIndex(({ name }) => name === id);
      if (index === -1) {
        return;
      }
      const searchValues: OmniSearchValues = new Map(this.state.searchValues).set(index, value);
      omniText = getOmniTextFromSearchValues(this.props.searchDefs, searchValues);
    }
    return await this.updateOmniText(omniText);
  };

  render = () => {
    const { searchDefs, children } = this.props;
    const { isOpen } = this.state;
    return (
      <>
        {isOpen && (
          <div
            id={`${OMNI_KEY}-clickaway`}
            className={styles.clickAwayLayer}
            onClick={this.toggleOmniIsOpen}
          />
        )}
        <div className={styles.omniBar}>
          <OmniField
            omniText={this.state.omniText}
            onChange={this.onChange.bind(this)}
            onSearch={() => {
              this.onSearch(true);
            }}
            onClear={this.handleClear}
            error={this.state.error}
            isOpen={isOpen}
            setOmniIsOpen={this.setOmniIsOpen}
            defaultField={searchDefs[0].name.toLowerCase()}
          />
          {isOpen && (
            <OmniDialog
              searchDefs={searchDefs}
              searchValues={this.state.searchValues}
              onSearch={() => {
                this.onSearch(true);
              }}
              onChange={this.onChange.bind(this)}
              onClear={this.handleClear}
              setIsOpen={this.setOmniIsOpen}
            >
              {children}
            </OmniDialog>
          )}
        </div>
      </>
    );
  };
}
