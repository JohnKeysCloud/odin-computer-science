// * Description: Implement binary search in JavaScript.
// * Array must be sorted.

let testArray = [1, 4, 8, 9, 32, 55, 73];

function binarySearchRecursive(sortedArray, value) {
  let middleIndex = Math.floor(sortedArray.length / 2);

  if (value === sortedArray[middleIndex]) return true;

  if (value < sortedArray[middleIndex]) {
    return binarySearch(sortedArray.slice(0, middleIndex), value);
  } else if (value > sortedArray[middleIndex]) {
    return binarySearch(sortedArray.slice(middleIndex + 1), value);
  }

  return false;
}
// console.log(binarySearchRecursive(testArray, 33)); // False
// console.log(binarySearchRecursive(testArray, 32)); // True

// 💭 --------------------------------------------------------------

function binarySearchIterative(sortedArray, value) {
  while (sortedArray.length >= 1) {
    let middle = Math.floor(sortedArray.length / 2);

    if (sortedArray[middle] === value) return true;

    if (value > sortedArray[middle]) {
      sortedArray = sortedArray.slice(middle + 1);
    } else if (value < sortedArray[middle]) {
      sortedArray = sortedArray.slice(0, middle);
    }
  }
  return false
}
// console.log(binarySearchIterative(testArray, 33));
// console.log(binarySearchIterative(testArray, 33));

// 💭 --------------------------------------------------------------

function binarySearchTraditional(sortedArray, value) {
  let lowIndex = 0;
  let highIndex = sortedArray.length - 1;

  while (lowIndex <= highIndex) {
    let middleIndex = Math.floor((lowIndex + highIndex) / 2);

    if (sortedArray[middleIndex] === value) return true;

    if (value < sortedArray[middleIndex]) {
      highIndex = middleIndex - 1;
    } else {
      lowIndex = middleIndex + 1;
    }
  }

  return false;
}
// console.log(binarySearchTraditional(testArray, 32));