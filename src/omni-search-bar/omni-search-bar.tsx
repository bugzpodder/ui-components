import React, { useCallback, useEffect, useRef, useState } from "react";
import isEqual from "lodash/isEqual";
import styles from "./omni.module.scss";
// eslint-disable-next-line import/no-extraneous-dependencies
import { History, Location } from "history";
import {
  OMNI_ERROR,
  OMNI_KEY,
  OmniQueryOptionsV2,
  OmniSearchCommand,
  OmniSearchDef,
  OmniSearchValues,
  SET_OMNI_FIELD_COMMAND,
  SearchOptionV2,
  getOmniTextFromSearchValues,
  getQuery,
  getSearchOptions,
  getSearchValuesFromOmniText,
  localStorage,
  updateQuery,
} from "@grailbio/lib";
import { OMNI_INPUT_FIELD_ID, OmniField } from "./components/omni-field";
import { OmniDialog } from "./components/omni-dialog";

const getLocalStorageKey = (pathname: string, searchDef: OmniSearchDef) => {
  const { name, localStorageKeySuffix } = searchDef;
  return localStorageKeySuffix != null
    ? `omni-${localStorageKeySuffix}`
    : `omni-${pathname}-${name}`;
};

const setValuesToLocalStorage = (
  pathname: string,
  searchDefs: OmniSearchDef[],
  searchValues: OmniSearchValues,
) => {
  if (!pathname) {
    return;
  }
  searchDefs.forEach((searchDef, index) => {
    const localStorageKey = getLocalStorageKey(pathname, searchDef);
    if (searchValues.has(index)) {
      const searchValue = searchValues.get(index);
      localStorage.set(localStorageKey, searchValue);
    } else {
      localStorage.remove(localStorageKey);
    }
  });
};

const getValuesFromLocalStorage = (
  pathname: string,
  searchDefs: OmniSearchDef[],
) => {
  const storageValues: Map<number, string> = new Map();
  if (!pathname) {
    return storageValues;
  }
  searchDefs.forEach((searchDef, index) => {
    const storageValue = localStorage.get(
      getLocalStorageKey(pathname, searchDef),
    );
    if (storageValue !== undefined) {
      storageValues.set(index, String(storageValue));
    }
  });
  return storageValues;
};

