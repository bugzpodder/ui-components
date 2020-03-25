export const getListItemDataTestId = (name: any): string => {
  const listItem = "list-item";
  if (typeof name === "number") {
    return `${listItem}-${name}`;
  }
  if (typeof name !== "string" || name === "") {
    return listItem;
  }
  return `${listItem}-${name.toLowerCase().split(" ").join("-")}`;
};
