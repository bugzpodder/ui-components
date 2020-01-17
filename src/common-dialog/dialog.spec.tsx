import React from "react";
import { CommonDialog } from ".";
import { TestWrapper } from "../test-utils";
import { cleanup, fireEvent, render } from "@testing-library/react";

afterEach(cleanup);

const TestCommonDialog: React.FC<any> = props => {
  const { mockHide, classes, title, actions } = props;
  return (
    <TestWrapper>
      <CommonDialog
        isVisible
        actions={actions}
        title={title}
        hideModal={mockHide}
        classes={classes}
      >
        Test Content
      </CommonDialog>
    </TestWrapper>
  );
};

test("render dialog", () => {
  const mockHide = jest.fn(result => result);
  const mockActionOne = jest.fn(result => result);
  const { container, getByText, getByTestId } = render(
    <TestCommonDialog
      title="test"
      actions={[
        { id: "action-button", name: "action one", callback: mockActionOne },
        { name: "action two", isLeftButton: true, callback: jest.fn() },
      ]}
      mockHide={mockHide}
    />,
  );

  // Check content.
  expect(getByTestId("dialog-title")).toHaveTextContent("test");
  expect(getByTestId("dialog-content")).toHaveTextContent("Test Content");

  // Check default classes
  expect(getByTestId("dialog-content")).toHaveClass("commonDialogNoOverflow");

  // Check callbacks.
  fireEvent.click(getByText("action one"));
  expect(mockActionOne).toBeCalled();
  fireEvent.click(getByText("Close"));
  expect(mockHide).toBeCalled();

  // TODO(nsawas): Find out why snapshots are empty.
  expect(container).toMatchSnapshot();
});

test("dialog classes", () => {
  const { getByTestId } = render(
    <TestCommonDialog
      title=""
      actions={[]}
      classes={{
        root: "test-root",
        paper: "test-paper",
        title: "test-title",
        content: "test-content",
        container: "test-container",
        actions: "test-actions",
      }}
    />,
  );

  expect(getByTestId("dialog")).toHaveClass("test-root");
  expect(getByTestId("dialog-paper")).toHaveClass("test-paper");
  expect(getByTestId("dialog-title")).toHaveClass("test-title");
  expect(getByTestId("dialog-content")).toHaveClass("test-content");
  expect(
    getByTestId("dialog").querySelector(".test-container"),
  ).toBeInTheDocument();
  expect(getByTestId("dialog-actions")).toHaveClass("test-actions");
  expect(getByTestId("dialog-content")).toHaveClass("commonDialogNoOverflow");
});
