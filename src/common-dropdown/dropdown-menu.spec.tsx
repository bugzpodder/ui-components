import React, { useState } from "react";
import {
  ArrowDropDown as ArrowDropDownIcon,
  Close as CloseIcon,
  Done as DoneIcon,
} from "@material-ui/icons";
import { CommonDropdownMenu } from ".";
import { TestWrapper } from "../test-utils";
import { Typography } from "@material-ui/core";
import { cleanup, fireEvent, render } from "@testing-library/react";

afterEach(cleanup);

const TestCommonDropdownMenu = () => {
  const REVIEW_STATES = {
    APPROVED: "has been approved",
    DENIED: "has been denied",
    PENDING: "is pending approval",
  };
  const [approvalStatus, setApprovalStatus] = useState(REVIEW_STATES.PENDING);

  const buttonContent = (
    <>
      <ArrowDropDownIcon />
      Select Option
    </>
  );

  const menuItems = [
    {
      content: (
        <>
          Approve
          <DoneIcon />
        </>
      ),
      onClick: () => {
        setApprovalStatus(REVIEW_STATES.APPROVED);
      },
    },
    {
      content: (
        <>
          Deny
          <CloseIcon />
        </>
      ),
      onClick: () => {
        setApprovalStatus(REVIEW_STATES.DENIED);
      },
    },
  ];

  return (
    <TestWrapper>
      <CommonDropdownMenu
        dropdownId="review-actions-menu"
        buttonContent={buttonContent}
        menuItems={menuItems}
      />
      <Typography variant="body2" data-testid="test-text">
        {`This proposal ${approvalStatus}.`}
      </Typography>
    </TestWrapper>
  );
};

test("render CommonDropdownMenu", async () => {
  const { container, getByTestId } = render(<TestCommonDropdownMenu />);
  expect(getByTestId("dropdown-button")).toHaveTextContent("Select Option");
  expect(container).toMatchSnapshot();
});

test("CommonDropdownMenu actions", async () => {
  const { getByTestId } = render(<TestCommonDropdownMenu />);
  expect(getByTestId("dropdown-button")).toHaveTextContent("Select Option");
  expect(getByTestId("test-text")).toHaveTextContent(
    "This proposal is pending approval.",
  );

  fireEvent.click(getByTestId("dropdown-button"));
  expect(getByTestId("dropdown-item-0")).toHaveTextContent("Approve");
  expect(getByTestId("dropdown-item-1")).toHaveTextContent("Deny");

  fireEvent.click(getByTestId("dropdown-item-0"));
  expect(getByTestId("test-text")).toHaveTextContent(
    "This proposal has been approved.",
  );
});
