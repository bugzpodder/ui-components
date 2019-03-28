// @flow

import { readFileAsText, readFileListAsText, readFileListAsTextArray } from "./file-utils";

const type = "text/plain;charset=utf-8";
const sampleContent1 = "There are 336 dimples on a regulation golf ball.";
const sampleContent2 = '"Twelve plus one" is an anagram of "eleven plus two"';
const sampleFilename1 = "some-file-1.txt";
const sampleFilename2 = "some-file-2.txt";
const sampleFile1 = new File([sampleContent1], sampleFilename1, { type });
const sampleFile2 = new File([sampleContent2], sampleFilename2, { type });

const createMockFileList = (files: Array<File>): FileList => {
  // There is no way to create a FileList object directly as the FileList class
  // has no constructor; it is intentionally read-only. Therefore here we
  // create a pseudo-FileList object and cast it to a FileList as the easiest
  // way to test functions which take FileLists.
  return {
    length: files.length,
    item: (index: number) => files[index],
    * [Symbol.iterator]() {
      for (let i = 0; i < files.length; i++) {
        yield files[i];
      }
    },
    ...files,
  };
};

describe("readFileAsText", () => {
  it("should convert a file to its contents", () => {
    expect(readFileAsText(sampleFile1)).resolves.toEqual(sampleContent1);
  });

  it("should fail if the a file has too many bytes", () => {
    expect(readFileAsText(sampleFile1, 2)).rejects.toThrowError(
      "Cannot read file; file has 48 bytes but only files of up to 2 bytes are allowed.",
    );
  });
});

describe("readFileListAsText", () => {
  it("should convert a file list to its contents", () => {
    const fileList = createMockFileList([sampleFile1]);
    expect(readFileListAsText(fileList)).resolves.toEqual(sampleContent1);
  });

  it("should throw an error if two files are present", () => {
    const fileList = createMockFileList([sampleFile1, sampleFile2]);
    expect(readFileListAsText(fileList)).rejects.toThrowError("More than one file.");
  });

  it("should throw an error if zero files are present", () => {
    const fileList = createMockFileList([]);
    expect(readFileListAsText(fileList)).rejects.toThrowError("No files.");
  });
});

describe("readFileListAsTextArray", () => {
  it("should convert a file list to their contents with one file", () => {
    const fileList = createMockFileList([sampleFile1]);
    expect(readFileListAsTextArray(fileList)).resolves.toEqual([sampleContent1]);
  });

  it("should convert a file list to their contents with two files", () => {
    const fileList = createMockFileList([sampleFile1, sampleFile2]);
    expect(readFileListAsTextArray(fileList)).resolves.toEqual([sampleContent1, sampleContent2]);
  });

  it("should convert a file list to their contents with zero files", () => {
    const fileList = createMockFileList([]);
    expect(readFileListAsTextArray(fileList)).resolves.toEqual([]);
  });
});
