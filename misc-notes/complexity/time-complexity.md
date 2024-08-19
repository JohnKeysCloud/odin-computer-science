## Asymptotic Notations

- Are used to describe the running time of an algorithm in terms of its input size.
- There are several notations that measure that running time in different ways..
- The most common notations are:

  > Big O - Represents the upper bound of the algorithm's running time. This means the worst-case scenario for how the algorithm will perform.

  > Omega - Represents the lower bound of the algorithm's running time. This means the best-case scenario for how the algorithm will perform.

  > Theta - Represents the average of both (the upper and lower bound) of the algorithm's running time. This means the average-case scenario for how the algorithm will perform.

## Big O Notation Introduction

It gives us a consistent way to measure the efficiency of an algorithm.
It gives us a measurement for the time it takes for an algorithm to run as the input grows so that you can directly compare the performance of two algorithms and pick the best one.

You will need to measure the how the number of steps changes as teh data grows, and using this you can apply a Big O Notation to it and compare it with those of other algorithms.

In many cases as a developer you will be using a data structure in which the ways you interact with it are well-known, and in that case it's easier to judge how it will scale as the input changes.

## Big O Notations (in speed order from fastest to slowest)

- O(1) - Constant Time
- O(log n) - Logarithmic Time
- O(n) - Linear Time
- O(n log n) - Linearithmic Time
- O(n^2) - Quadratic Time
- O(n^3) - Cubic Time
- O(2^n) - Exponential Time
- O(n!) - Factorial Time

// > ----------------------------------------------------------------------------------------------------------
// > ----------------------------------------------------------------------------------------------------------
// > ----------------------------------------------------------------------------------------------------------

## O(1) - Constant Time

- The running time of the algorithm is constant, regardless of the input size.

# Example:

```javascript
function addUpTo(n) {
  return (n * (n + 1)) / 2;
}
```

// > ----------------------------------------------------------------------------------------------------------

## O(log n) - Logarithmic Time

The running time of the algorithm grows logarithmically in proportion to the input size.
Logarithmic complexity tells us that the number os steps an algorithm takes increases by 1 as the data doubles.
That is still very efficient.
Going from 5,000 to 10,000 items and only taking one additional step can scale very well.

# Example: Binary Search, which only works on sorted arrays.

It guesses the middle item of the array.
If our value is less than the middle item, we can eliminate the right half of the array.
If our value is greater than the middle item, we can eliminate the left half of the array.
We can then repeat the process on the remaining half, and continue to eliminate half of the remaining array until we find our value.

```javascript
function binarySearch(arr, val) {
  let start = 0;
  let end = arr.length - 1;
  let middle = Math.floor((start + end) / 2);
  while (arr[middle] !== val && start <= end) {
    if (val < arr[middle]) {
      end = middle - 1;
    } else {
      start = middle + 1;
    }
    middle = Math.floor((start + end) / 2);
  }
  return arr[middle] === val ? middle : -1;
}
```

Array sizes : 1 | 2 | 4 | 8 | 16 | 32
Required Steps: 0 | 1 | 2 | 3 | 4 | 5

// > ----------------------------------------------------------------------------------------------------------

## O(n) - Linear Time Complexity

It tells us that as the umber of items grow, the number of steps grow at exactly the same rate.
Every time you iterate over an array is an example of Linear Complexity.
If you have an array of 10 items and you have to print out each item, you have to do 10 operations.
If you have an array of 1,000 items, you have to do 1,000 operations.

# Example:

```javascript
function linearSearch(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) return i;
  }
  return -1;
}
```

// > ----------------------------------------------------------------------------------------------------------

## O(n log n) - Linearithmic Time Complexity

It's slightly slower than linear time, but it's still very efficient.
It's a combination of O(n) and O(log n) algorithms.
It's the average time complexity for algorithms that divide the problem into smaller problems and then combine the results.

