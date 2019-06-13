// @flow
import "jest-dom/extend-expect";
import React, { useState } from "react";
import mockConsole from "jest-mock-console";
import { COUNTRIES, TestWrapper } from "../test-utils";
import { CommonSelect } from ".";
import { cleanup, fireEvent, render } from "@testing-library/react";

afterEach(cleanup);

/** ******* Sync ******* */

const TestCommonSelect = props => {
  const {
    mockOnChange, "data-testid": dataTestId, classes, label,
  } = props;
  const [value, setValue] = useState({});
  const setChange = value => {
    mockOnChange(value);
    setValue(value);
  };
  return (
    <TestWrapper>
      <CommonSelect
        menuIsOpen
        data-testid={dataTestId}
        classes={classes}
        label={label}
        options={COUNTRIES}
        id="test"
        helperText="some helper text"
        value={value}
        formatOption={datum => (
          <div>
            <div>{datum.label}</div>
            <div>{datum.value}</div>
          </div>
        )}
        onChange={setChange}
      />
    </TestWrapper>
  );
};

test("render and test CommonSelect", () => {
  const mockOnChange = jest.fn(result => result);
  const { container, getByText, getByTestId } = render(<TestCommonSelect mockOnChange={mockOnChange} />);
  // Check document.
  expect(container).toMatchSnapshot();
  COUNTRIES.forEach(country => {
    expect(getByTestId(country.value)).toBeInTheDocument();
  });
  expect(getByTestId("test-select-helper-text")).toBeInTheDocument();
  expect(getByTestId("test-select-helper-text")).toHaveTextContent("some helper text");

  // Select an item.
  const expectedResult = { label: "Algeria", value: "ALGERIA" };
  fireEvent.click(getByText("Algeria"));
  expect(mockOnChange).toHaveBeenCalledTimes(1);
  expect(mockOnChange.mock.results[0].value).toEqual(expectedResult);
  // TODO(nsawas): Check input value here and after.

  // Remove item.
  fireEvent.keyDown(getByTestId("clear-icon"), {
    key: "Backspace",
    keyCode: 8,
    which: 8,
  });
  expect(mockOnChange).toHaveBeenCalledTimes(2);
  expect(mockOnChange.mock.results[1].value).toEqual({});
});

test("CommonSelect classes", () => {
  const { getByTestId } = render(
    <TestCommonSelect
      data-testid="test-input"
      classes={{
        root: "test-root",
        input: "test-input",
        options: "test-options",
      }}
    />,
  );
  expect(getByTestId("common-select")).toHaveClass("test-root");
  expect(getByTestId("test-input")).toHaveClass("test-input");
  expect(getByTestId("ALGERIA")).toHaveClass("test-options");
});

test("CommonSelect label", () => {
  const label = "Country";
  const { container, getByTestId } = render(<TestCommonSelect label={label} />);
  // Check document.
  expect(container).toMatchSnapshot();
  expect(getByTestId("common-select-input-label")).toHaveTextContent(label);
});

test("test disabled CommonSelect", () => {
  const mockOnChange = jest.fn();
  const { container } = render(
    <TestWrapper>
      <CommonSelect
        isDisabled
        options={COUNTRIES}
        onChange={mockOnChange}
        helperText="disabled"
      />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
  // TODO(nsawas): Test that input has attribute disabled="", and that mockOnChange does not get called.
});

/** ******** Creatable ****** */

test("render creatable CommonSelect", () => {
  const mockOnChange = jest.fn();
  const { container } = render(
    <TestWrapper>
      <CommonSelect
        menuIsOpen
        selectType="creatable"
        inputValue="test"
        onChange={mockOnChange}
      />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
  // TODO(nsawas): Test creatable functionality.
});

/** ******* Async ******* */

const TestAsyncCommonSelect = props => {
  const { value, inputValue, initialMessage } = props;
  const filterCountries = inputValue => {
    return new Promise(resolve => {
      const newCountries = COUNTRIES.filter(country =>
        country.label.toLowerCase().includes(inputValue.toLowerCase()),
      ).slice(0, 5);
      setTimeout(() => resolve(newCountries), 500);
    });
  };
  return (
    <TestWrapper>
      <CommonSelect
        menuIsOpen
        selectType="async"
        value={value}
        inputValue={inputValue}
        initialMessage={initialMessage}
        loadOptions={filterCountries}
        onChange={() => {}}
      />
    </TestWrapper>
  );
};

test("async CommonSelect with initial and no options messages", () => {
  const { container, getByTestId, rerender } = render(<TestAsyncCommonSelect />);
  expect(getByTestId("no-options-message")).toBeInTheDocument();
  expect(getByTestId("no-options-message")).toHaveTextContent("Begin Typing...");
  rerender(<TestAsyncCommonSelect initialMessage="test custom message" />);
  expect(getByTestId("no-options-message")).toHaveTextContent("test custom message");
  rerender(<TestAsyncCommonSelect inputValue="test" />);
  expect(getByTestId("no-options-message")).toHaveTextContent("No results found");
  expect(container).toMatchSnapshot();
});

/** ******* Read-Only ******* */

const TestReadOnlyCommonSelect = props => {
  const { value, mockOnChange } = props;
  return (
    <TestWrapper>
      <CommonSelect
        readOnly
        options={COUNTRIES}
        value={value}
        onChange={mockOnChange}
      />
    </TestWrapper>
  );
};

test("render read-only CommonSelect with value", () => {
  const mockOnChange = jest.fn();
  const value = { label: "Algeria", value: "ALGERIA" };
  const {
    container, getByTestId, queryByTestId, rerender,
  } = render(
    <TestReadOnlyCommonSelect
      value={value}
      mockOnChange={mockOnChange}
    />,
  );
  expect(container).toMatchSnapshot();
  expect(queryByTestId("common-select")).not.toBeInTheDocument();
  expect(getByTestId("readonly-text-field")).toBeInTheDocument();
  expect(getByTestId("readonly-text-field")).toHaveTextContent("Algeria");
  rerender(<TestReadOnlyCommonSelect
    value={{}}
    mockOnChange={mockOnChange}
  />);
  expect(getByTestId("readonly-text-field")).toHaveTextContent("-");
});

/** ******* Fail Cases ******* */

test("throw options error", () => {
  mockConsole();
  expect(() => render(<CommonSelect />)).toThrowError();
  expect(console.error).toHaveBeenCalled();
});

test("throw loadOptions error", () => {
  mockConsole();
  expect(() => render(<CommonSelect selectType="async" />)).toThrowError();
  expect(console.error).toHaveBeenCalled();
});
