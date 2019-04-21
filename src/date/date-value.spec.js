// @flow
import "jest-dom/extend-expect";
import React from "react";
import { DateTimeValue, DateValue, HumanizedDateTime } from ".";
import { TestWrapper } from "../test-utils";
import { cleanup, render } from "react-testing-library";

afterEach(cleanup);

test("render DateTimeValue", async () => {
  const { container, getByTestId, rerender } = render(
    <TestWrapper>
      <DateTimeValue value="2017-03-13" />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
  expect(getByTestId("date-time-value")).toHaveTextContent("2017-03-13 00:00:00");
  rerender(<DateTimeValue />);
  expect(getByTestId("date-time-value")).not.toBeEmpty();
  expect(getByTestId("date-time-value")).toHaveTextContent("-");
});

test("render DateTimeValue", async () => {
  const { container, getByTestId, rerender } = render(
    <TestWrapper>
      <DateValue value="2017-03-13" />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
  expect(getByTestId("date-value")).toHaveTextContent("2017-03-13");
  rerender(<DateValue />);
  expect(getByTestId("date-value")).not.toBeEmpty();
  expect(getByTestId("date-value")).toHaveTextContent("-");
});

test("render HumanizedDateTime", async () => {
  const { container, getByTestId } = render(
    <TestWrapper>
      <HumanizedDateTime />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
  expect(getByTestId("date-time-value")).not.toBeEmpty();
  expect(getByTestId("date-time-value")).toHaveTextContent("-");
  expect(getByTestId("humanized")).not.toBeEmpty();
  expect(getByTestId("humanized")).toHaveTextContent("a few seconds ago");
});
