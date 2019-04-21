// @flow
import "jest-dom/extend-expect";
import React from "react";
import { CommonDialog } from ".";
import { TestWrapper } from "../test-utils";
import { cleanup, fireEvent, render } from "react-testing-library";

afterEach(cleanup);

test("render dialog", () => {
  const mockHide = jest.fn(result => result);
  const mockActionOne = jest.fn(result => result);
  const { container, getByText, getByTestId } = render(
    <TestWrapper>
      <CommonDialog
        isVisible
        actions={[
          { id: "action-button", name: "action one", callback: mockActionOne },
          { name: "action two", isLeftButton: true, callback: jest.fn() },
        ]}
        title="test"
        hideModal={mockHide}
      >
        Test Content
      </CommonDialog>
    </TestWrapper>,
  );
  expect(getByTestId("dialog-title")).toHaveTextContent("test");
  expect(getByTestId("dialog-content")).toHaveTextContent("Test Content");
  fireEvent.click(getByText("action one"));
  expect(mockActionOne).toBeCalled();
  fireEvent.click(getByText("Close"));
  expect(mockHide).toBeCalled();
  // TODO(nsawas): Find out why snapshots are empty.
  expect(container).toMatchSnapshot();
});

test("dialog classes", () => {
  const { getByTestId } = render(
    <TestWrapper>
      <CommonDialog
        isVisible
        title=""
        actions={[]}
        enableOverflow={false}
        hideModal={() => {}}
        classes={{
          root: "test-root",
          paper: "test-paper",
          title: "test-title",
          content: "test-content",
          actions: "test-actions",
        }}
      >
        Test Content
      </CommonDialog>
    </TestWrapper>,
  );

  expect(getByTestId("dialog")).toHaveClass("test-root");
  expect(getByTestId("dialog-paper")).toHaveClass("test-paper");
  expect(getByTestId("dialog-title")).toHaveClass("test-title");
  expect(getByTestId("dialog-content")).toHaveClass("test-content");
  expect(getByTestId("dialog-actions")).toHaveClass("test-actions");
  expect(getByTestId("dialog-content")).toHaveClass("commonDialogNoOverflow");
});