One such algorithm is the Merge Sort algorithm.
Another, is constructing a Cartesian Tree, where (for a sequence of distinct numbers) is a binary tree with the following properties:

- It is heap-ordered, so that each parent is less than its children.
- It is a binary search tree, so that the `inorder` traversal of the tree produces the original sequence.
  The algorithm naturally behaves like 0(N log N) without using smaller parts with O(N) or O(log N) time complexities inside.
  This shows that while nested complexities can be common, they're not the only way an algorithm can achieve a particular time complexity.

Cartesian Algorithm:

1. Position the node as the right child of the rightmost node.
2. Scan upward from the node’s parent up to the root of the tree until a node is found whose value is greater than the current value.
3. If such a node is found, set its right child to be the new node, and set the new node’s left child to be the previous right child.
4. If no such node is found, set the new child to be the root, and set the new node’s left child to be the previous tree.

# Example:

```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  let middle = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, middle));
  let right = mergeSort(arr.slice(middle));
  return merge(left, right);
}

function merge(leftHalfOfArray, rightHalfOfArray) {
  let mergedArray = [];

  let i = 0; // pointer for leftHalfOfArray
  let j = 0; // pointer for rightHalfOfArray

  while (i < leftHalfOfArray.length && j < rightHalfOfArray.length) {
    if (rightHalfOfArray[j] > leftHalfOfArray[i]) {
      mergedArray.push(leftHalfOfArray[i]);
      i++;
    } else {
      mergedArray.push(rightHalfOfArray[j]);
      j++;
    }
  }

  while (i < leftHalfOfArray.length) {
    // while the current index is less than the length of the left half of the array
    mergedArray.push(leftHalfOfArray[i]);
    i++;
  }
  while (j < rightHalfOfArray.length) {
    // while the current index is less than the length of the right half of the array
    mergedArray.push(rightHalfOfArray[j]);
    j++;
  }

  return mergedArray;
}
```

// > ----------------------------------------------------------------------------------------------------------

## O (n^2) - Quadratic Time Complexity

It's not very efficient, but it's not the worst.
It's commonly seen when you loop over a data set and within each loop you loop over it again.
Below, bubble sort is an example of an algorithm with quadratic time complexity.
Because theres a loop within a loop, the number of steps is n \* n = n^2
The outer loop iterates n times, and for each iteration of the outer loop, the inner loop can perform up to n - 1
comparisons and swaps in the WORST case (from which Big O is derived).
When we add the optimization for no swaps, the best case is O(n) and the worst case is O(n^2).

- Steps for `bubbleSort`:
  - [3,1,4,1,5,9] has 6 elements ... as it grows the number of steps grows quadratically.
  - The i loop runs 5 times maximum (assuming theres a swap in every iteration) because it starts at 6 and goes down to 1.
  - j runs one less than i in every iteration.
    - j is run 5 times in the first iteration,
    - j is run 4 times in the second iteration,
    - j is run 3 times in the third iteration,
    - j is run 2 times in the fourth iteration,
    - j is run 1 time in the fifth iteration.

!IMPORTANT: At the end of each iteration, the next largest number is bubbled up to the end of the array.

# Example:

```javascript
function bubbleSort(array) {
  for (let i = array.length; i > 0; i--) {
    let noSwaps = true; // assume the array is sorted

    for (let j = 0; j < i - 1; j++) {
      if (array[j] > array[j + 1]) {
        let temp = array[j]; // save the greater index value in a temp variable to assign it to the lower index
        array[j] = array[j + 1]; // swap lower index with greater index value
        array[j + 1] = temp; // swap greater index with lower index value

        noSwaps = false; // if a swap is made, the array is not fully sorted
      }
    }
    if (noSwaps) break; // if no swaps are made, the array is fully sorted… break loop
  }
  return array;
}
```

- Explanation
  [3,1,4,1,5,9]

- i = 6 ( 1st pass)

