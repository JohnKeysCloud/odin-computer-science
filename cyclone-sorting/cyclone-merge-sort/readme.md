# 💭 Merge-Sort:
- The idea of the algorithm is to sort smaller arrays and then combine those arrays together (merge them) in sorted order.

---

## Merge Sort Pseudocode
1. **Recursively Sort Left Half:**
   - Recursively sort the left half of the array (assuming the array has more than one element).

2. **Recursively Sort Right Half:**
   - Recursively sort the right half of the array (assuming the array has more than one element).

3. **Merge Sorted Halves:**
   - Merge the two sorted halves together as the recursion unwinds.

### Worst-case scenario:
- We have to split n elements up and then recombine them, effectively doubling the sorted subarrays as we build them up (Combining sorted 1-element arrays into 2-element arrays, combining sorted 2-element arrays into 4-element arrays…).

### Best-case scenario:
- The array is already perfectly sorted. But we still have to split and recombine it back together with this algorithm.

---

## 2-way Merge Sort (Iterative Method):
_In the context of merge sort, "2-way" refers to the method of dividing the array into two halves and then merging these two halves back together in sorted order._
**(Could be an array or a linked list)**

---

### Formal `merge` Introduction

#### Notation Convention
- The notation `𝑚` and `𝑛` is commonly used to represent the **sizes** of two input arrays in algorithms, specifically when describing the time complexity of merging or combining the two arrays.
- However, it often makes sense to name variables based on the specific arrays or data structures in the project, as this enhances code clarity and maintainability.
- By giving meaningful names that reflect the project's specific arrays, you can make the code easier to understand for both current and future developers:

- **Lists:** `a`, `b`
- **List Sizes:** `m`, `n`
- **List Pointers:** `i`, `j`, `k`

#### Implementation
```javascript
let a = [2, 8, 15, 18]; // ? m elements
let b = [5, 9, 12, 17]; // ? n elements

function mergeFormal(a, b) {
  // ? Compare the elements, return the list
  let mergedArray = []; // ? Will have m + n elements
  // ? 𝞱(m + n) time complexity.
  // ? 𝞱(m + n) space complexity.
  
  let m = a.length - 1;
  let n = b.length - 1;

  let i = 0; // ? Pointer for array 'a'
  let j = 0; // ? Pointer for array 'b'
  let k = 0; // ? Pointer for 'mergedArray'

  // ? Loop ends when one of the arrays has been fully iterated through
  while (i <= m && j <= n) { 
    if (a[i] < b[j]) {
      mergedArray[k++] = a[i++]; // * {1}
    } else {
      mergedArray[k++] = b[j++];
    }
  }

  // ? If there are still elements left in array 'a'
  for (; i <= m; i++) {
    mergedArray[k++] = a[i];
  }

  // ? Else if there are still elements left in array 'b'
  for (; j <= n; j++) {
    mergedArray[k++] = b[j];
  }

  return mergedArray;
}

console.log(mergeFormal(a, b));

// * {1} - Appended `++` means the unincremented value is used. So we are adding the lower value of the two to the empty array and incrementing to move on to the next index of arrays 'a' and 'b'. The same applies to the `else` condition code.
```

### My `mergeSort` Introduction
- **Merging is done in post order traversal:**
  * This is because the merging occurs as the recursion unwinds.

#### Implementation
```javascript
const testArray1 = [3, 2, 1, 13, 8, 5, 0, 1];
const testArray2 = [105, 79, 100, 110, 3];

function mergeSort(array) {
  const merge = (leftHalfOfArray, rightHalfOfArray) => {
    let mergedArray = [];

    let leftHalfPointer = 0;
    let rightHalfPointer = 0;
    let mergedPointer = 0;

    while (
      leftHalfPointer < leftHalfOfArray.length &&
      rightHalfPointer < rightHalfOfArray.length
    ) {
      if (leftHalfOfArray[leftHalfPointer] < rightHalfOfArray[rightHalfPointer]) {
        mergedArray[mergedPointer++] = leftHalfOfArray[leftHalfPointer++];
      } else {
        mergedArray[mergedPointer++] = rightHalfOfArray[rightHalfPointer++];
      }
    }

    for (leftHalfPointer; leftHalfPointer < leftHalfOfArray.length; leftHalfPointer++) {
      mergedArray[mergedPointer++] = leftHalfOfArray[leftHalfPointer];
    }

    for (rightHalfPointer; rightHalfPointer < rightHalfOfArray.length; rightHalfPointer++) {
      mergedArray[mergedPointer++] = rightHalfOfArray[rightHalfPointer];
    }

    return mergedArray;
  };

  // ? Base case: if the array has only one element, it's already sorted.
  if (array.length === 1) {
    return array;
  }
  
  // ? Find the midpoint of the array to split it into two halves
  let middleIndex = Math.floor(array.length / 2);

  // ? Recursively divide the left half of the array until it contains only one element
  let leftHalfOfArray = mergeSort(array.slice(0, middleIndex)); 

  // ? Recursively divide the right half of the array until it contains only one element
  let rightHalfOfArray = mergeSort(array.slice(middleIndex));

  // ? Merge the sorted left and right halves back together
  return merge(leftHalfOfArray, rightHalfOfArray);
}

console.log(mergeSort(testArray1));
console.log(mergeSort(testArray2));
```

