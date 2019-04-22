// @flow

export const getListItemDataTestId = (name: any) => {
  const listItem = "list-item";
  if (typeof name === "number") {
    return `${listItem}-${name}`;
  }
  if (typeof name !== "string" || name === "") {
    return listItem;
  }
  return `${listItem}-${name
    .toLowerCase()
    .split(" ")
    .join("-")}`;
};
