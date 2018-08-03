// @flow
import React from "react";
import { render, fireEvent } from "react-testing-library";
import Button from "@material-ui/core/Button";
import "jest-dom/extend-expect";
import { TestWrapper } from "../utils";
import { SpinnerOverlay } from "./index";

test("render active spinner overlay", () => {
  const mockCallback = jest.fn();
  const { container, getByTestId } = render(
    <TestWrapper>
      <div>
        <Button onClick={mockCallback}>Active Spinner Test</Button>
        <SpinnerOverlay />
      </div>
    </TestWrapper>,
  );
  // TODO (jzhao/jsingh): jest does not recognize the overlay on the button and
  // simulating a click on the button here still works...
  // fireEvent.click(getByText("Active Spinner Test"));
  // expect(mockCallback).not.toHaveBeenCalled();
  fireEvent.click(getByTestId("spinner-overlay"));
  expect(container).toMatchSnapshot();
});

test("render inactive spinner overlay", () => {
  const mockCallback = jest.fn();
  const { container, getByText } = render(
    <TestWrapper>
      <div>
        <Button onClick={mockCallback}>Inactive Spinner Test</Button>
        <SpinnerOverlay isActive={false} />
      </div>
    </TestWrapper>,
  );
  fireEvent.click(getByText("Inactive Spinner Test"));
  expect(mockCallback).toHaveBeenCalled();
  expect(container).toMatchSnapshot();
});
