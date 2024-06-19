// 💭 --------------------------------------------------------------
// 💭 2-way Merge Sort 

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

// 💭 --------------------------------------------------------------
// 💭 2-way Merge (Formal, Iterative Method)
let a = [2, 8, 15, 18];
let b = [5, 9, 12, 17];

function mergeFormal(a, b) {
  let mergedArray = [];

  // ? array lengths
  let m = a.length - 1;
  let n = b.length - 1;

  // ? pointers
  let i = 0; // for `a`
  let j = 0; // for `b`
  let k = 0; // for `mergedArray`

  while (i <= m && j <= n) {
    if (a[i] < b[j]) {
      mergedArray[k++] = a[i++];
    } else {
      mergedArray[k++] = b[j++];
    }
  }

  for (; i <= m; i++) {
    mergedArray[k++] = a[i];
  }

  for (; j <= n; j++) {
    mergedArray[k++] = b[j];
  }

  return mergedArray;
}
console.log(mergeFormal(a, b));