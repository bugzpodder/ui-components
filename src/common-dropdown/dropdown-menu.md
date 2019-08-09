### Example

```js
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import Typography from "@material-ui/core/Typography";
import { ExampleWrapper } from "../test-utils";
import { useState } from "react";
import { CommonDialog } from "./";

const DropdownDemo = () => {
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
          <DoneIcon className="margin-left-10" />
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
          <CloseIcon className="margin-left-10" />
        </>
      ),
      onClick: () => {
        setApprovalStatus(REVIEW_STATES.DENIED);
      },
    },
  ];

  return (
    <>
      <CommonDropdownMenu dropdownId="review-actions-menu" buttonContent={buttonContent} menuItems={menuItems} />
      <Typography variant="body2">{`This proposal ${approvalStatus}`}</Typography>
    </>
  );
};

<ExampleWrapper>
  <DropdownDemo />
</ExampleWrapper>;
```
