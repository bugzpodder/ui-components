// @flow
import React from "react";
import { TestWrapper } from "../test-utils";
import { cleanup, render } from "react-testing-library";

import "jest-dom/extend-expect";
import { UploadButton } from ".";

afterEach(cleanup);

test("render upload button with default text", async () => {
  const testId = "upload-button";
  const { container, getByTestId } = render(
    <TestWrapper>
      <UploadButton
        buttonProps={{
          variant: "contained",
          color: "primary",
          "data-testid": testId,
        }}
        onChange={() => {}}
      />
    </TestWrapper>,
  );
  expect(getByTestId(testId)).toHaveTextContent("Upload File");
  expect(getByTestId(testId)).not.toHaveTextContent("Upload File(s)");
  expect(container).toMatchSnapshot();
});

test("render upload button with default text for uploading multiple files", async () => {
  const testId = "upload-button";
  const { container, getByTestId } = render(
    <TestWrapper>
      <UploadButton
        allowMultiple
        buttonProps={{
          variant: "contained",
          color: "primary",
          "data-testid": testId,
        }}
        onChange={() => {}}
      />
    </TestWrapper>,
  );
  expect(getByTestId(testId)).toHaveTextContent("Upload File(s)");
  expect(container).toMatchSnapshot();
});
