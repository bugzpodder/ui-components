import React, { useState } from "react";
import mockConsole from "jest-mock-console";
import { COUNTRIES, TestWrapper } from "../test-utils";
import { CommonSelect } from ".";
import { CommonSelectOption } from "../types/select";
import { cleanup, fireEvent, render } from "@testing-library/react";

afterEach(cleanup);

/** ******* Sync ******* */

const TestCommonSelect = (props: any) => {
  const {
    mockOnChange,
    label,
    "data-testid": dataTestId,
    margin,
    variant,
  } = props;
  const [value, setValue] = useState<CommonSelectOption>({
    label: null,
    value: null,
  });
  const setChange = (value): void => {
    mockOnChange(value);
    setValue(value);
  };
  return (
    <TestWrapper>
      <CommonSelect
        label={label}
        data-testid={dataTestId}
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
        margin={margin}
        variant={variant}
      />
    </TestWrapper>
  );
};

test("render and test CommonSelect", () => {
  const mockOnChange = jest.fn(result => result);
  const { getByText, getByTestId } = render(
    <TestCommonSelect mockOnChange={mockOnChange} />,
  );
  fireEvent.click(getByTestId("common-select-input"));
  // Check document.
  // expect(container).toMatchSnapshot();
  COUNTRIES.forEach(country => {
    expect(getByTestId(country.value)).toBeInTheDocument();
  });
  expect(getByTestId("common-select-helper-text")).toBeInTheDocument();
  expect(getByTestId("common-select-helper-text")).toHaveTextContent(
    "some helper text",
  );

  // Select an item.
  const expectedResult = { label: "Algeria", value: "ALGERIA" };
  fireEvent.click(getByText("Algeria"));
  expect(mockOnChange).toHaveBeenCalledTimes(1);
  expect(mockOnChange.mock.results[0].value).toEqual(expectedResult);
  // TODO(nsawas): Check input value here and after.

  // Remove item.
  fireEvent.click(getByTestId("common-select-close-icon"));
  expect(mockOnChange).toHaveBeenCalledTimes(2);
  expect(mockOnChange.mock.results[1].value).toEqual({});
});

test("CommonSelect label", () => {
  const label = "Country";
  const { getByTestId } = render(<TestCommonSelect label={label} />);
  // TODO (yzhao): adding a label causes indeterminate for attribute on label.
  // expect(container).toMatchSnapshot();
  expect(getByTestId("common-select-input-label")).toHaveTextContent(label);
});

test("CommonSelect variant", () => {
  const { container } = render(<TestCommonSelect variant="filled" />);
  // Check document.
  expect(container).toMatchSnapshot();
});

test("CommonSelect margin", () => {
  const { container } = render(<TestCommonSelect margin="normal" />);
  // Check document.
  expect(container).toMatchSnapshot();
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

const TestAsyncCommonSelect = (props: any) => {
  const { value, inputValue, initialMessage } = props;
  const filterCountries = (inputValue): Promise<any[]> => {
    return new Promise(resolve => {
      const newCountries = COUNTRIES.filter(country =>
        inputValue
          ? country.label.toLowerCase().includes(inputValue.toLowerCase())
          : true,
      ).slice(0, 5);
      setTimeout(() => resolve(newCountries), 500);
    });
  };
  return (
    <TestWrapper>
      <CommonSelect
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
  const { getByTestId, rerender } = render(<TestAsyncCommonSelect />);
  fireEvent.click(getByTestId("common-select-input"));
  expect(getByTestId("common-select-no-options-message")).toBeInTheDocument();
  expect(getByTestId("common-select-no-options-message")).toHaveTextContent(
    "Begin Typing...",
  );
  rerender(<TestAsyncCommonSelect initialMessage="test custom message" />);
  fireEvent.click(getByTestId("common-select-input"));
  expect(getByTestId("common-select-no-options-message")).toHaveTextContent(
    "test custom message",
  );
  rerender(<TestAsyncCommonSelect inputValue="test" />);
  fireEvent.click(getByTestId("common-select-input"));
  expect(getByTestId("common-select-no-options-message")).toHaveTextContent(
    "No results found",
  );
  // TODO (yzhao): adding a label causes indeterminate aria-label attribute.
  // expect(container).toMatchSnapshot();
});

/** ******* Read-Only ******* */

const TestReadOnlyCommonSelect = (props: any) => {
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
  const { container, getByTestId, queryByTestId, rerender } = render(
    <TestReadOnlyCommonSelect value={value} mockOnChange={mockOnChange} />,
  );
  expect(container).toMatchSnapshot();
  expect(queryByTestId("common-select")).not.toBeInTheDocument();
  expect(getByTestId("readonly-text-field")).toBeInTheDocument();
  expect(getByTestId("readonly-text-field")).toHaveTextContent("Algeria");
  rerender(<TestReadOnlyCommonSelect value={{}} mockOnChange={mockOnChange} />);
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
