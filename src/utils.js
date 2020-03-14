export const alphabetize = items => {
  const negativeOne = -1;
  const results = items.sort(function(a, b) {
    if (a.name < b.name) {
      return negativeOne;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  return results;
};
