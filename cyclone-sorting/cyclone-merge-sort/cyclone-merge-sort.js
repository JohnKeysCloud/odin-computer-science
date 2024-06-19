// 💭 Merge-Sort:
// * The idea of the algorithm is to sort smaller arrays
// * and then combine those arrays together (merge them)
// * in sorted order.

// 💭 --------------------------------------------------------------

// ? Worst-case scenario:
// * We have to split n elements up and then recombine them,
// * effectively doubling the sorted subarrays as we build them up
// * (Combining sorted 1-element arrays into 2-element arrays,
// * combining sorted 2-element arrays into 4-element arrays…)

// ? Best-case scenario;
// * The array is already perfectly sorted. But we still have to split
// * and recombine it back together with this algorithm.

// 💭 --------------------------------------------------------------

// ? Pseudocode:
// * Sort the left half of the array (assuming n 💭 1)
// * Sort the right half of the array (assuming n 💭 1)
// * Merge the two halves together

// ? example:
// *  🟣 🟣 🟣  🔴 🔴 🔴
// * [5, 2, 1, 3, 6, 4]

// * Purple half can't be divided evenly so we arbitrarily consider the left side the "left half"
// * Start at 5 … a single element array is already sorted
// * 5 is placed in a temporary array that we can call the "left side of the purple half array"

// * Move on to the right half of the purple sub-array [2, 1]
// * The left half of this array is already sorted [2]
// * Its placed in the "right side of the purple half" temporary array

// * The right half of the left half is already sorted [1]
// * Its placed in the "right side of the purple half" temporary array

// * Third step, merge the two halves together
// * Of the two, 1 is lower… so it is placed in a new hypothetical array
// * 2 is added to the same hypothetical array after

// * By this point in the steps we have sorted the purple array
// * Left half: 5
// * Right half (sorted): 1, 2

// * Step 3 (merge the two halves) for entire purple sub-array
// * The 2 halves are [5] and [1, 2]
// * We use the first element of the first and second parts
// * 5 is compared to 1
// * 1 is placed into a new 3-element array
// * 5 is compared to 2
// * 2 is placed into the 3-element array
// * 5 is compared to nothing
// * 5 is places into the 3-element array

// * The left half of the overall red array is sorted

// * Now we sort the red half of the main array with the same steps
// * Its arbitrarily divided
// * 3 is sorted
// * [6, 4]
// * 6 is already sorted, 4 is already sorted
// * Array is sorted and merged [4, 6]
// * Merge step…
// * 3 is compared to 4,
// * 3 is placed in new 3-element array
// * "Is 4 lower or is nothing"
// * Theres nothing left on the left side, so we know everything left on the
// * right side comes down to the 3-element array

// * [[1, 2, 5] [3, 4, 6]]
// * Now that we have sorted the halves of the main array
// * We move on to step 3 for the main array

// * What is lower, 1 or 3
// * 1 is added to final sorted array
// * What is lower, 2 or 3
// * 2 is added to final sorted array
// * What is lower, 5 or 3
// * 3 is added to final sorted array
// * What is lower, 5 or 4
// * 4 added to final sorted array
// * What is lower, 5 or 6
// * 5 added to final sorted array
// * What is lower, 6 or nothing
// * 6 added to final sorted array
// * [1, 2, 3, 4 , 5, 6]

// 💭 --------------------------------------------------------------
// 💭 2-way merge sort (iterative method) // (could be an array or a linked list)

// * NOTATION CONVENTION:
// * The notation 𝑚 and 𝑛 is commonly used to represent the SIZES of two input arrays in algorithms, 
// * specifically when describing the time complexity of merging or combining the two arrays.
// * However, it often makes sense to name variables based on the specific arrays or data structures 
// * in the project, as this enhances code clarity and maintainability. By giving meaningful names that 
// * reflect the project's specific arrays, you can make the code easier to understand for both current 
// * and future developers. 

// PARAM: Lists: a, b | List Sizes | m, n
let a = [2, 8, 15, 18]; // ? m elements
let b = [5, 9, 12, 17]; // ? n elements

function mergeTwoArrays(a, b) {
  // ? compare the elements, return the list
  let mergedArray = []; // ? will have m + n elements
  // ? 𝞱(m + n) time complexity.
  // ? 𝞱(m + n) space complexity.
  
  let m = a.length - 1;
  let n = b.length - 1;

  let i = 0; // ? pointer for array 'a'
  let j = 0; // ? pointer for array 'b'
  let k = 0; // ? pointer for 'mergedArray'

  // ? Loop ends when one of the arrays has been fully iterated through
  while (i <= m && j <= n) { 
    if (a[i] < b[j]) {
      mergedArray[k++] = a[i++]; // * {1}
    } else {
      mergedArray[k++] = b[j++];
    }
  }

  // ? if there are still elements left in array 'a'
  for (; i <= m; i++) {
    mergedArray[k++] = a[i];
  }

  // ? else if there are still elements left in array 'b'
  for (; j <= n; j++) {
    mergedArray[k++] = b[j];
  }

  return mergedArray;
}

