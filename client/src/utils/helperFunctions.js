const stringToArray = (arr) => {
  return arr.length >= 1
    ? arr.split(",").map(function (tag) {
        return tag.trim();
      })
    : "";
};
export { stringToArray };
