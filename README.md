# <span style="color: #e0474c" >One Fish </span><span style="color: #7ab8d6">Two Fish</span>

![](images/fishTwo.svg)

A group of functions for common operations to perform on data comprised of arrays of objects. Can be used for data analysis, data visualization prep, etc.

## Usage

```
npm install onefish-twofish
```

## Simple Functions:

- [**cloneThing**](#cloneThing) : Make a deep copy of an object.
- [**expandNested**](#expandNested) : Expand an array of objects by a nested array's values.
- [**flattenObject**](#flattenObject) : Recursively flatten nested objects.
- [**getUniqueVals**](#getUniqueVals) : Return all unique values for a given field.
- [**roundToDecimal**](#roundToDecimal) : Rounds a value to the specified decimal place.
- [**splitOut**](#splitOut) : Split out fields within a nested array to their own field.

## Filtering:

- [**filterData**](#filterData) : Complex filtering function.
- [**Filter Objects:**](#filter-objects) : Objects that can be added to your chain of filters.
- [**Or Filtering**](#Or-Filtering) : Use or logic within your filers.
- [**Or as an Operation**](#Or-as-an-Operation) : Or as a simple operation.

## Aggregate Functions:

- [**aggregateThings**](#aggregatethings) : Aggregate data and return insightful values.
- [**Aggregation Operations**](#aggregation-operations) : Chain together multiple aggregations.
- [**Custom Aggregations**](#passing-in-custom-functions) : Pass your own functions to your aggregation chain.

---

## cloneThing

**cloneThing(thing)** :
Returns a deep clone of an object.

Takes 1 argument:

- **thing:** The thing to clone

**Ex:**

```
let thing = {key:{obj:"value"}}
let clonedThing = cloneThing(thing)

thing.key.obj= "new value"
```

**Result:** Here we see the cloned object is unaffected by mutating the original object.

```
    thing: {key:{obj:"new value"}}
    clonedThing: {key:{obj:"value}}
```

---

## expandNested

**expandNested(arr, field,newField)**:

Expands an array of objects by values within a nested Array.

Takes 3 arguments

- **arr:** The Original Array of objects.
- **field:** The Name of the field containing the Array
- **newField:** Optional- The name of the new field the values should be expanded to.

If blank, values will overwrite the original field.

**Ex:**

```
const arr = [
{val:1,val2:2,val3:["red","blue"]}
]
const result1 = expandNested (arr,"val3","val4")

const result2 = expandNested (arr,"val3")
```

**Results:** Here we expand val three, returning a new line/object for each item in val3.

```
    result1: [
         {val:1,val2:2,val3:["red","blue"],val4:"red"},
         {val:1,val2:2,val3:["red","blue"],val4:"blue"}
    ]

    result2: [
         {val:1,val2:2,val3:"blue"},
         {val:1,val2:2,val3:"red"}
    ]
```

---

## flattenObject

**flattenObject(object)** :
Returns a new object with any nested objects flattened. Keys will be combined and separated by an underscore.

Takes 1 argument:

- **object:** The object to be flattened

**Ex:**

```
let obj = {someKey:{someNestedKey:{oneFish:"twoFish",redFish:"bluefish"}}}

let flatObj = flattenObject(obj)
```

**Result:** Here we return the object flattened so we can perform more operations on the data.

```
result:
  flatObj: {
    "someKey_someNestedKey_oneFish": "twoFish",
    "someKey_someNestedKey_redFish": "bluefish"
}


```

---

## getUniqueVals

**getUniqueVals(arr, field)** :
Returns an array of all the unique values a field contains

Takes 2 arguments:

- **arr:** The array of objects
- **field:** The field name as a string.

**Ex:**

```
const data = [
                {column_1:"one fish"},
                {column_1:"one fish"},
                {column_1:"two fish"}
            ]

result = getUniqueVals(data,"column_1")

result: ["one fish","two fish"]
```

---

## roundToDecimal

**roundToDecimal(num, decimalPlace)** :
Rounds to the specified decimal place

Takes 2 arguments:

- **num** The number
- **decimalPlace** The decimal place to be rounded to

**Ex:**

```
const num = 3.3333333333
result = roundToDecimal(num, 1)  // 3.3
result2 = roundToDecimal(num, 2) // 3.33
result3 = roundToDecimal(num, 2) // 3.333

```

---

## splitOut

**splitOut(arr, filterArr, field, newField)** :
Returns a new array of objects that splits out selected nested values into a new field.
Does not modify the original Array field.
Takes 4 isArguments:

- **filterArr:** An Array of values to be filtered out.
- **arr:** The Original Array
- **field:** The name of the field within the object.
- **newField:** The name of the new field that those values will be split out to. If blank the field will be titled the name of the original field + \_copy

**EX:**

```
 let data = [
{column_1:["one fish","two fish","red fish","blue fish"]},
{column_1:["one fish","blue fish"]}
]

const result1 = splitOut(data,["red fish","blue fish"],"column_1")

const result2 = splitOut(data,["red fish","blue fish"],"column_1",column_2)
```

**Results:** Here we split the values "red fish" and "blue fish" out to their own key/column.

```
result1: [
{column_1:["one fish","two fish"],column_1_copy:["red fish","blue fish"]},
{column_1:["one fish"],column_1_copy:["blue fish"]}
]

result2: [
{column_1:["one fish","two fish"],column_2:["red fish","blue fish"]},
{column_1:["one fish"],column_2:["blue fish"]}
]
```

---

## filterData

**filterData(arr, filterArr)** :
Filters the data utilizing a filter array. The filter array is an array of filter objects.

Takes 2 arguments:

- **arr:** The array to be filtered.
- **filterArr:** The array of filter objects.

> [!NOTE]
> Filter objects usually consist of three keys/fields.
>
> - **field:** The field to apply the filter to as a string.
> - **opertation:** The operation to apply for filtering.
> - **value:** The value that should be applied.
>
> Let's start out with the most basic example.

**Ex:**

```
let arr = {field: "oneFish"},
          {field: "twoFish"}
          {field: "oneFish"}

let filterObj =  { field: "field", operation: "===", value: "oneFish" },

let filteredArr = filterData(arr,[filterObj])

<!-- result:
  filteredArr: [
                {field: "oneFish"},
                {field: "oneFish"}
                ]
                 -->

```

> [!NOTE]
> Filter objects are stored in an array because they can be chained together:

**Ex:**

```
let arr = {field: "oneFish",someOtherField: "redFish"},
          {field: "twoFish",someOtherField: "blueFish}
          {field: "oneFish",someOtherField: "blueFish}

let filterArr =  [
                    { field: "field", operation: "===", value: "oneFish" },
                    { field: "someOtherField", operation: "===", value: "redFish" },
                 ]

let filteredArr = filterData(arr,filterArr)

<!-- result:
  filteredArr: [
                {field: "oneFish",someOtherField: "redFish},
                ]
                 -->
```

> [!NOTE]
> There are many operations that you can filter by:

---

## Filter Objects:

| Operation   | Usage                                       |
| ----------- | ------------------------------------------- |
| "==="       | strict equivalence                          |
| "=="        | shallow equivalence                         |
| "!=="       | strict inequivalence                        |
| "!="        | shallow inequivalence                       |
| ">="        | greater than or equal to                    |
| ">"         | greater than                                |
| "<="        | less than or equal to                       |
| "<"         | less than                                   |
| "includes"  | whether an array includes the value         |
| "!includes" | whether an array does not include the value |
| "or"        | [See below for usage ](#or-as-an-operation) |

---

### Filtering by numeric values

You can filter by numeric operations like greater than, less than etc.

**Source Data**

```
let arr = [{field: "oneFish",someValue:4,someArray:["blackFish","oldFish","newFish"]},
          {field: "twoFish",someValue:2,someArray:["blackFish","oldFish","newFish"]}
          {field: "oneFish",someValue:4,someArray:["blackFish","newFish"]}]
```

**Function**

```
let filterObj =  { field: "someValue", operation: ">", value: 3 }

let filteredArr = filterData(arr,[filterObj])
```

**Result:**

```
 [
    {field: "oneFish", someValue:4, someArray:["blackFish","oldFish","newFish"]},
    {field: "oneFish", someValue:4, someArray:["blackFish","newFish"]}
]
```

---

### Filtering nested arrays

You can filter by objects included or not included in arrays.

**Source Data:**

```
let arr = [{field: "oneFish",someValue:4,someArray:["blackFish","oldFish","newFish"]},
          {field: "twoFish",someValue:2,someArray:["blackFish","oldFish","newFish"]}
          {field: "oneFish",someValue:4,someArray:["blackFish","newFish"]}]
```

**Function:**

```
let filterObj =  { field: "someArray", operation: "includes", value: "oldFish" }

let filteredArr = filterData(arr,[filterObj])
```

**Result:**

```
 [
    {field: "oneFish",someValue:4,someArray:["blackFish","oldFish","newFish"]},
    {field: "twoFish",someValue:2,someArray:["blackFish","oldFish","newFish"]}
]
```

---

## Combining filters

Filters can be combined for complex filtering.

**Source Data:**

```
let arr = [{field: "oneFish",someValue:4,someArray:["blackFish","oldFish","newFish"]},
          {field: "twoFish",someValue:2,someArray:["blackFish","oldFish","newFish"]}
          {field: "oneFish",someValue:4,someArray:["blackFish","newFish"]}]
```

**Function:**

```
let filters =  [{ field: "someArray", operation: "includes", value: "oldFish" },
                { field: "someValue", operation: ">", value: 3 }
                ]
let filteredArr = filterData(arr,filterObj)
```

**Result:**

```
[
    {field: "oneFish",someValue:4,someArray:["blackFish","oldFish","newFish"]}
]
```

---

## Or Filtering

As the name implies, Or filtering functions with "or" logic. You can use any operator by adding the key isOr:true

**Or Ex:**

**Source Data:**

```
let arr = [{field: "oneFish",someValue:4,someArray:["blackFish","oldFish","newFish"]},
          {field: "twoFish",someValue:2,someArray:["blackFish","oldFish","newFish"]}
          {field: "twoFish",someValue:4,someArray:["blackFish","newFish"]}]
```

**Function:** Here we add isOr:true to our filter object to filter items where either field === "oneFish" **OR** someArray.includes("oldFish")

```
let filters =  [
                {isOr:true, field: "field", operation: "===", value: "oneFish" },
                {isOr:true, field: "someArray", operation: "includes", value: "oldFish }
                ]

let filteredArr = filterData(arr,filterObj)
```

**Result:**

```
[
    {field: "oneFish",someValue:4,someArray:["blackFish","oldFish","newFish"]},
    {field: "twoFish",someValue:2,someArray:["blackFish","oldFish","newFish"]}
]

```

---

### Or as an Operation

Or can be used as an operation for shallow equivalence of multiple fields. In this case the syntax is an array of fields, the operation "or" and the array of values to equal. The fields and values must be located at the same index within their respective arrays:

**Source Data:**

```
let orArr = [
                {fieldOne:"valueOne",fieldTwo:"valueTwo",fieldThree:"valueThree"},
                {fieldOne:"otherValue",fieldTwo:"valueTwo",fieldThree:"otherValue"},
                {fieldOne:"otherValue",fieldTwo:"otherValue",fieldThree:"valueThree"},
                {fieldOne:"otherValue",fieldTwo:"otherValue",fieldThree:"otherValue"}
            ]
```

**Function:** Here we add two arrays, so we return items where fieldOne = "valueOne" **OR** fieldTwo = "valueTwo" **OR** fieldThree = "valueThree"

```

const orFilterOperation = {
field:["fieldOne", "fieldTwo", "fieldThree"],
operation: "or",
value: ["valueOne", "valueTwo", "valueThree"]
}

let orDataFiltered = filterData(orArr,[orFilterOperation])

```

**Result:**

```

[
{fieldOne:"valueOne",fieldTwo:"valueTwo",fieldThree:"valueThree"},
{fieldOne:"otherValue",fieldTwo:"valueTwo",fieldThree:"otherValue"},
{fieldOne:"otherValue",fieldTwo:"otherValue",fieldThree:"valueThree"},
]

```

---

## aggregateThings

**aggregateThings(arr, groupArr, aggObjArr,isStrict)** :
Aggregates the data by a group of fields and returns specified operations.

Takes 4 arguments:

- **arr:** The array to be aggregated.
- **groupArr:** The array of fields to group by as strings.
- **aggObjArr:** An array of aggregation objects.
- **isStrict:** _Optional_ Whether to perform strict equivalence.

> [!NOTE]
> By default, strict is it set to false. Useful for things like, separating falsy values, if you wanted to keep empty strings("") and NULL values on separate lines. By default, empty strings and NULLs will be combined.

**Aggregate Objects consist of two fields**

- **field:** The field to apply the aggregation to as a string.
- **opertation:** The aggregation function to apply as a string. (You can pass custom functions to the operation if so desired)

Let's start out with a basic example.

**Source Data:**

```

let sourceData = [
{region: "NA",score:30},
{region: "NA",score:20},
{region: "EMEA", score: 10},
{region: "EMEA", score:20}
]

```

**Function:** Here we want to return the average of score across each region.

```

let aggObj = [{field:"score",operation:"average"}]

let aggregatedData = aggregateThings(sourceData,["region"],aggObj)

```

**Result:**

```

[
{region:NA, score:25,count:2},
{region:EMEA, score:15, count:2}
]

```

> [!NOTE]
> Aggregation functions always include count. If all you need is the count, the aggObj array can be ommited. Ex: aggregateThings(arr,["field one","field two"])

---

## Aggregation Operations

Aggregation objects can include the following aggregation operations:
|Operation|Usage|
|---------|-----|
|"sum"|The sum of the specified field|
|"average"|The mean of the specified field|
|"min"|The minimum value within that field|
|"max"|The minimum value within that field|
|"%>="+num|Returns the percentage of the grouped field that is greater than or equal to a specified number. Ex: "%>=4" returns the percent greater than or equal to 4|
|"%>"+num|Returns the percentage of the grouped field that is greater than a specified number.|
|"%<="+num|Returns the percentage of the grouped field that is less than or equal to a specified number.|
|"%<"+num|Returns the percentage of the grouped field that is greater than a specified number.|

Let's see a more compound example:

**Source Data:**

```

let dataArr = [
{ currentSubscribers: 8, newSubscribers: 5, region: "NA", company: "Max" },
{ currentSubscribers: 5, newSubscribers: 4, region: "NA", company: "Netflix" },
{ currentSubscribers: 20, newSubscribers: 5, region: "NA", company: "Amazon" },
{ currentSubscribers: 17, newSubscribers: 1, region: "APAC", company: "Max" },
{ currentSubscribers: 15, newSubscribers: 6, region: "APAC", company: "Netflix" },
{ currentSubscribers: 6, newSubscribers: 2, region: "APAC", company: "Amazon" },
{ currentSubscribers: 9, newSubscribers: 2, region: "EMEA", company: "Max" },
{ currentSubscribers: 8, newSubscribers: 4, region: "EMEA", company: "Netflix" },
{ currentSubscribers: 8, newSubscribers: 4, region: "EMEA", company: "Amazon" },
];

```

**Function:** Here we return a number of aggregations accross each company:

```

let test1 = aggregateThings(dataArr, ["company"], [
{ field: "currentSubscribers", operation: "min" },
{ field: "currentSubscribers", operation: "average" },
{ field: "newSubscribers", operation: "max" },
{ field: "newSubscribers", operation: "%>3" },
{ field: "newSubscribers", operation: "sum" },
]);

```

**Result:**

```

[
{
"company": "Max",
"min_of_currentSubscribers": 8,
"average_of_currentSubscribers": 11.333333333333334,
"max_of_newSubscribers": 5,
"%_newSubscribers_greater_than_3": 33.33333333333333,
"sum_of_newSubscribers": 8,
"count": 3
},
{
"company": "Netflix",
"min_of_currentSubscribers": 5,
"average_of_currentSubscribers": 9.333333333333334,
"max_of_newSubscribers": 6,
"%_newSubscribers_greater_than_3": 100,
"sum_of_newSubscribers": 14,
"count": 3
},
{
"company": "Amazon",
"min_of_currentSubscribers": 6,
"average_of_currentSubscribers": 11.333333333333334,
"max_of_newSubscribers": 5,
"%_newSubscribers_greater_than_3": 66.66666666666666,
"sum_of_newSubscribers": 11,
"count": 3
}
]

```

---

## Passing in Custom Functions

You can pass your own functions into the aggregation object. When the aggregator runs, it will pass two arguments to your function:

- **arr** The array of aggregated items for the function to be performed on.
- **aggObject** The aggregation object itself.

> [!IMPORTANT]
> Your function must return an object with the key value pair you are adding.
> Take the below example.

**Source Data:**

```

let dataArr = [
{ currentSubscribers: 8, newSubscribers: 5, topGenres: ["comedy", "action", "drama"], region: "NA", company: "Max" },
{ currentSubscribers: 5, newSubscribers: 4, topGenres: ["drama"], region: "NA", company: "Netflix" },
{ currentSubscribers: 20, newSubscribers: 5, topGenres: ["comedy"], region: "NA", company: "Amazon" },
{ currentSubscribers: 17, newSubscribers: 1, topGenres: ["action"], region: "APAC", company: "Max" },
{ currentSubscribers: 15, newSubscribers: 6, topGenres: ["drama"], region: "APAC", company: "Netflix" },
{ currentSubscribers: 6, newSubscribers: 2, topGenres: ["comedy", "action", "drama"], region: "APAC", company: "Amazon" },
{ currentSubscribers: 9, newSubscribers: 2, topGenres: ["comedy"], region: "EMEA", company: "Max" },
{ currentSubscribers: 8, newSubscribers: 4, topGenres: ["action"], region: "EMEA", company: "Netflix" },
{ currentSubscribers: 8, newSubscribers: 4, topGenres: ["drama"], region: "EMEA", company: "Amazon" },
];

```

**Custom Function:** Here we write a function ro return a count of values where top genre includes comedy.

```

function countComedy(arr, aggObj) {
const countOfComedy = arr.filter((item) => item[aggObj.field].includes("comedy")).length;
const val = { "#\_Top_Genre_Comedy": countOfComedy };
return val;
}

```

**Function**

```

let test1 = aggregateThings(dataArr, ["company"], [{ field: "topGenres", operation: countComedy }]);

```

**Result**

```

[
{
"company": "Max",
"#_Top_Genre_Comedy": 2,
"count": 3
},
{
"company": "Netflix",
"#_Top_Genre_Comedy": 0,
"count": 3
},
{
"company": "Amazon",
"#_Top_Genre_Comedy": 2,
"count": 3
}
]

```
