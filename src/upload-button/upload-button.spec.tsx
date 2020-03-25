import React from "react";
import { TestWrapper } from "../test-utils";
import { UploadButton } from ".";
import { cleanup, fireEvent, render } from "@testing-library/react";

afterEach(cleanup);

test("render upload button with default text", async () => {
  const testId = "upload-button";
  const mockOnChange = jest.fn((result) => result);
  const { container, getByTestId } = render(
    <TestWrapper>
      <UploadButton
        buttonProps={
          {
            variant: "contained",
            color: "primary",
            "data-testid": testId,
          } as unknown
        }
        onChange={mockOnChange}
      />
    </TestWrapper>,
  );
  expect(getByTestId(testId)).toHaveTextContent("Upload File");
  expect(getByTestId(testId)).not.toHaveTextContent("Upload File(s)");
  fireEvent.change(getByTestId("upload-button-input-field"));
  expect(mockOnChange).toHaveBeenCalled();

  // TODO(nsawas): Figure out how to test return result of Filelist {}.
  const valueType = typeof mockOnChange.mock.results[0].value;
  expect(valueType).toEqual("object");
  expect(container).toMatchSnapshot();
});

test("render upload button with default text and default props for uploading multiple files", async () => {
  const testId = "upload-button";
  const { container, getByTestId } = render(
    <TestWrapper>
      <UploadButton
        allowMultiple
        buttonProps={
          {
            variant: "contained",
            color: "primary",
            "data-testid": testId,
          } as unknown
        }
        onChange={() => {}}
      />
      <UploadButton allowMultiple onChange={() => {}} />
    </TestWrapper>,
  );
  expect(getByTestId(testId)).toHaveTextContent("Upload File(s)");
  expect(container).toMatchSnapshot();
});
