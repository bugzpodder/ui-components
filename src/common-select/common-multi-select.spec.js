// @flow
import "jest-dom/extend-expect";
import React, { useState } from "react";
import { COUNTRIES, TestWrapper } from "../test-utils";
import { CommonMultiSelect } from ".";
import { cleanup, fireEvent, render } from "@testing-library/react";

afterEach(cleanup);

const TestMultiSelect = props => {
  const { mockOnChange } = props;
  const [values, setValues] = useState([
    { label: "Algeria", value: "ALGERIA" },
    { label: "Afghanistan", value: "AFGHANISTAN" },
  ]);
  const setChange = values => {
    mockOnChange(values);
    setValues(values);
  };
  return (
    <TestWrapper>
      <CommonMultiSelect
        options={COUNTRIES}
        values={values}
        onChange={setChange}
      />
    </TestWrapper>
  );
};

test("render CommonMultiSelect with preloaded values and clear one value", () => {
  const mockOnChange = jest.fn(result => result);
  const { container, getByTestId } = render(<TestMultiSelect mockOnChange={mockOnChange} />);
  expect(container).toMatchSnapshot();
  fireEvent.click(getByTestId("remove-ALGERIA"));
  expect(mockOnChange.mock.results[0].value).toEqual([{ label: "Afghanistan", value: "AFGHANISTAN" }]);
  fireEvent.click(getByTestId("remove-AFGHANISTAN"));
  expect(mockOnChange.mock.results[1].value).toEqual([]);
});
