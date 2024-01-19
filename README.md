# One Fish Two Fish

Group of functions for common operations needed with arrays of objects for data manipulation, visualization prep, etc.

##Functions:

###splitOut

splitOut(arr, filterArr, field, newField) :
Takes an inital Array (arr) filters out values in the filter Array (filterArr) from the name of the field and places them in a field called field + \_copy or optionaly with name newField

EX:

```
data = [
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
