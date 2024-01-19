function splitOut(arr, filterArr, field, newField = field + "_copy") {
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
    if (Array.isArray(item[field]) && item[field].length && item[field][0] !== "") {
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
        item[newField] = "";
      } else {
        if (Array.isArray(item[field])) {
          item[field] = null;
        }
      }
      tempResult = [...tempResult, item];
    }
  });

  return tempResult;
}

function isEmpty(value) {
  return value == null || (typeof value === "string" && value.trim().length === 0);
}

function isEmptyString(value) {
  return typeof value === "string" && value.trim().length === 0;
}

function isNullObject(value) {
  return value === null && typeof value === "object";
}

function filterData(dataArr, filterArr) {
  let tempResult = [...dataArr];
  let tempDatum;

  function runFilters(arr, filterObj) {
    if (!filterObj) return;
    let result = arr.filter((item) => {
      if (filterObj.operation == ">=") return item[filterObj.field] >= filterObj.value;
      if (filterObj.operation == "==") {
        if (isEmpty(filterObj.value)) {
          return isEmpty(item[filterObj.field]);
        }
        return item[filterObj.field] == filterObj.value;
      }
      if (filterObj.operation === "<=") return item[filterObj.field] <= filterObj.value;
      if (filterObj.operation === "===") {
        if (isEmpty(filterObj.value)) {
          return isEmpty(item[filterObj.field]) && typeof filterObj.value === typeof item[filterObj.field];
        }
        return item[filterObj.field] === filterObj.value;
      }
      if (filterObj.operation == ">") return item[filterObj.field] > filterObj.value;
      if (filterObj.operation == "<") return item[filterObj.field] < filterObj.value;
      if (filterObj.operation == "includes") {
        return item[filterObj.field].includes(filterObj.value);
      }
      if (filterObj.operation == "!includes") {
        return !item[filterObj.field].includes(filterObj.value);
      }
      if (filterObj.operation == "!=") return item[filterObj.field] != filterObj.value;
      if (filterObj.operation == "!==") return item[filterObj.field] !== filterObj.value;
    });

    return result;
  }

  filterArr.map((filter) => {
    if (Array.isArray(filter.field) && filter.operation === "or" && Array.isArray(filter.value)) {
      let filterSet = filter.field.map((el, index) => {
        return {
          field: el,
          operation: "==",
          value: filter.value[index],
        };
      });

      tempDatum = tempResult.filter((item) => {
        if (filterSet.length == 2) {
          return item[filterSet[0].field] == filterSet[0].value || item[filterSet[1].field] == filterSet[1].value;
        }
      });
    } else if (filter.isOr) {
      tempDatum = runFilters(dataArr, filter);
    } else {
      tempDatum = runFilters(tempResult, filter);
    }
    if (filter.isOr) {
      tempResult = tempResult.concat(tempDatum);
    }
    tempResult = [...tempDatum];
  });
  return tempResult;
}

function groupThing(arr, groupArr, strict = false) {
  let vals = {};
  groupArr.map((item) => {
    vals[item] = [
      ...new Set(
        arr.map((el) => {
          if (!strict && isEmptyString(el[item])) return null;
          return el[item];
        })
      ),
    ];
  });
  let tempVals = [{ ...vals }];
  let resultArr = [];
  let length = Object.keys(vals).length;
  let i = 0;
  for (const prop in vals) {
    i++;
    tempVals = expandNested(tempVals, [prop]);
    if (i === length) resultArr = resultArr.concat(tempVals);
  }

  return resultArr;
}

function aggregateThing(arr, groupArr, aggObj = [{ operation: "count" }], strict = false) {
  if (Array.isArray(aggObj) && !aggObj.includes({ operation: "count" })) {
    aggObj.push({ operation: "count" });
  } else {
    aggObj = [aggObj, { operation: "count" }];
  }

  let groups = groupThing(arr, groupArr, strict);
  let filterArr = groups.map((group) => {
    let filters = [];
    const strictOp = strict == false ? "==" : "===";
    for (const key in group) {
      const tempFilter = {
        field: key,
        operation: strictOp,
        value: group[key],
      };
      filters.push(tempFilter);
    }
    return filters;
  });

  let dataArrs = filterArr.map((filter) => {
    return filterData(arr, filter);
  });

  dataArrs.map((data, index) => {
    if (!Array.isArray(aggObj)) return addAggregates(data, aggObj, index);
    return aggObj.map((agg) => addAggregates(data, agg, index));
  });

  function addAggregates(data, aggObj, index) {
    let tempItem;
    if (aggObj.operation === "average") tempItem = averageThing(data, aggObj);
    if (aggObj.operation.slice(0, 1) === "%") {
      tempItem = percentOfThing(data, aggObj);
    }
    if (aggObj.operation === "count") tempItem = { count: data.length };
    if (aggObj.operation === "sum") tempItem = sumThing(data, aggObj);
    groups[index] = {
      ...groups[index],
      [Object.keys(tempItem)[0]]: Object.values(tempItem)[0],
    };
  }
  const results = groups.filter((group) => group.count);
  return results;
}

function averageThing(arr, aggObj) {
  const avg = arr.reduce((total, accumulator) => total + accumulator[aggObj.field], 0) / arr.length;

  let val = {
    [aggObj.operation + "_of_" + aggObj.field]: isNaN(avg) ? "N/A" : avg,
  };
  return val;
}

function sumThing(arr, aggObj) {
  const sum = arr.reduce((total, item) => total + item[aggObj.field], 0);
  const val = { ["sum_of_" + aggObj.field]: sum };
  return val;
}

function percentOfThing(arr, aggObj) {
  let sliceVal = aggObj.operation.slice(2, 3) === "=" ? 3 : 2;
  let operation = aggObj.operation.slice(1, sliceVal);
  let value = aggObj.operation.slice(sliceVal);

  const filterObject = { field: aggObj.field, operation, value };

  let filter = filterData(arr, [filterObject]);

  let percent = (filter.length / arr.length) * 100;
  let string = `%_${aggObj.field}_${operation.replace(">", "greater_than").replace("<", "less_than").replace("=", "_or_equalling")}_${value}`;
  let val = {
    [string]: percent,
  };
  return val;
}

function cloneThing(thing) {
  let newThing = JSON.parse(JSON.stringify(thing));
  return newThing;
}

function flattenObject(object) {
  let result = {};

  const recursiveFunction = (obj, lastObj) => {
    for (const key in obj) {
      if (typeof obj[key] === "object" && Array.isArray(obj[key]) === false) {
        recursiveFunction(obj[key], lastObj != undefined ? [lastObj + "_" + key] : [key]);
      } else {
        if (lastObj != undefined) result = { ...result, [lastObj + "_" + key]: obj[key] };
        if (lastObj == undefined) result = { ...result, [key]: obj[key] };
      }
    }
  };
  recursiveFunction(object);
  return result;
}

function roundToDecimal(num, decimalPlace) {
  const multiplier = Math.pow(10, decimalPlace);
  return Math.round(num * multiplier) / multiplier;
}

function getUniqueVals(array, field) {
  return [...new Set(array.map((item) => item[field]))];
}

export {
  getUniqueVals,
  roundToDecimal,
  splitOut,
  expandNested,
  filterData,
  flattenObject,
  groupThing,
  cloneThing,
  percentOfThing,
  sumThing,
  averageThing,
  aggregateThing,
  isEmpty,
  isEmptyString,
  isNullObject,
};
