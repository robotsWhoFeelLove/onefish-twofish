# <span style="color: #e0474c" >One Fish </span><span style="color: #7ab8d6">Two Fish</span>

Group of functions for common operations needed with arrays of objects for data manipulation, visualization prep, etc.

## Simple Functions:

- [**splitOut**](#splitOut)
- [**expandNested**](#expandNested)
- [**getUniqueVals**](#getUniqueVals)
- [**roundToDecimal**](#roundToDecimal)
- [**cloneThing**](#cloneThing)
- [**flattenObject**](#flattenObject)

## filterData:

- [**filterData**](#filterThing)
- [**Filter Objects**](#Filter_Objects)
  //todo

## Aggregate Functions:

---

### splitOut

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

<!-- result1: [
{column_1:["one fish","two fish"],column_1_copy:["red fish","blue fish"]},
{column_1:["one fish"],column_1_copy:["blue fish"]}
] -->

const result1 = splitOut(data,["red fish","blue fish"],"column_1",column_2)

<!-- result1: [
{column_1:["one fish","two fish"],column_2:["red fish","blue fish"]},
{column_1:["one fish"],column_2:["blue fish"]}
] -->
```

### expandNested

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

    <!-- result1: [
         {val:1,val2:2,val3:["red","blue"],val4:"red"},
         {val:1,val2:2,val3:["red","blue"],val4:"blue"}
    ] -->

const result2 = expandNested (arr,"val3")

    <!-- result2: [
         {val:1,val2:2,val3:"blue"},
         {val:1,val2:2,val3:"red"}
    ] -->
```

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

<!-- result:
    thing: {key:{obj:"new value"}}
    clonedThing: {key:{obj:"value}} -->


```

## flattenObject

**flattenObject(object)** :
Returns a new object with any nested objects flattened. Keys will be combined and separated by an underscore.

Takes 1 argument:

- **object:** The object to be flattened

**Ex:**

```
let thing = {someKey:{someNestedKey:{oneFish:"twoFish",redFish:"bluefish"}}}

let clonedThing = cloneThing(thing)

<!-- result:
  clonedThing: {
    "someKey_someNestedKey_oneFish": "twoFish",
    "someKey_someNestedKey_redFish": "bluefish" -->
}


```

---

## filterData

**filterData(arr, filterArr)** :
Filters the data utilizing a filter array. The filter array is an array of filter objects.

Takes 2 argument:

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

### Filter Objects:

- {field:"someField", operation: "===", value: "someValue"}
- {field:"someField", operation: "==", value: "someValue"}
- {field:"someField", operation: "!==", value: "someValue"}
- {field:"someField", operation: "!=", value: "someValue"}
- {field:"someField", operation: ">=", value: "someValue"}
- {field:"someField", operation: ">", value: "someValue"}
- {field:"someField", operation: "<=", value: "someValue"}
- {field:"someField", operation: "<", value: "someValue"}
- {field:"someField", operation: "includes", value: "someValue"}
- {field:"someField", operation: "!includes", value: "someValue"}

**Filtering by numeric values**

```
let arr = [{field: "oneFish",someValue:4,someArray:["blackFish","oldFish","newFish"]},
          {field: "twoFish",someValue:2,someArray:["blackFish","oldFish","newFish"]}
          {field: "oneFish",someValue:4,someArray:["blackFish","newFish"]}]

let filterObj =  { field: "someValue", operation: ">", value: 3 }
let filteredArr = filterData(arr,[filterObj])

 <!-- result:[{field: "oneFish", someValue:4, someArray:["blackFish","oldFish","newFish"]},
              {field: "oneFish", someValue:4, someArray:["blackFish","newFish"]}] -->

```

**Filtering nested arrays**

```
let arr = [{field: "oneFish",someValue:4,someArray:["blackFish","oldFish","newFish"]},
          {field: "twoFish",someValue:2,someArray:["blackFish","oldFish","newFish"]}
          {field: "oneFish",someValue:4,someArray:["blackFish","newFish"]}]

let filterObj =  { field: "someArray", operation: "includes", value: "oldFish" }
let filteredArr = filterData(arr,[filterObj])

<!-- result: [{field: "oneFish",someValue:4,someArray:["blackFish","oldFish","newFish"]},
              {field: "twoFish",someValue:2,someArray:["blackFish","oldFish","newFish"]}
             ] -->
```

**Combining filters**

```

let arr = [{field: "oneFish",someValue:4,someArray:["blackFish","oldFish","newFish"]},
          {field: "twoFish",someValue:2,someArray:["blackFish","oldFish","newFish"]}
          {field: "oneFish",someValue:4,someArray:["blackFish","newFish"]}]

let filters =  [{ field: "someArray", operation: "includes", value: "oldFish" },
                { field: "someValue", operation: ">", value: 3 }
                ]
let filteredArr = filterData(arr,filterObj)

<!-- result: [{field: "oneFish",someValue:4,someArray:["blackFish","oldFish","newFish"]}
             ] -->
```

### Or Filtering

As the name implies, Or filtering functions with or logic. You can use any operator by adding the key isOr:true

**Or Ex:**

```
let arr = [{field: "oneFish",someValue:4,someArray:["blackFish","oldFish","newFish"]},
          {field: "twoFish",someValue:2,someArray:["blackFish","oldFish","newFish"]}
          {field: "twoFish",someValue:4,someArray:["blackFish","newFish"]}]

let filters =  [{isOr:true, field: "field", operation: "===", value: "oneFish" },
                {isOr:true, field: "someArray", operation: "includes", value: "oldFish }
                ]
let filteredArr = filterData(arr,filterObj)

<!-- filteredArr: [{field: "oneFish",someValue:4,someArray:["blackFish","oldFish","newFish"]},
          {field: "twoFish",someValue:2,someArray:["blackFish","oldFish","newFish"]}] -->

```

### Or as an Operation

Or can be used as an operation for shallow equivalence of multiple fields. In this case the syntax is an array of fields, the operation "or" and the array of values to equal. The fields and values must be located at the same index within their respective arrays:

**Ex:**

```
const orFilterOperation = {field:["fieldOne","fieldTwo","fieldThree"],
                     operation:"or",
                     value: ["valueOne","valueTwo","valueThree"]}

let orArr = [
                {fieldOne:"valueOne",fieldTwo:"valueTwo",fieldThree:"valueThree"},
                {fieldOne:"otherValue",fieldTwo:"valueTwo",fieldThree:"otherValue"},
                {fieldOne:"otherValue",fieldTwo:"otherValue",fieldThree:"valueThree"},
                {fieldOne:"otherValue",fieldTwo:"otherValue",fieldThree:"otherValue"}
            ]

let orDataFiltered = filterData(orArr,[orFilterOperation])

<!-- orDataFiltered: [
                {fieldOne:"valueOne",fieldTwo:"valueTwo",fieldThree:"valueThree"},
                {fieldOne:"otherValue",fieldTwo:"valueTwo",fieldThree:"otherValue"},
                {fieldOne:"otherValue",fieldTwo:"otherValue",fieldThree:"valueThree"},
                ] -->
```