// ! console.log(mergeTwoArrays(a, b));

// * {1}
// appended `++` means the unincremented value is used
// so we are adding the lower value of the 2, to the empty array
// and incrementing to move onto the next index of array 'c' & 'a'
// the same applies to the else condition code

// 💭 --------------------------------------------------------------
// 💭 Sorting a single array using 2-way merge sort
// * treat each value as a list
// * compare pairs of values from LTR

// ? const exampleArray = [9, 3, 7, 5, 6, 4, 8, 2];

// ? passOne - n elements are divided by 2
// 4 lists:
// [9, 3] [7, 5] [6, 4] [8, 2]
// merge-sort subarrays
// [3, 9, 5, 7, 4, 6, 2, 8]
// copy to original array

// ? passTwo - n elements are divided by 2
// 2 lists:
// [3, 9, 5, 7] [4, 6, 2, 8]
// merge-sort subarrays
// [3, 5, 7, 9, 2, 4, 6, 8]
// copy to original array

// ? passThree - n elements are divided by 2
// 1 list
// [3, 5, 7, 9, 2, 4, 6, 8]
// sort array
// [2, 3, 4, 5, 7, 7, 8, 9]

// ? Efficiency:
// * 8 elements divided by 2, 4 arrays
// * 8 elements divided by 2, 2 arrays
// * 8 elements divided by 2, 1 array
// * 3 total passes
// * 8 / 2 / 2 / 2
// * 8 / 2 ** 3
// * log(8) = 3; // log without base is assumed to be base 2 in computer science
// * Therefore log(n) = total number of passes for any given n
// * Each merge operation involves comparing and possibly moving each element…
// * So n operations take place, the total number of elements
// * Since we perform these n-proportional operations at each level of depth, and the depth is log(n)…
// * The total time complexity is O(nlog(n))!

// ? In summary:
// * for an array of 8 elements(n = 8 where log⁡(8) = 3), the O(nlog(n)) complexity means that the sorting
// * process involves a series of operations that grows linearly with the number of elements (n) depth of the recursive tree.
// * This results in a highly efficient sorting process for large datasets.

// 💭 --------------------------------------------------------------
// 💭 mergeSort (merging is done in post order traversal)

const testArray1 = [3, 2, 1, 13, 8, 5, 0, 1];
const testArray2 = [105, 79, 100, 110, 3];

// console.log(mergeSort(testArray1));
// console.log(mergeSort(testArray2));

function merge(leftHalfOfArray, rightHalfOfArray) {
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
}

function mergeSort(array) {
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

// 💭 --------------------------------------------------------------
// 💭 Step-by-Step Explanation (using: `testArray1 = [3, 2, 1, 13, 8, 5, 0, 1]`);

// * Initial invocation `mergeSort(testArray1)`:
// *   First recursive call:
// *     `leftHalfOfArray = [3, 2, 1, 13]`
// *     `rightHalfOfArray = [8, 5, 0, 1]`

// * Second recursive call:
// *   For `leftHalfOfArray = [3, 2, 1, 13]`:
// *     `leftHalfOfArray = [3, 2]`
// *     `rightHalfOfArray = [1, 13]`

// * Third recursive call:
// *   For `leftHalfOfArray = [3, 2]`:
// *     `leftHalfOfArray = [3]`
// *     `rightHalfOfArray = [2]`

// * Base case:
// *   Each of `[3]` and `[2]` is a single-element array.
// *   They are returned directly as the `leftHalfOfArray` and `rightHalfOfArray` respectively.

// * Merge `[3]` and `[2]`:
// *   `merge([3], [2])` returns `[2, 3]` to the second recursive call's `leftHalfOfArray` variable.

// * Sorting `[1, 13]`:
// *   `mergeSort([1, 13])`:
// *     `leftHalfOfArray = [1]`
// *     `rightHalfOfArray = [13]`

// * Base case:
// *   Each of `[1]` and `[13]` is a single-element array.
// *   They are returned directly as the `leftHalfOfArray` and `rightHalfOfArray` respectively.

// * Merge `[1]` and `[13]`:
// *   `merge([1], [13])` returns `[1, 13]` to the second recursive call's `rightHalfOfArray` variable.

// * Final merge of the left half of the initial array:
// *   `merge([2, 3], [1, 13])` returns `[1, 2, 3, 13]` to the `leftHalfOfArray` variable of the initial recursive call.

// * Sorting the right half of the initial array:
// *   `mergeSort([8, 5, 0, 1])` is called and the same process is followed:
// *     Split into:
// *       `leftHalfOfArray = [8, 5]`
// *       `rightHalfOfArray = [0, 1]`
// *     Each sub-array is further split and merged to form `[0, 1]` and `[5, 8]`.

// * Final merge of both sorted halves of the main array:
// *   `merge([1, 2, 3, 13], [0, 1, 5, 8])` returns the fully sorted array `[0, 1, 1, 2, 3, 5, 8, 13]`.
