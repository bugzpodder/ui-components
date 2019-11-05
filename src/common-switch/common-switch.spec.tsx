import React from "react";
import { CommonSwitch } from "./common-switch";
import { TestWrapper } from "../test-utils";
import { cleanup, fireEvent, render } from "@testing-library/react";

afterEach(cleanup);

test("render primary common switch", () => {
  const mockChange = jest.fn(result => result);
  const { container, getByTestId } = render(
    <TestWrapper>
      <div>
        <CommonSwitch
          label="Primary"
          helperText="test switch"
          value="test"
          onChange={mockChange}
        />
      </div>
    </TestWrapper>,
  );
  fireEvent.click(getByTestId("common-switch"));
  expect(mockChange).toHaveBeenCalledTimes(1);
  expect(mockChange.mock.results[0].value).toEqual(true);
  fireEvent.click(getByTestId("common-switch"));
  expect(mockChange).toHaveBeenCalledTimes(2);
  expect(mockChange.mock.results[1].value).toEqual(false);
  expect(container).toMatchSnapshot();
});

test("render secondary common switch", () => {
  const mockChange = jest.fn(result => result);
  const { getByTestId } = render(
    <TestWrapper>
      <div>
        <CommonSwitch
          isEnabled
          isSelected
          color="secondary"
          onChange={mockChange}
        />
      </div>
    </TestWrapper>,
  );
  fireEvent.click(getByTestId("common-switch"));
  expect(mockChange).toHaveBeenCalledTimes(1);
  expect(mockChange.mock.results[0].value).toEqual(false);
});

test("render error common switch", () => {
  const mockChange = jest.fn(result => result);
  const { container } = render(
    <TestWrapper>
      <div>
        <CommonSwitch
          showError
          color="secondary"
          isSelected
          onChange={mockChange}
        />
      </div>
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
});
