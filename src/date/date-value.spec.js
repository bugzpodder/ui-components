// @flow
import "jest-dom/extend-expect";
import React from "react";
import { DateValue } from ".";
import { TestWrapper } from "../test-utils";
import { cleanup, render } from "react-testing-library";

afterEach(cleanup);

test("render date value with no date", async () => {
  const { container, getByTestId } = render(
    <TestWrapper>
      <DateValue />
    </TestWrapper>,
  );
  expect(getByTestId("date-value")).toHaveTextContent("-");
  expect(container).toMatchSnapshot();
});

test("render date value with date", async () => {
  const { container, getByTestId } = render(
    <TestWrapper>
      <DateValue value="2017-03-13" />
    </TestWrapper>,
  );
  expect(getByTestId("date-value")).toHaveTextContent("2017-03-13");
  expect(container).toMatchSnapshot();
});