#### High-level Overview Walkthrough (Flow of algorithm)
```javascript
const testArray1 = [3, 2, 1, 13, 8, 5, 0, 1];
```

##### Initial Invocation
`mergeSort(testArray1)`

##### First Recursive Call
- `leftHalfOfArray = [3, 2, 1, 13]`
- `rightHalfOfArray = [8, 5, 0, 1]`

##### Second Recursive Call for `leftHalfOfArray`
- `leftHalfOfArray = [3, 2]`
- `rightHalfOfArray = [1, 13]`

##### Third Recursive Call for `leftHalfOfArray`
- `leftHalfOfArray = [3]`
- `rightHalfOfArray = [2]`

##### Base Case
Each of `[3]` and `[2]` is a single-element array. They are returned directly as the `leftHalfOfArray` and `rightHalfOfArray` respectively.

##### Merge `[3]` and `[2]`
`merge([3], [2])` returns `[2, 3]` to the second recursive call's `leftHalfOfArray` variable.

##### Sorting `[1, 13]`
- `mergeSort([1, 13])`
  - `leftHalfOfArray = [1]`
  - `rightHalfOfArray = [13]`

##### Base Case
Each of `[1]` and `[13]` is a single-element array. They are returned directly as the `leftHalfOfArray` and `rightHalfOfArray` respectively.

##### Merge `[1]` and `[13]`
`merge([1], [13])` returns `[1, 13]` to the second recursive call's `rightHalfOfArray` variable.

##### Final Merge of the Left Half of the Initial Array
`merge([2, 3], [1, 13])` returns `[1, 2, 3, 13]` to the `leftHalfOfArray` variable of the initial recursive call.

##### Sorting the Right Half of the Initial Array
`mergeSort([8, 5, 0, 1])` is called and the same process is followed:
- Split into:
  - `leftHalfOfArray = [8, 5]`
  - `rightHalfOfArray = [0, 1]`
- Each sub-array is further split and merged to form `[0, 1]` and `[5, 8]`.

##### Final Merge of Both Sorted Halves of the Main Array
`merge([1, 2, 3, 13], [0, 1, 5, 8])` returns the fully sorted array `[0, 1, 1, 2, 3, 5, 8, 13]`.

---

#### Lower-Level Walkthrough

```javascript
const exampleArray = [9, 3, 7, 5, 6, 4, 8, 2];
```

##### Pass One - `n` Elements Divided by 2
- **4 lists:**
  - `[9, 3]`
  - `[7, 5]`
  - `[6, 4]`
  - `[8, 2]`

- **Merge-Sort Subarrays:**
  - `[3, 9]`
  - `[5, 7]`
  - `[4, 6]`
  - `[2, 8]`

- **Copy to Original Array:**
  - `[3, 9, 5, 7, 4, 6, 2, 8]`

---

##### Pass Two - `n` Elements Divided by 2
- **2 lists:**
  - `[3, 9, 5, 7]`
  - `[4, 6, 2, 8]`

- **Merge-Sort Subarrays:**
  - `[3, 5, 7, 9]`
  - `[2, 4, 6, 8]`

- **Copy to Original Array:**
  - `[3, 5, 7, 9, 2, 4, 6, 8]`

---

##### Pass Three - `n` Elements Divided by 2
- **1 list:**
  - `[3, 5, 7, 9, 2, 4, 6, 8]`

- **Merge-Sort Subarrays:**
  - `[2, 3, 4, 5, 6, 7, 8, 9]`

- **Copy to Original Array:**
  - `[2, 3, 4, 5, 6, 7, 8, 9]`

---

###### Efficiency
- 8 elements divided by 2, **4 arrays**
- 8 elements divided by 2, **2 arrays**
- 8 elements divided by 2, **1 array**
- **3 total passes**

```plaintext
8 / 2 / 2 / 2
8 / 2 ** 3
log(8) = 3 // log without base is assumed to be base 2 in computer science
```

Therefore, `log(n)` = total number of passes for any given `n`.

- Each merge operation involves comparing and possibly moving each element…
- So `n` operations take place, the total number of elements.
- Since we perform these `n`-proportional operations at each level of depth, and the depth is `log(n)`…
- The total time complexity is `O(n log(n))`.

---

###### In Summary
For an array of 8 elements `(n = 8 where log(8) = 3)`, the `O(n log(n))` complexity means that the sorting process involves a series of operations that grows linearly with the number of elements (`n`) and the depth of the recursive tree. This results in a highly efficient sorting process for large datasets.