type Props = {
  /** Defines the search parameters. */
  searchDefs: OmniSearchDef[];
  /** Handles a request to search. */
  setSearchOptions: (x0: OmniQueryOptionsV2) => any;
  /** Handles a request to update search options but not perform the search. */
  updateSearchOptions?: (x0: { searchOptions: SearchOptionV2[] }) => any;
  /** getInitialValues gets values to default to for omni-search. */
  getInitialValues?: (searchDefs: OmniSearchDef[]) => OmniSearchValues;
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
export const OmniSearchBar: React.FC<Props> = props => {
  const {
    searchDefs,
    children,
    location,
    history,
    getInitialValues,
    setSearchOptions,
    updateSearchOptions,
    omniSearchCommands,
    setOmniSearchCommands,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [omniText, setOmniText] = useState("");
  const [searchValues, setSearchValues] = useState(new Map());

  const lastSearchedValues = useRef(null);
  const [deferredSearchOptions, setDeferredSearchOptions] = useState(null);

  const mergeOmniWithLocalStorage = useCallback(
    (omniText: string): string => {
      try {
        const searchValues = getSearchValuesFromOmniText(searchDefs, omniText);
        const storageValues = getValuesFromLocalStorage(
          location ? location.pathname : "",
          searchDefs,
        );
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
        setError(error.message);
        return "";
      }
    },
    [location, searchDefs],
  );

  const mergeOmniWithInitialValues = useCallback(
    (omniText: string): string => {
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
        setError(error.message);
        return "";
      }
    },
    [getInitialValues, searchDefs],
  );

  const normalizeOmniText = useCallback(() => {
    let omniText = getQuery({ location })[OMNI_KEY] || "";

    if (!omniText) {
      omniText = mergeOmniWithLocalStorage(omniText);
    }
    if (getInitialValues) {
      omniText = mergeOmniWithInitialValues(omniText);
    }
    return omniText;
  }, [
    getInitialValues,
    location,
    mergeOmniWithInitialValues,
    mergeOmniWithLocalStorage,
  ]);

  const updateOmniText = useCallback(
    (omniText: string) => {
      try {
        const searchValues = getSearchValuesFromOmniText(searchDefs, omniText);
        setValuesToLocalStorage(
          location ? location.pathname : "",
          searchDefs,
          searchValues,
        );
        if (updateSearchOptions) {
          updateSearchOptions({
            searchOptions: getSearchOptions(searchDefs, searchValues),
          });
        }
        setOmniText(omniText);
        setSearchValues(searchValues);
        setError("");
      } catch (error) {
        if (error.name !== OMNI_ERROR) {
          console.error(error);
        }
        setError(error.message);
        setOmniText(omniText);
      }
    },
    [location, searchDefs, updateSearchOptions],
  );

  const updateOmniUrl = useCallback(
    (shouldUpdateBrowserHistory = false) => {
      updateQuery(
        { location, history },
        { [OMNI_KEY]: omniText },
        {
          shouldUpdateBrowserHistory,
        },
      );
    },
    [history, location, omniText],
  );

  const onSearch = useCallback(
    options => {
      const {
        shouldUpdateBrowserHistory = false,
        isUserSearchAction = false,
      } = options;
      if (isEqual(searchValues, lastSearchedValues.current)) {
        return;
      }
      lastSearchedValues.current = searchValues;
      const newSearchOptions = {
        searchOptions: getSearchOptions(searchDefs, searchValues),
        isUserSearchAction,
      };
      setSearchOptions(newSearchOptions);
      updateOmniUrl(shouldUpdateBrowserHistory);
      if (isUserSearchAction) {
        setIsOpen(false);
      }
    },
    [searchDefs, searchValues, setSearchOptions, updateOmniUrl],
  );

  const onChange = useCallback(
    async (id, value) => {
      let omniText = value;
      if (id !== OMNI_INPUT_FIELD_ID) {
        const index = searchDefs.findIndex(({ name }) => name === id);
        if (index === -1) {
          return;
        }

        omniText = getOmniTextFromSearchValues(
          searchDefs,
          new Map(searchValues).set(index, value),
        );
      }
      return updateOmniText(omniText);
    },
    [searchDefs, searchValues, updateOmniText],
  );

  useEffect(() => {
    if (deferredSearchOptions) {
      onSearch(deferredSearchOptions);
      setDeferredSearchOptions(null);
    }
  }, [onSearch, deferredSearchOptions, setDeferredSearchOptions]);

  useEffect(() => {
    const normalizedOmniText = normalizeOmniText();
    updateOmniText(normalizedOmniText);
    setDeferredSearchOptions({
      shouldUpdateBrowserHistory: false,
      isUserSearchAction: false,
    });
  }, [normalizeOmniText, searchDefs, updateOmniText]);

  useEffect(() => {
    const onOmniSearchCommandChange = async () => {
      if (omniSearchCommands && omniSearchCommands.length) {
        const promises = omniSearchCommands.map(
          async ({ command, omniFieldName, omniValues = [] }) => {
            if (command === SET_OMNI_FIELD_COMMAND) {
              onChange(omniFieldName, omniValues.join(","));
            }
          },
        );
        await Promise.all(promises);
        setOmniSearchCommands && setOmniSearchCommands([]);
        setDeferredSearchOptions({
          shouldUpdateBrowserHistory: true,
          isUserSearchAction: true,
        });
      }
    };
    onOmniSearchCommandChange();
  }, [omniSearchCommands, onChange, onSearch, setOmniSearchCommands]);

  const handleClear = async () => {
    updateOmniText("");
    setSearchOptions({
      searchOptions: getSearchOptions(searchDefs, new Map()),
      isUserSearchAction: true,
    });
  };

  return (
    <>
      {isOpen && (
        <div
          id={`${OMNI_KEY}-clickaway`}
          className={styles.clickAwayLayer}
          onClick={() => setIsOpen(isOpen => !isOpen)}
        />
      )}
      <div className={styles.omniBar}>
        <OmniField
          omniText={omniText}
          onChange={onChange}
          onSearch={() => {
            onSearch({
              shouldUpdateBrowserHistory: true,
              isUserSearchAction: true,
            });
          }}
          onClear={handleClear}
          error={error}
          isOpen={isOpen}
          setOmniIsOpen={setIsOpen}
          defaultField={searchDefs[0].name.toLowerCase()}
        />
        {isOpen && (
          <OmniDialog
            searchDefs={searchDefs}
            searchValues={searchValues}
            onSearch={() => {
              onSearch({
                shouldUpdateBrowserHistory: true,
                isUserSearchAction: true,
              });
              setIsOpen(false);
            }}
            onChange={onChange}
            onClear={() => updateOmniText("")}
            setIsOpen={setIsOpen}
          >
            {children}
          </OmniDialog>
        )}
      </div>
    </>
  );
};
