## What is space complexity

* Also measured in Big O Notation

* It's considered to be the total space used by an algorithm relative to the size of the input.
  - Remember, we don't consider the efficiency of an algorithm in how it performs in one specific instance of that algorithm running. Instead, we want to know the efficiency changes when the size of the input changes.

* Measuring space complexity considers the space used by your algorithm input and auxiliary space.
  - Auxiliary space is the extra/temporary space used by the algorithm.
  - These can be things like temporary variables created during the execution time of the algorithm.
  - They won't have a lasting impact on memory space but during the execution of the algorithm will need to be considered.

* Most data structures web developers come acoross will have a space complexity of O(n) or O(1).

* Merge Sort uses O(n) auxiliary space… insertion and heap sort use O(1) auxiliary space. Space complexity of all these sorting algorithms is O(n) though.

// > ----------------------------------------------------------------------------------------------------------

# Examples

* O(1): Constance Complexity

```javascript
function multiply(num1, num2) {
  return num1 * num2;
}
```

- No matter how many arguments we pass to the function call, only a single value is created (the product of the numbers). It does not change. Therefore, the space complexity is O(1).

// > ----------------------------------------------------------------------------------------------------------

* O(n): Linear Complexity

```javascript
function sumArr(arr) {
  const copyArr = arr.slice();
  let sum = 0;
  copyArr.forEach((number) => {
    sum += number;
  });
  return sum;
}
```
- This is intentionally written in a slightly more verbose way than necessary to illustrate the point.
- The space complexity of this function is O(n) because the size of the copyArr array scales with the size of the input array.
- The array could have 3 or 3000 elements, and the copyArr array would need to be the same size. When we don't know the length of the array, we refer to it as N… so we have N + 1 variable called sum… we know that we drop the constants with Big O, so we are left with O(N). 
- We made a copy of the array so we wouldn't mutate the original array. This is a common pattern in JavaScript, but it's important to be aware of the space complexity implications.
 

* The complexity is replicated no amtter the data structure:

```javascript
function sumObjectValues(obj) {
  const copyObject = { ...obj };
  let sum = 0;
  Object.values(copyObject).forEach((value) => {
    sum += value
  });
  return sum;
}
```
- Here as the object size increases, the space it uses grows in a linear way.


💭💭💭 
I attract abundance and prosperity effortlessly.
💭💭💭