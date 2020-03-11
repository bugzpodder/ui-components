import React, { useState } from "react";
import { COUNTRIES, TestWrapper } from "../test-utils";
import { CommonMultiSelect } from ".";
import { cleanup, fireEvent, render } from "@testing-library/react";

afterEach(cleanup);

type Props = {
  mockOnChange?: Function;
} & Partial<React.ComponentProps<typeof CommonMultiSelect>>;

const TestMultiSelect = (props: Props) => {
  const { mockOnChange, label, margin, variant } = props;
  const [values, setValues] = useState([
    { label: "Algeria", value: "ALGERIA" },
    { label: "Afghanistan", value: "AFGHANISTAN" },
  ]);
  const setChange = (values): void => {
    mockOnChange(values);
    setValues(values);
  };
  return (
    <TestWrapper>
      <CommonMultiSelect
        options={COUNTRIES}
        label={label}
        values={values}
        onChange={setChange}
        margin={margin}
        variant={variant}
        id={label}
      />
    </TestWrapper>
  );
};

test("render CommonMultiSelect with preloaded values and clear one value", () => {
  const mockOnChange = jest.fn(result => result);
  const { container, getAllByRole } = render(
    <TestMultiSelect mockOnChange={mockOnChange} />,
  );
  expect(container).toMatchSnapshot();
  fireEvent.click(getAllByRole("presentation", { hidden: true })[0]);
  expect(mockOnChange.mock.results[0].value).toEqual([
    { label: "Afghanistan", value: "AFGHANISTAN" },
  ]);
  fireEvent.click(getAllByRole("presentation", { hidden: true })[0]);
  expect(mockOnChange.mock.results[1].value).toEqual([]);
});

test("CommonMultiSelect label", () => {
  const label = "Countries";
  const { getByTestId } = render(<TestMultiSelect label={label} />);
  // TODO (nsawas): adding a label causes indeterminate for attribute on label.
  // expect(container).toMatchSnapshot();
  expect(getByTestId("common-select-input-label")).toHaveTextContent(label);
});

test("CommonMultiSelect variant", () => {
  const { container } = render(<TestMultiSelect variant="filled" />);
  // Check document.
  expect(container).toMatchSnapshot();
});

test("CommonMultiSelect margin", () => {
  const { container } = render(<TestMultiSelect margin="normal" />);
  // Check document.
  expect(container).toMatchSnapshot();
});
