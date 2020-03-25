// readFileAsText returns the contents of the given file. It should only be used
// for small text files that the UI needs to parse. Larger files or binary files
// should be kept as a File object and passed to the server as such (since File
// extends Blob).
// eslint-disable-next-line arrow-body-style
export const readFileAsText = (
  file: File,
  maxBytes: number = 128 * 1024,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    // @ts-ignore result not found on event target.
    fileReader.onload = ({ currentTarget: { result } }) => resolve(result);
    // @ts-ignore error not found on event target.
    fileReader.onerror = ({ currentTarget: { error } }) => reject(error);
    if (file.size > maxBytes) {
      return reject(
        new Error(
          `Cannot read file; file has ${file.size} bytes but only files of up to ${maxBytes} bytes are allowed.`,
        ),
      );
    }
    fileReader.readAsText(file);
  });
};

// readFileListAsTextArray returns an array containing the file contents of each
// of the files in fileList.
export const readFileListAsTextArray = (
  fileList: FileList,
  maxBytesPerFile?: number,
): Promise<string[]> => {
  // Convert a FileList to an File[].
  const files = [...fileList];
  return Promise.all(
    files.map((file) => readFileAsText(file, maxBytesPerFile)),
  );
};

// readFileListAsText returns the file contents of the file in fileList. An
// error is returned if there is not exactly one file in fileList.
export const readFileListAsText = (
  fileList: FileList,
  maxBytes?: number,
): Promise<string> => {
  if (fileList.length === 0) {
    return Promise.reject(new Error("No files."));
  }
  if (fileList.length > 1) {
    return Promise.reject(new Error("More than one file."));
  }
  const [file] = fileList;
  return readFileAsText(file, maxBytes);
};
