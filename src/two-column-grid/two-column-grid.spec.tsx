import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { TestWrapper } from "../test-utils";
import { TwoColumnGrid } from ".";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

test("render two column grid", () => {
  const rows = [
    {
      label: "Test Label 1",
      value: "Test Value 1",
    },
    {
      label: 1,
      value: "Test Value 1",
    },
  ];
  const { container, getByTestId } = render(
    <TestWrapper>
      <div>
        <TwoColumnGrid rows={rows} />
      </div>
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
  expect(getByTestId("test-label-1-label")).toHaveTextContent("Test Label 1");
  expect(getByTestId("test-label-1-value")).toHaveTextContent("Test Value 1");
});

test("render two column grid", () => {
  const rows = [
    {
      label: "Test Label 1",
      value: "Test Value 1",
    },
    {
      label: 1,
      value: "Test Value 1",
    },
  ];
  const { container, getByTestId } = render(
    <TestWrapper>
      <div>
        <TwoColumnGrid textAlign={[null, "right"]} rows={rows} />
      </div>
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
  expect(getByTestId("test-label-1-label")).toHaveTextContent("Test Label 1");
  expect(getByTestId("test-label-1-value")).toHaveTextContent("Test Value 1");
});

test("render two column grid", () => {
  const rows = [
    {
      label: "Test Label 1",
      value: "Test Value 1",
    },
    {
      label: 1,
      value: "Test Value 1",
    },
  ];
  const { container, getByTestId } = render(
    <TestWrapper>
      <div>
        <TwoColumnGrid textAlign={["left", null]} rows={rows} />
      </div>
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
  expect(getByTestId("test-label-1-label")).toHaveTextContent("Test Label 1");
  expect(getByTestId("test-label-1-value")).toHaveTextContent("Test Value 1");
});
