// @flow
import "jest-dom/extend-expect";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import React, { Fragment, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { CommonDropdownMenu } from ".";
import { TestWrapper } from "../test-utils";
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
    <Fragment>
      <ArrowDropDownIcon />
      Select Option
    </Fragment>
  );

  const menuItems = [
    {
      content: (
        <Fragment>
          Approve
          <DoneIcon className="margin-left-10" />
        </Fragment>
      ),
      onClick: () => {
        setApprovalStatus(REVIEW_STATES.APPROVED);
      },
    },
    {
      content: (
        <Fragment>
          Deny
          <CloseIcon className="margin-left-10" />
        </Fragment>
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
      <Typography
        variant="body2"
        data-testid="test-text"
      >
        {`This proposal ${approvalStatus}.`}
      </Typography>
    </TestWrapper>
  );
};

test("render CommonDropdownMenu", async () => {
  const { getByTestId } = render(<TestCommonDropdownMenu />);
  expect(getByTestId("dropdown-button")).toHaveTextContent("Select Option");
});

test("CommonDropdownMenu actions", async () => {
  const { getByTestId } = render(<TestCommonDropdownMenu />);
  expect(getByTestId("dropdown-button")).toHaveTextContent("Select Option");
  expect(getByTestId("test-text")).toHaveTextContent("This proposal is pending approval.");

  fireEvent.click(getByTestId("dropdown-button"));
  expect(getByTestId("dropdown-item-0")).toHaveTextContent("Approve");
  expect(getByTestId("dropdown-item-1")).toHaveTextContent("Deny");

  fireEvent.click(getByTestId("dropdown-item-0"));
  expect(getByTestId("test-text")).toHaveTextContent("This proposal has been approved.");
});
