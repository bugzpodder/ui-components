import React from "react";
import { SpinnerOverlay } from ".";
import { TestWrapper } from "../test-utils";
import { cleanup, fireEvent, render } from "@testing-library/react";

afterEach(cleanup);

test("render active spinner overlay", () => {
  const { container, getByTestId } = render(
    <TestWrapper>
      <SpinnerOverlay />
    </TestWrapper>,
  );
  // TODO(nsawas): find a way to check preventDefault / stopPropogation.
  fireEvent.click(getByTestId("spinner-overlay"));
  fireEvent.mouseDown(getByTestId("spinner-overlay"));
  expect(getByTestId("spinner-overlay")).toHaveAttribute(
    "data-is-active",
    "true",
  );
  expect(container).toMatchSnapshot();
});

test("render inactive spinner overlay", () => {
  const { container, getByTestId } = render(
    <TestWrapper>
      <SpinnerOverlay isActive={false} />
    </TestWrapper>,
  );
  expect(getByTestId("spinner-overlay")).toHaveAttribute(
    "data-is-active",
    "false",
  );
  expect(container).toMatchSnapshot();
});
