function splitOut(arr, filterArr, field, newField) {
  let tempData = [];
  arr.map((datum) => {
    let tempDatum = { ...datum };
    let tempItems;
    if (Array.isArray(tempDatum[field]) && tempDatum[field].length) {
      tempItems = tempDatum[field].filter((arrItem) => {
        return filterArr.includes(arrItem);
      });
    }
    tempDatum[newField] = tempItems;
    tempData = [...tempData, tempDatum];
  });
  return tempData;
}

function expandNested(arr, field, newField) {
  let tempResult = [];
  arr.map((item) => {
    if (Array.isArray(item[field]) && item[field].length) {
      let items = [...item[field]];

      let tempDatum = items.map((datum) => {
        let tempItem = { ...item };
        if (newField) {
          tempItem[newField] = datum;
        }
        if (!newField) {
          tempItem[field] = datum;
        }
        return tempItem;
      });
      tempResult = [...tempResult, ...tempDatum];
    } else {
      if (newField) {
        item[newField] = item[field];
      }
      tempResult = [...tempResult, item];
    }
  });

  return tempResult;
}

function filterDataSet(dataArr, filterArr) {
  let tempResult = [...dataArr];
  filterArr.map((filter) => {
    let tempDatum = tempResult.filter((item) => {
      if (filter.operator == "==") return item[filter.field] == filter.value;
      if (filter.operator == ">=") return item[filter.field] >= filter.value;
      if (filter.operator == "<=") return item[filter.field] <= filter.value;
      if (filter.operator == "===") return item[filter.field] === filter.value;
      if (filter.operator == ">") return item[filter.field] > filter.value;
      if (filter.operator == "<") return item[filter.field] < filter.value;
      if (filter.operator == "includes")
        return item[filter.field].includes(filter.value);
    });

    tempResult = [...tempDatum];

    // console.log({ tempResult });
  });
  console.log({ tempResult });
  return tempResult;
}

module.exports = { splitOut, expandNested, filterDataSet };
