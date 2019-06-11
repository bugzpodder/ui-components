// @flow
import FileSaver from "file-saver";
import { generateReport } from "./export-utils";

jest.mock("file-saver", () => ({ saveAs: jest.fn() }));

const columns = [
  {
    accessor: "abc",
  },
  {
    accessor: "123 456",
  },
];

const data = [
  {
    abc: "Other Value 1",
    "123 456": 0,
  },
];

describe("generateReport", () => {
  it("mocks generating a CSV", () => {
    generateReport("my-file.csv", columns, data);
    const expectedContent = `abc,123 456
OtherValue 1,0
`;
    const blob = new Blob([expectedContent], { type: "text/csv;charset=utf-8;" });
    expect(FileSaver.saveAs).toHaveBeenCalledWith(blob, "my-file.csv", true);
  });

  it("test different mime type", () => {
    const option = { fileMimeType: "text/plain" };
    generateReport("my-file.csv", columns, data, option);
    const expectedContent = `abc,123 456
OtherValue 1,0
`;
    const blob = new Blob([expectedContent], { type: "text/plain;charset=utf-8;" });
    expect(FileSaver.saveAs).toHaveBeenCalledWith(blob, "my-file.csv", true);
  });
});