* compare pairs of numbers incrementing by one each time up to index 5
* j passes i - 1 (array.length - 1) = 5 index

  - Compare 3 and 1. Since 3 > 1, swap them. → [1,3,4,1,5,9,2]
  - Compare 3 and 4. Since 3 < 4, do nothing. → [1,3,4,1,5,9,2]
  - Compare 4 and 1. Since 4 > 1, swap them. → [1,3,1,4,5,9,2]
  - Compare 4 and 5. Since 4 < 5, do nothing. → [1,3,1,4,5,9,2]
  - Compare 5 and 9. Since 5 < 9, do nothing. → [1,3,1,4,5,9,2]
  - Compare 9 and 2. Since 9 > 2, swap them. → [1,3,1,4,5,2,9]

- i = 5 ( 2nd pass)

* compare pairs of numbers incrementing by one each time up to index 4
* i - 1 (array.length - 1) = 4

  - Compare 1 and 3. Since 1 < 3, do nothing. → [1,3,1,4,5,2,9]
  - Compare 3 and 1. Since 3 > 1, swap them. → [1,1,3,4,5,2,9]
  - Compare 3 and 4. Since 3 < 4, do nothing. → [1,1,3,4,5,2,9]
  - Compare 4 and 5. Since 4 < 5, do nothing. → [1,1,3,4,5,2,9]
  - Compare 5 and 2. Since 5 > 2, swap them. → [1,1,3,4,2,5,9]

- i = 4 ( 3rd pass)

* compare pairs of numbers incrementing by one each time up to index 3
* i - 1 (array.length - 3)
  - Compare 1 and 1. Since 1 = 1, do nothing. → [1,1,3,4,2,5,9]
  - Compare 1 and 3. Since 1 < 3, do nothing. → [1,1,3,4,2,5,9]
  - Compare 3 and 4. Since 3 < 4, do nothing. → [1,1,3,4,2,5,9]
  - Compare 4 and 2. Since 4 > 2, swap them. → [1,1,3,2,4,5,9]

- i = 3 ( 4th pass)

* compare pairs of numbers incrementing by one each time up to index 2
* i - 1 (array.length - 4)
  - Compare 1 and 1. Since 1 = 1, do nothing. → [1,1,3,2,4,5,9]
  - Compare 1 and 3. Since 1 < 3, do nothing. → [1,1,3,2,4,5,9]
  - Compare 3 and 2. Since 3 > 2, swap them. → [1,1,2,3,4,5,9]

- i = 2 ( 5th pass)

* compare pairs of numbers incrementing by one each time up to index 1
* i - 1 (array.length - 5)

  > At this point, the array is already sorted, but the algorithm does not know it yet. It will continue to compare elements until it reaches the end without needing any swaps.

  - Compare 1 and 1. Do nothing. → [1,1,2,3,4,5,9]
  - Compare 1 and 2. Do nothing. → [1,1,2,3,4,5,9]

  > Condition was never met in this iteration, so `noSwaps` remains true and the loop breaks

// > ----------------------------------------------------------------------------------------------------------

## O(n^3) - Cubic Time Complexity

It's not very efficient, but it's not the worst.
It's commonly seen when you loop over a data set and within each loop you loop over it again and again.
It's not very common, but it's not the worst.

# Example:

```javascript
function addUpTo(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    // runs n times
    for (let j = 1; j <= n; j++) {
      // runs n times
      for (let k = 1; k <= n; k++) {
        // runs n times
        total++;
      }
    }
  }
  return total;
}
```

// > ----------------------------------------------------------------------------------------------------------

## O(2^n) - Exponential Time Complexity

It's very inefficient.
It's commonly seen in algorithms that solve problems through recursion.
It's the slowest time complexity that we've seen so far.

# Example:

