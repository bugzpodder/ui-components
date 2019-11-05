import "@testing-library/jest-dom/extend-expect";
import React from "react";
import mockConsole from "jest-mock-console";
import { ExportTableButton } from "./export-table-button";
import { TestWrapper } from "../../test-utils";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { columns, data } from "../utilities/test-table-properties";

afterEach(cleanup);

/**
 Passing Cases
 */

test("render export table button", () => {
  mockConsole();
  const { container, getByTestId } = render(
    <TestWrapper>
      <ExportTableButton columns={columns} data={data} title="Example Table" />
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
  fireEvent.click(getByTestId("export-button"));
  expect(console.warn).toHaveBeenCalled();
});
