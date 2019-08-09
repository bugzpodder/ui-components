// @flow
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { Alert } from "../index";
import { AvatarIcon } from ".";
import { TestWrapper } from "../test-utils";
import { cleanup, fireEvent, render } from "@testing-library/react";

afterEach(cleanup);

test("render avatar with menu", () => {
  const mockMenuOpen = jest.fn(result => result);
  const mockItemClick = jest.fn(result => result);
  const menuItems = [
    {
      content: "Test Item",
      onClick: mockItemClick,
    },
  ];
  const { container, getByTestId } = render(
    <TestWrapper>
      <AvatarIcon
        isMenuOpen
        id="avatar-icon-button"
        menuItems={menuItems}
        onClick={mockMenuOpen}
        classes={{
          root: "test-root",
          button: "test-button",
          avatar: "test-avatar",
          menu: "test-menu",
        }}
      />
      <Alert message="test" />
    </TestWrapper>,
  );

  // TODO(nsawas): Figure out how to test onClose().
  expect(getByTestId("avatar-icon-button-avatar-menu")).toBeInTheDocument();
  expect(getByTestId("avatar-menu-item-0")).toBeInTheDocument();
  fireEvent.click(getByTestId("avatar-icon-button"));
  expect(mockMenuOpen).toHaveBeenCalledTimes(1);
  expect(mockMenuOpen.mock.results[0].value).toEqual(false);
  fireEvent.click(getByTestId("avatar-menu-item-0"));
  expect(mockItemClick).toHaveBeenCalledTimes(1);
  expect(container).toMatchSnapshot();

  // Test classes.
  expect(getByTestId("avatar-icon")).toBeInTheDocument();
  expect(getByTestId("avatar-icon")).toHaveClass("test-root");
  expect(getByTestId("avatar-icon-button")).toHaveClass("test-button");
  expect(getByTestId("avatar-icon-avatar")).toHaveClass("test-avatar");
  expect(getByTestId("avatar-icon-button-avatar-menu")).toHaveClass("test-menu");
});
