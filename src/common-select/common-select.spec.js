// @flow
import "jest-dom/extend-expect";
import React from "react";
import mockConsole from "jest-mock-console";
import { COUNTRIES, TestWrapper } from "../test-utils";
import { CommonMultiSelect, CommonSelect } from "./index";
import { bindElementToQueries } from "dom-testing-library";
import { cleanup, fireEvent, render } from "react-testing-library";

afterEach(cleanup);
const bodyUtils = bindElementToQueries(document.body);

test("render and test CommonSelect", () => {
  const mockOnChange = jest.fn(result => result);
  const expectedResult = { label: "Algeria", value: "ALGERIA" };
  const { container, getByTestId } = render(
    <TestWrapper>
      <CommonSelect
        menuIsOpen
        options={COUNTRIES}
        id="test"
        helperText="some helper text"
        formatOption={datum => (
          <div>
            <div>{datum.label}</div>
            <div>{datum.value}</div>
          </div>
        )}
        onChange={mockOnChange}
      />
    </TestWrapper>,
  );
  fireEvent.click(bodyUtils.getByText("Algeria"));
  expect(mockOnChange.mock.results[0].value).toEqual(expectedResult);
  COUNTRIES.forEach(country => {
    expect(getByTestId(country.value)).toBeInTheDocument();
  });
  expect(getByTestId("test-select-helper-text")).toBeInTheDocument();
  expect(getByTestId("test-select-helper-text")).toHaveTextContent("some helper text");
  expect(container).toMatchSnapshot();
});

test("test preload and clear single value", () => {
  const mockOnChange = jest.fn(result => result);
  const value = { label: "Algeria", value: "ALGERIA" };
  const { container } = render(
    <TestWrapper>
      <CommonSelect
        menuIsOpen
        options={COUNTRIES}
        value={value}
        onChange={mockOnChange}
      />
    </TestWrapper>,
  );
  fireEvent.keyDown(bodyUtils.getByTestId("clear-icon"), {
    key: "Backspace",
    keyCode: 8,
    which: 8,
  });
  expect(mockOnChange.mock.results[0].value).toEqual({});
  expect(container).toMatchSnapshot();
});

test("test disabled CommonSelect", () => {
  const mockOnChange = jest.fn();
  const { container, getByTestId } = render(
    <TestWrapper>
      <CommonSelect
        isDisabled
        helperText="select is disabled"
        options={COUNTRIES}
        onChange={mockOnChange}
      />
    </TestWrapper>,
  );
  expect(getByTestId("select-helper-text")).toBeInTheDocument();
  expect(getByTestId("select-helper-text")).toHaveTextContent("select is disabled");
  expect(container).toMatchSnapshot();
});

test("render creatable CommonSelect", () => {
  const mockOnChange = jest.fn();
  const { container } = render(
    <TestWrapper>
      <CommonSelect
        selectType="creatable"
        options={COUNTRIES}
        onChange={mockOnChange}
      />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});

test("render async CommonSelect with default initial message", () => {
  const mockOnChange = jest.fn();
  const filterCountries = inputValue => {
    return new Promise(resolve => {
      const newCountries = COUNTRIES.filter(country =>
        country.label.toLowerCase().includes(inputValue.toLowerCase()),
      ).slice(0, 5);
      setTimeout(() => resolve(newCountries), 500);
    });
  };
  const { container, getByTestId } = render(
    <TestWrapper>
      <CommonSelect
        menuIsOpen
        selectType="async"
        loadOptions={filterCountries}
        onChange={mockOnChange}
      />
    </TestWrapper>,
  );
  expect(getByTestId("no-options-message")).toBeInTheDocument();
  expect(getByTestId("no-options-message")).toHaveTextContent("Begin Typing...");
  expect(container).toMatchSnapshot();
});

test("render async CommonSelect with custom initial message", () => {
  const mockOnChange = jest.fn();
  const mockLoadOptions = jest.fn();
  const { container, getByTestId } = render(
    <TestWrapper>
      <CommonSelect
        menuIsOpen
        selectType="async"
        initialMessage="test custom message"
        loadOptions={mockLoadOptions}
        onChange={mockOnChange}
      />
    </TestWrapper>,
  );
  expect(getByTestId("no-options-message")).toBeInTheDocument();
  expect(getByTestId("no-options-message")).toHaveTextContent("test custom message");
  expect(container).toMatchSnapshot();
});

test("render async CommonSelect initial message does not display with input value", () => {
  const mockOnChange = jest.fn();
  const filterCountries = inputValue => {
    return new Promise(resolve => {
      const newCountries = COUNTRIES.filter(country =>
        country.label.toLowerCase().includes(inputValue.toLowerCase()),
      ).slice(0, 5);
      setTimeout(() => resolve(newCountries), 500);
    });
  };
  const { container, getByTestId } = render(
    <TestWrapper>
      <CommonSelect
        menuIsOpen
        selectType="async"
        inputValue="test"
        initialMessage="test custom message"
        loadOptions={filterCountries}
        onChange={mockOnChange}
      />
    </TestWrapper>,
  );
  expect(getByTestId("no-options-message")).toBeInTheDocument();
  expect(getByTestId("no-options-message")).toHaveTextContent("No results found");
  expect(container).toMatchSnapshot();
});

test("render CommonMultiSelect with preloaded values and clear one value", () => {
  const mockOnChange = jest.fn(result => result);
  const values = [{ label: "Algeria", value: "ALGERIA" }, { label: "Afghanistan", value: "AFGHANISTAN" }];
  const { container } = render(
    <TestWrapper>
      <CommonMultiSelect
        options={COUNTRIES}
        values={values}
        onChange={mockOnChange}
      />
    </TestWrapper>,
  );
  fireEvent.click(bodyUtils.getByTestId("remove-ALGERIA"));
  expect(mockOnChange.mock.results[0].value).toEqual([{ label: "Afghanistan", value: "AFGHANISTAN" }]);
  expect(container).toMatchSnapshot();
});

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
