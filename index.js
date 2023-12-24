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

function filterData(dataArr, filterArr) {
  let tempResult = [...dataArr];
  let tempDatum;
  filterArr.map((filter) => {
    if (
      Array.isArray(filter.field) &&
      filter.operator == "or" &&
      Array.isArray(filter.value)
    ) {
      let filterSet = filter.field.map((el, index) => {
        return {
          field: el,
          operator: "==",
          value: filter.value[index],
        };
      });

      tempDatum = tempResult.filter((item) => {
        if (filterSet.length == 2) {
          return (
            item[filterSet[0].field] == filterSet[0].value ||
            item[filterSet[1].field] == filterSet[1].value
          );
        }
      });
    } else {
      tempDatum = tempResult.filter((item) => {
        if (filter.operator == "==") return item[filter.field] == filter.value;
        if (filter.operator == ">=") return item[filter.field] >= filter.value;
        if (filter.operator == "<=") return item[filter.field] <= filter.value;
        if (filter.operator == "===")
          return item[filter.field] === filter.value;
        if (filter.operator == ">") return item[filter.field] > filter.value;
        if (filter.operator == "<") return item[filter.field] < filter.value;
        if (filter.operator == "includes") {
          return item[filter.field].includes(filter.value);
        }
        if (filter.operator == "!includes") {
          return !item[filter.field].includes(filter.value);
        }
        if (filter.operator == "!=") return item[filter.field] != filter.value;
        if (filter.operator == "!==")
          return item[filter.field] !== filter.value;
      });
    }
    tempResult = [...tempDatum];
  });
  return tempResult;
}

function flattenObject(object) {
  let result = {};

  const recursiveFunction = (obj, lastObj) => {
    for (const key in obj) {
      if (typeof obj[key] === "object" && Array.isArray(obj[key]) === false) {
        recursiveFunction(
          obj[key],
          lastObj != undefined ? [lastObj + "_" + key] : [key]
        );
      } else {
        if (lastObj != undefined)
          result = { ...result, [lastObj + "_" + key]: obj[key] };
        if (lastObj == undefined) result = { ...result, [key]: obj[key] };
      }
    }
  };
  recursiveFunction(object);
  return result;
}

module.exports = { splitOut, expandNested, filterData, flattenObject };