```javascript
function fibonacci(n) {
  if (n <= 2) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

// For each call, the function calls itself twice, and each of those calls calls itself twice, and so on.
// This is why the number of steps grows exponentially as n grows.

// > ----------------------------------------------------------------------------------------------------------

## O(n!) - Factorial Time Complexity

It's the worst time complexity.
It's commonly seen in algorithms that solve problems through generating all possible permutations of a set of numbers.

If you have an array and have to work out all the combinations of that array, the number of steps grows factorially.
It's manageable for small inputs, but it's not manageable for large inputs.

# Example:

```javascript
function generatePermutations(arr) {
  if (arr.length === 0) return [[]];
  let firstElement;
  let remainingElements;
  let partialPerms;
  let permutations = [];
  for (let i = 0; i < arr.length; i++) {
    firstElement = arr[i];
    remainingElements = arr.slice(0, i).concat(arr.slice(i + 1));
    partialPerms = generatePermutations(remainingElements);
    for (let j = 0; j < partialPerms.length; j++) {
      permutations.push([firstElement].concat(partialPerms[j]));
    }
  }
  return permutations;
}

console.log(generatePermutations([1, 2, 3]));
```

The above recursive function generates all the permutations of an array by taking the first element and then generating all the permutations of the remaining elements.

// > ----------------------------------------------------------------------------------------------------------
// > ----------------------------------------------------------------------------------------------------------
// > ----------------------------------------------------------------------------------------------------------

## Alternatives to Big O Notation

- Big O Notation is a great way to measure the efficiency of an algorithm, but it's not the only way.
- There are other ways to measure the efficiency of an algorithm, such as:
  - Omega Notation
  - Theta Notation
  - Little O Notation

// > ----------------------------------------------------------------------------------------------------------

# Big Ω (Omega notation)

As stated above, it represents the lower bound of the algorithm's running time.
This means the best-case scenario for how the algorithm will perform.

Take

```javascript
function linearSearch(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) return i;
  }
  return -1;
}
```

The worst case scenario for this algorithm is that the value we're looking for is the not in the array.
We would say it had linear complexity, O(n)… because the loop iterates through the entire array.

The best case scenario for this algorithm is that the value we're looking for is the first item in the array.
In this case our algorithm takes just one step.
This has a complexity of O(1).
This is Omega Complexity.

It isn't considered as useful because it is unlikely our item will often be the first value in our data structure search, so it doesn't give ua any idea how well the algorithm will scale.

// > ----------------------------------------------------------------------------------------------------------

# Big Θ (Big-Theta notation)

As stated above, in other words, Theta looks to give the exact value or a useful range between narrow upper and lower bounds.

Take

```javascript
function linearSearch(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) return i;
  }
  return -1;
}
```

- The worst case scenario for this algorithm is that the value we're looking for is the not in the array.
  We would say it had linear complexity, O(n).
- The best case scenario for this algorithm is that the value we're looking for is the first item in the array.
  In this case our algorithm takes just one step.
  This has a complexity of O(1).
- The average case scenario for this algorithm is that the value we're looking for is in the middle of the array.
  In this case our algorithm takes n/2 steps.
  This has a complexity of O(n).

- If we had some code that looper every item in an array no matter what, then is doesn't matter what the size of that array is... it will always take n steps.
  In this case, we would say that the algorithm has a complexity of O(n) and Omega Complexity of O(n) and Theta Complexity of O(n).

// > ----------------------------------------------------------------------------------------------------------
// > ----------------------------------------------------------------------------------------------------------
// > ----------------------------------------------------------------------------------------------------------

## So… why Big O?

Using a worst-case scenario we can make sure our algorithm will scale in all outcomes.
If we write an algorithm that could potentially run in constant time, but also could run in linear time in the worse case, it can only scale as teh input grows if it still works when the worst case does happen.
You need to be confident your code won't lock up and leave users frustrated if you suddenly get an input of a million items instead of 10.

// > ----------------------------------------------------------------------------------------------------------
// > ----------------------------------------------------------------------------------------------------------
// > ----------------------------------------------------------------------------------------------------------

## Algorithms with the same complexity

# Take the following two algorithms:

```javascript
// Single increments
function oddNumbersUpToNOne(n) {
  let currentNumber = 1;

  while (currentNumber < n) {
    // n times (up to n inclusive)
    if (currentNumber % 2 !== 0) {
      // n - 1 times
      console.log(currentNumber); // (n - 1) / 2
    }

    currentNumber += 1; // n - 1 times
  }
}

