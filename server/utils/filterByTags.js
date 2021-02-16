const filterByTags = (tags, entriesToFilter) => {
  //   const result = ;
  let filteredEntries = [];
  console.log(tags);
  for (let i = 0; i < entriesToFilter.length; i++) {
    if (entriesToFilter[i].tags) {
      if (tags.every((val) => entriesToFilter[i].tags.includes(val))) {
        filteredEntries.push(entriesToFilter[i]);
      }
    }
  }
  console.log(filteredEntries.length);
  return filteredEntries;
};

module.exports = filterByTags;
