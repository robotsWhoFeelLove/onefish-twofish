# One Fish Two Fish

Group of functions for common operations needed with arrays of objects for data manipulation, visualization prep, etc.

## Functions:

### splitOut

**splitOut(arr, filterArr, field, newField)** :
Returns a new array of objects that splits out selected nested values into a new field.
Does not modify the original Array field.
Takes 4 isArguments:
-1: arr | The Original Array
-2: filterArr | An Array of values to be filtered out.
-3: field | The name of the field within the object.
-4: newField | The name of the new field that those values will be split out to. If blank the field will be titled the name of the original field + "\_copy"

**EX:**

```
 let data = [
{column_1:["one fish","two fish","red fish","blue fish"]},
{column_1:["one fish","blue fish"]}
]

const result1 = splitOut(data,["red fish","blue fish"],"column_1")

result1: [
{column_1:["one fish","two fish"],column_1_copy:["red fish","blue fish"]},
{column_1:["one fish"],column_1_copy:["blue fish"]}
]

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
-1: arr | The Original Array of objects.
-2: field | The Name of the field containing the Array
-3: newField | Optional- The name of the new field the values should be expanded to.
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
-1: arr | The array of objects
-2: field | The field name as a string.

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

**roundToDecimal(num, decimalPlace) ** :
Rounds to the specified decimal place
Takes 2 arguments:
-1: num | The number
-2: decimalPlace | The decimal place to be rounded to

**Ex:**

```
const num = 3.3333333333
result = roundToDecimal(num, 1)  // 3.3
result2 = roundToDecimal(num, 2) // 3.33
result3 = roundToDecimal(num, 2) // 3.333

```

## cloneThing

**cloneThing(thing) ** :
Returns a deep clone of an object.
Takes 1 arguments:
-1: thing | The thing to clone

**Ex:**

```
let thing = {key:{obj:"value"}}
let clonedThing = cloneThing(thing)

thing.key.obj= "new value"

<!-- result:
    thing: {key:{obj:"new value"}}
    clonedThing: {key:{obj:"value}} -->


```