// Double increments
function oddNumbersUpToNTwo(n) {
  let currentNumber = 1; // n / 2 times

  while (currentNumber < n) {
    // n / 2 times (up to n inclusive)
    if (currentNumber % 2 !== 0) {
      // n / 2 times
      console.log(currentNumber); // n / 2 times (because currentNumber will always be odd)
    }

    currentNumber += 2; // n / 2 times
  }
}
```

For an input of n = 10, the first algorithm will run 10 times, and the second algorithm will run 5 times.
O(n) vs O(n / 2) … but they are the same as O(n) vs O(n) because we drop the constant and the coefficient in Big O Notation.
But in Big O Notation, we drop the constant and the coefficient, so both algorithms have a complexity of O(n).

// > ----------------------------------------------------------------------------------------------------------
// > ----------------------------------------------------------------------------------------------------------
// > ----------------------------------------------------------------------------------------------------------

## Assorted Notes

- A good rule-of-index (play on rule-of-thumb), is if possible, avoid nested for-loops if the input size is large. Use two separate loops instead.

// > ----------------------------------------------------------------------------------------------------------

- A practical scenario for when to use Big O to compare algorithms:

* Say we need to pull in some data from an API or a database. An array of 1000 users comes back and now you need to sort this array into alphabetical order...
* If we use a sorting algorithm with linear time (O(n)) complexity, where n is the input size, then there will be around 1000 operations.
* If we use a sorting algorithm with quadratic time (O(n^2)) complexity, then there will be roughly 1000 \* 1000 operations. Thats 1 MILLION operations.
* That's 999,000 more operations, just because you chose the less efficient algorithm for the given dataset.
* This is why it's important to understand Big O notation mf.

// > ----------------------------------------------------------------------------------------------------------

- What about built-in methods?

Take:

```javascript
let arr = [1, 2, 3, 4];
// Adding and removing to the end of the array => Big (1) - constant time
arr.push(5); // [1, 2, 3, 4, 5]
arr.pop(); // [1, 2, 3, 4]
arr.shift(); // [2, 3, 4]
arr.unshift(1); // [1, 2, 3, 4]
```

- With push & pop, all we do is create a new place at the he end of the array and place a value there. It doesn't matter how big the array is, it will always take the same amount of time. Big O(1) … constant time.
- But say we wanted to add a value to the front of the array via   `JabaScripz`'s built in: `unshift(value)`. We would have to re-index every item in the array, as the first index(0) would not point to our newly added value (0).
- We'd have to add 1 to every index in the array as the old first item is now the second, the old second index is now the third, and so on.
- Therefore shifting and unshifting have linear time complexity (O(n))because the longer the input array, the more items we have to re-index.

// > ----------------------------------------------------------------------------------------------------------

- Another logarithmic algorithm

```javascript
function logTime(arr) {
  let numberOfLoops = 0;

  for (let i = 1; i < arr.length; i *= 2) {
    numberOfLoops++;
  }
  return `${numberOfLoops} loops`;
}
let loopsA = logTime([1]); // 0 loops - array length is 1, i in first loop is 1
let loopsB = logTime([1, 2]); // 1 loop - array length is 2, i in second loop is 2
let loopsC = logTime([1, 2, 3, 4]); // 2 loops - array length is 4, i in third loop is 4
let loopsD = logTime([1, 2, 3, 4, 5, 6, 7, 8]); // 3 loops - array length is 8, i in fourth loop is 8
let loopsE = logTime(Array(16)); // 4 loops - array length is 16, i in fifth loop is 16
```

- The above function has a logarithmic time complexity (O(log n)) because the number of steps grows logarithmically in proportion to the input size.

* loop A
- n = 1 

// > ----------------------------------------------------------------------------------------------------------

* How to spot a Linearithmic Time Complexity:
  - Look for an outer loop that iterates through a list (n operations).
  - Then look to see if there is an inner loop; If the inner loop is cutting down/reducing the data set on each iteration (log(n) operations), then the overall algorithm has a Big O (n log(n)) time complexity.

Take:

```javascript
function linearithmic(n) {
  for (let i = 0; i < n; i++) { 
    for (let j = 1; j < n; j = j * 2) {  
      console.log("Hello");
    }
  }
}
```

- The outer loop iterates through the entire array (n operations).
- The inner loop iterates through the array, but on each iteration, it cuts the data set in half (log(n) operations).
- If we double the size of our input, n, the outer loop will have twice as many iterations whereas the inner loop would only have one more iteration.
- Therefore, the overall algorithm has a Big O (n log(n)) time complexity.

Example:
linearithmic(10)
- The outer loop iterates 10 times.
- The inner loop iterates 4 times.

linearithmic(11)
- The outer loop iterates 11 times.
- The inner loop iterates 4 times.

linearithmic(100)
- The outer loop iterates 100 times.
- The inner loop iterates 7 times.

* For the second loop, the number of steps required to reach a certain size of dataset gets smaller as teh dataset is halved (or reduced by a constant fraction) in each step. The base of the logarithm corresponds to the division factor; in this case, doubling corresponds to a base-2 logarithm.
* The key insight here is that the efficiency comes from not having to perform operations on every single element linearly. Instead, by exploiting this kind of exponential reduction, the algorithm reduces the number of operations needed to reach its goal, leading to faster execution times for large datasets compared to purely linear approaches.
* Reminder: `mergeSort` has big O(n log(n)) time complexity.

// > ----------------------------------------------------------------------------------------------------------

* Quick reminders:
  - Looping through 2 separate arrays one after another = O(a + b) Any step that happens one after another, we add them => +
  - Looping through 2 nested separate arrays = O (a * b) Any step that is nested, we multiply them => *

* Loops using same input:
  - Looping through same array one after another => O(n + n) => O(2n) => O(n) or Linear Time.
  - Looping through same array with 2 nested loops = O(n ^ 2) or Quadratic Time

// > ----------------------------------------------------------------------------------------------------------

* Dropping Constants

Take:

```javascript
const numbers = [1, 2, 3, 4, 5, 6]

