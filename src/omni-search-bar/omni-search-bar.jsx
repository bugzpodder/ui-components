// @flow
import React, { Fragment } from "react";
import styles from "./omni.module.scss";
import width from "dom-helpers/query/width";
import {
  OMNI_ERROR,
  OMNI_KEY,
  getOmniTextFromSearchValues,
  getQuery,
  getSearchOptions,
  getSearchValuesFromOmniText,
  isValueValid,
  localStorage,
  updateQuery,
} from "@grail/lib/";
import { OmniDropdown } from "./components/omni-dropdown";
import { OmniField } from "./components/omni-field";

type Props = {
  /** Defines the search parameters. */
  searchDefs: SearchDefs,
  /** Handles a request to search. */
  setSearchOptions: ({ searchOptions: SearchOptionsV2 }) => any,
  /** getInitialValues gets values to default to for omni-search. */
  getInitialValues?: (searchDefs: SearchDefs) => SearchValues,
  /** Takes a `node` to include in the omni dropdown after the search fields */
  children?: React$Node,
} & NavProps;

type State = {
  isOpen: boolean,
  omniText: string,
  error: string,
  searchValues: SearchValues,
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

  componentDidMount = async () => {
    const { location, getInitialValues } = this.props;
    let omniText = getQuery({ location })[OMNI_KEY];
    omniText = this.mergeOmniWithLocalStorage(omniText);
    if (getInitialValues) {
      omniText = this.mergeOmniWithInitialValues(omniText);
    }
    if (!isValueValid(omniText)) {
      return null;
    }
    await this.updateOmniText(omniText);
    this.onSearch();
  };

  componentDidUpdate = async (prevProps: Props) => {
    const { location, searchDefs, getInitialValues } = this.props;
    let omniText = getQuery({ location })[OMNI_KEY] || "";
    const prevOmniText = getQuery({ location: prevProps.location })[OMNI_KEY] || "";
    if (searchDefs !== prevProps.searchDefs) {
      omniText = this.mergeOmniWithLocalStorage(omniText);
      if (getInitialValues) {
        omniText = this.mergeOmniWithInitialValues(omniText);
      }
    }
    let shouldSearch = false;
    if (
      searchDefs !== prevProps.searchDefs ||
      (prevOmniText !== omniText && prevProps.location.pathname === location.pathname)
    ) {
      await this.updateOmniText(omniText);
      shouldSearch = true;
    }
    if (shouldSearch) {
      this.onSearch();
    }
  };

  getValuesFromLocalStorage = (searchDefs: SearchDefs) => {
    const storageValues: Map<number, string> = new Map();
    searchDefs.forEach((searchDef, index) => {
      const { localStorageKey } = searchDef;
      if (localStorageKey !== undefined) {
        const storageValue = localStorage.get(localStorageKey);
        if (storageValue !== undefined) {
          storageValues.set(index, String(storageValue));
        }
      }
    });
    return storageValues;
  };

  setValuesToLocalStorage = (searchDefs: SearchDefs, searchValues: SearchValues) => {
    searchDefs.forEach((searchDef, index) => {
      const { localStorageKey } = searchDef;
      if (localStorageKey !== undefined) {
        if (searchValues.has(index)) {
          const searchValue = searchValues.get(index);
          localStorage.set(localStorageKey, searchValue);
        } else {
          localStorage.remove(localStorageKey);
        }
      }
    });
  };

  mergeOmniWithLocalStorage = (omniText: string): string => {
    const { searchDefs } = this.props;
    try {
      const searchValues = getSearchValuesFromOmniText(searchDefs, omniText);
      const storageValues = this.getValuesFromLocalStorage(searchDefs);
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
      throw error;
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
      throw error;
    }
  };

  toggleDropdown = () => {
    this.setState(prevState => {
      return { isOpen: !prevState.isOpen };
    });
  };

  setDropdownIsOpen = (isOpen: boolean) => {
    this.setState({ isOpen });
  };

  updateOmniText = (omniText: string): Promise<*> => {
    return new Promise(resolve => {
      this.setState(() => {
        const { searchDefs } = this.props;
        try {
          const searchValues = getSearchValuesFromOmniText(searchDefs, omniText);
          this.setValuesToLocalStorage(searchDefs, searchValues);
          return {
            omniText,
            searchValues,
            error: "",
          };
        } catch (error) {
          if (error.name === OMNI_ERROR) {
            return { omniText, error: error.message };
          }
          throw error;
        }
      }, resolve);
    });
  };

  onSearch = (shouldUpdateBrowserHistory: boolean = false) => {
    this.setState({ isOpen: false });
    this.props.setSearchOptions({ searchOptions: getSearchOptions(this.props.searchDefs, this.state.searchValues) });
    const { omniText } = this.state;
    updateQuery(
      this.props,
      { [OMNI_KEY]: omniText },
      {
        shouldUpdateBrowserHistory,
      },
    );
  };

  handleClear = () => {
    this.updateOmniText("");
  };

  onChange = (id: string, value: string) => {
    let omniText = value;
    if (id !== OMNI_KEY) {
      const index = Number.parseInt(id.split("-").pop(), 10);
      const searchValues: SearchValues = new Map(this.state.searchValues).set(index, value);
      omniText = getOmniTextFromSearchValues(this.props.searchDefs, searchValues);
    }
    // $FlowFixMe: omniText is a string
    this.updateOmniText(omniText);
  };

  anchorEl = null;

  render = () => {
    const { searchDefs, children } = this.props;
    const { isOpen } = this.state;
    return (
      <Fragment>
        {isOpen && (
        <div
          id={`${OMNI_KEY}-clickaway`}
          className={styles.clickAwayLayer}
          onClick={this.toggleDropdown}
        />
        )}
        <div
          className={styles.omniBar}
          ref={node => {
            this.anchorEl = node;
          }}
        >
          <OmniField
            omniText={this.state.omniText}
            onChange={this.onChange.bind(this)}
            onSearch={() => {
              this.onSearch(true);
            }}
            onClear={this.handleClear}
            error={this.state.error}
            isOpen={isOpen}
            setDropdownIsOpen={this.setDropdownIsOpen}
            defaultField={searchDefs[0].name.toLowerCase()}
          />
          {isOpen && (
            <div
              id={`${OMNI_KEY}-dropdown`}
              className={styles.omniDropdown}
            >
              <OmniDropdown
                searchDefs={searchDefs}
                searchValues={this.state.searchValues}
                onSearch={() => {
                  this.onSearch(true);
                }}
                onChange={this.onChange.bind(this)}
                onClear={this.handleClear}
                width={width(this.anchorEl, true)}
              >
                {children}
              </OmniDropdown>
            </div>
          )}
        </div>
      </Fragment>
    );
  };
}
