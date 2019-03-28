// @flow
import React from "react";
import { CommonSwitch } from "./common-switch";
import { TestWrapper } from "../test-utils";
import { bindElementToQueries } from "dom-testing-library";
import { cleanup, fireEvent, render } from "react-testing-library";

afterEach(cleanup);
const bodyUtils = bindElementToQueries(document.body);

test("render primary common switch", () => {
  const mockChange = jest.fn(result => result);
  const { container } = render(
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
  // TODO(nsawas): find out why this calls onChange twice.
  fireEvent.click(bodyUtils.getByTestId("common-switch"));
  expect(mockChange.mock.results[0].value).toEqual(true);
  expect(container).toMatchSnapshot();
});

test("render secondary common switch", () => {
  const mockChange = jest.fn(result => result);
  const { container } = render(
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
  // TODO(nsawas): find out why this calls onChange twice.
  fireEvent.click(bodyUtils.getByTestId("common-switch"));
  expect(mockChange.mock.results[0].value).toEqual(false);
  expect(container).toMatchSnapshot();
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
