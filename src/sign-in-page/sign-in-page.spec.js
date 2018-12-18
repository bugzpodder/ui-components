// @flow
import "jest-dom/extend-expect";
import React from "react";
import { SignInPage } from "./index";
import { TestWrapper } from "../utils";
import { cleanup, fireEvent, render } from "react-testing-library";

afterEach(cleanup);

test("render selector", async () => {
  const mockOnSignIn = jest.fn(() => {});
  const { container, getByTestId } = render(
    <TestWrapper>
      <SignInPage onSignIn={mockOnSignIn} />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
  fireEvent.click(getByTestId("sign-in-button"));
  expect(mockOnSignIn).toBeCalled();
});

test("render selector with child", async () => {
  const mockOnSignIn = jest.fn(() => {});
  const { container, getByTestId } = render(
    <TestWrapper>
      <SignInPage onSignIn={mockOnSignIn}>
        <div data-testid="test-child-element" />
      </SignInPage>
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
  expect(getByTestId("test-child-element")).toBeInTheDocument();
});