// function recieves a single input
function printFirstHalf (list) {
  // iterates through list -> O(n) Linear time
  for (let i = 0; i < list.length / 2; i++) {
    console.log(list[i])
  }
}

printFirstHalf(numbers)
// Big O total => O (n / 2)
```

- The above function has a time complexity of O(n / 2) because it iterates through half of the input list.
- But we drop the constant and the coefficient in Big O notation, so the time complexity is O(n).
- Execution time is still dependent on the input length. Pattern wise, it is still directly linked to the length of input.


Another take:
  
```javascript
const numbers = [1, 2, 3]

// function recieves a single input
function printTwiceForNoReason (list) {
  // iterates through list -> O(n) Linear time
  for (let i = 0; i < list.length; i++) {
    console.log(list[i])
  }
  // iterates through the same list again -> O(n) Linear time
  for (let j = 0; j < list.length; j++) {
    console.log(list[j])
  }
}

printTwiceForNoReason(numbers)
// Big O total => O (n + n) => O (2n)
```

- The above function has a time complexity of O(n + n) because it iterates through the input list twice.
- But we drop the constant and the coefficient in Big O notation, so the time complexity is O(n).

// > ----------------------------------------------------------------------------------------------------------
// > ----------------------------------------------------------------------------------------------------------
// > ----------------------------------------------------------------------------------------------------------