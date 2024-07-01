// > --------------------------------------------------------------
// > Q1: Sum all numbers:
// * Write a function called 'sumRange'.
// * It will take a number and return the sum of all numbers from 1 up to the number passed in.

// ? arithmetic series
function sumAllArithmeticSeries(n) {
  return ((n + 1) * n) / 2;
  // sum first and last times the total number of terms in the series… all divided by 2
}
// ! console.log(sumAllArithmeticSeries(5));

// ? iterative approach
function sumAllIterative(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) sum += i;

  return sum;
}
// ! console.log(sumAllIterative(5));

// ? TCO recursive approach (not available in JS engines)
function sumAllRecursiveTCO(n, accumulator = 0) {
  if (n < 0) throw new Error('Positive integers only.');
  return n === 0 ? accumulator : sumAllRecursiveTCO(n - 1, accumulator + n);
}
// ! console.log(sumAllRecursiveTCO(5));

// ? recursive approach
function sumAllRecursive(n) {
  if (n < 0) throw new Error('Positive integers only.');
  return n === 1 ? 1 : n + sumAllRecursive(n - 1);
}
// ! console.log(sumAllRecursive(5));

// > --------------------------------------------------------------
// > Q2: Power function
// * Write a function called 'power' which takes in a base and an exponent.
// * If the exponent is 0, return 1.

// ? definition approach
function powerByDefinition(base, exponent) {
  if (base < 0 || exponent < 0)
    throw new Error('The base nor exponent may be negative.');
  if (exponent === 0) return 1;
  return base ** exponent;
}
// ! console.log(powerByDefinition(2, 5));

// ? iterative approach
function powerIterative(base, exponent) {
  if (base < 0 || exponent < 0)
    throw new Error('The base nor exponent may be negative.');

  if (exponent === 0) return 1;

  let product = 1;
  while (exponent !== 0) {
    product *= base;
    exponent--;
  }
  return product;
}
// ! console.log(powerIterative(2, 5));

// ? recursive approach (first attempt)
function powerRecursiveLessElegant(base, exponent) {
  if (base < 0 || exponent < 0)
    throw new Error('The base nor exponent may be negative.');
  if (exponent === 0) return 1;

  if (exponent === 1) return base;
  return base * powerRecursiveLessElegant(base, exponent - 1);
}
// ! console.log(powerRecursiveLessElegant(2, 5));

// ? recursive approach (quiz solution)
function powerRecursive(base, exponent) {
  if (base < 0 || exponent < 0)
    throw new Error('The base nor exponent may be negative.');
  if (exponent === 0) return 1;

  return base * powerRecursive(base, exponent - 1);
}
// ! console.log(powerRecursive(2, 5));

// > --------------------------------------------------------------
// > Q3: Factorial function

function factorialIterative(n) {
  let product = 1;
  while (n !== 0) {
    product *= n;
    n--;
  }
  return product;
}
// ! console.log(factorialIterative(5));

// ? recursive approach
function factorialRecursive(n, accumulator = 1) {
  if (n < 0) {
    throw new Error("Factorial can't be negative.");
  } else if (n === 0) return accumulator;

  return factorialRecursive(n - 1, accumulator * n);
}
// ! console.log(factorialRecursive(5));

// > --------------------------------------------------------------
// > Q4: Check all values in an array
// * Write a function called 'all' which accepts an array and a
// * callback and returns true if every value in the array returns
// * true when passed as parameter to the callback function.

// * Sample:
// * var allAreLessThanSeven = all([1,2,9], function(num){
// * 	return num < 7;
// * });

// * console.log(allAreLessThanSeven); // false

// ? jabaScript built-in (intentionally mispelled)
function allBuiltIn(array, callback) {
  return array.every(callback);
}
// ! console.log(allBuiltIn([1, 2, 9], (num) => num < 7));

// ? iterative approach
function allIterative(array, callback) {
  for (let i = 0; i < array.length; i++) {
    if (!callback(array[i])) return false;
  }

  return true;
}
// ! console.log(allIterative([1, 2, 9], (num) => num < 7));

// ? recursive approach (first attempt) [BETTER THAN QUIZ SOLUTION]
function allRecursive(array, callback) {
  const arrayCopy = [...array];

  if (!arrayCopy.length) return true;
  if (!callback(arrayCopy.pop())) return false;

  return allRecursive(arrayCopy, callback);
}
// ! console.log(allRecursive([1, 2, 9], (num) => num < 7));

// ? recursive approach (quiz solution) [MINE IS BETTER]
function allRecursiveQuiz(array, callback) {
  var copy = copy || array.slice(); // ? shallow copies array

  if (copy.length === 0) return true;

  if (callback(copy[0])) {
    copy.shift(); // ? remove first element from array
    return allRecursiveQuiz(copy, callback);
  } else {
    return false;
  }
}
// ! console.log(allRecursiveQuiz([1, 2, 9], (num) => num < 7));

// ? recursive approach (chat gpt supposed better solution)
function allRecursiveEfficient(array, callback, index = 0) {
  // base case: if we've checked all elements
  if (index === array.length) return true;

  // if the current element fails the condition, return false immediately
  if (!callback(array[index])) return false;

  return allRecursiveEfficient(array, callback, ++index);
  // or index + 1 (it's prepended so that the function uses the incremented value immediately)
}
// ! console.log(allRecursiveEfficient([1, 2, 9], (num) => num < 7));

// > --------------------------------------------------------------
// > Q5: Product of an array
// * write a function called 'productOfArray' which takes in an array of numbers
// * and returns the product of them all.

// ? iterative approach (first attempt)
function productOfArrayIterative(array, index = 0) {
  let product = 1;
  while (array.length !== index) {
    product *= array[index];
    index++;
  }
  return product;
}
// ! console.log(productOfArrayIterative([3, 2, 5]));

// ? iterative approach (removing index parameter for readability);
function productOfArrayIterativeTwo(array) {
  let product = 1;
  for (let i = 0; i < array.length; i++) {
    product *= array[i];
  }
  return product;
}
// ! console.log(productOfArrayIterativeTwo([3, 2, 5]));

// ? recursive approach (first attempt) [BETTER THAN QUIZ SOLUTION]
function productOfArrayRecursive(array, index = 0, accumulator = 1) {
  return index === array.length
    ? accumulator
    : productOfArray(array, index + 1, accumulator * array[index]);
}
// ! console.log(productOfArrayRecursive([3, 2, 5]));

// ? recursive approach (quiz solution) [MINE IS BETTER]
function productOfArrayQuizOne(array) {
  if (array.length === 0) return 1;

  return array.shift() * productOfArrayQuizOne(array);
}
// !console.log(productOfArrayQuizOne([3,2,5]));

// ? recursive approach (modified quiz solution) [Array.prototype.pop() IS MORE EFFICIENT]
function productOfArrayQuizTwo(array) {
  if (array.length === 0) return 1;

  return array.pop() * productOfArrayQuizTwo(array);
}
// !console.log(productOfArrayQuizTwo([3,2,5]));

// > --------------------------------------------------------------
// > Q6: Search JS object
// * write a function called 'contains' that searches for a value in a nested object.
// * It returns true if the object contains that value.

let nestedObject = {
  data: {
    info: {
      stuff: {
        thing: {
          moreStuff: {
            magicNumber: 44,
            something: 'foo2',
          },
        },
      },
    },
  },
};

// ? Recursive approach (first attempt)
function contains(object, value) {
  // * {1} DFS
  for (const key in object) {
    if (object[key] === value) {
      return true;
    }

    if (typeof object[key] === 'object' && object[key] !== null) {
      if (contains(object[key], value)) return true; // * {2}

      //  ⬇️ INCORRECT (SEE {2} BELOW)
      // return contains(object[key], value)
    }
  }

  return false;
}
// ! console.log(contains(nestedObject, 44)); // true
// ! console.log(contains(nestedObject, 'foo')); // false

// * {1} 'DEPTH-FIRST SEARCH' method
// (Generally efficient for JabaScript objects,
// which are not typically deeply nested or exeedingly large;
// However, the worst-case scenario, where the value doesn't exist,
// requires traversing the entire object, which could be
// time consuming for very large or deeply nested objects)

// * {2}
// The difference between the conditional version
// and just returning the recursive function call:
// 'return contains(object[ley], value);'
// ...is the exploration of all options vs
// premature termination

// In plain words, the version without the conditional stops
// at the first child object of its parent object and calls the function
// without checking if the current object had more objects that
// might have had the value we are searching for

// Effect of Immediate Return:
// If the recursive call returns false (…meaning the value wasn't
// found in this particular nested object),
// the function halts and returns false without continuing to
// check other properties or nested objects at the same level.
// This could potentially miss the value if it's located in a
// different nested object within the same parent object or
// further along in the same nested object's structure.

// ? recursive approach (JoshDevHub solution) [MOST ELEGANT ✨]
function containsJoshDevHub(object, searchValue) {
  // DFS also

  // base case // * {1}
  if (typeof object !== 'object' || object === null) {
    return object === searchValue;
  }

  // recursive case // * {2}
  for (const value of Object.values(object)) {
    if (containsJoshDevHub(value, searchValue)) {
      // recursively call contains for each value (instead of immediately returning from the first value!)
      return true; // * {3}
    }
  }

  return false;
}
// ! console.log(containsJoshDevHub(nestedObject, 44)); // true
// ! console.log(containsJoshDevHub(nestedObject, 'foo')); // false

// * {1}
// If the one of the conditions is met, it means that the object
// is not an object itself, but rather a primitive value or null.

// * {2}
// If the object is an Object (but not null), iterate over its values

// * {3}
// If the searchValue is found in any nested object, return true (from base case on next call)

// > --------------------------------------------------------------
// > Q7: Parse a multi-dimensional array
// * Given a multi-dimensional integer array, return the total number
// * of integers stored inside this array

// * Sample:
// * var seven = totalIntegers([[[5], 3], 0, 2, ['foo'], [], [4, [5, 6]]]); // 7

// ? recursive approach (first attempt) [BETTER THAN QUIZ SOLUTION]
function totalIntegers(array, accumulator = 0) {
  // * {1}
  // DFS

  for (const value of array) {
    if (Number.isInteger(value)) {
      accumulator++;
    } else if (Array.isArray(value)) {
      accumulator = totalIntegers(value, accumulator);
    }
  }

  return accumulator;
}
! console.log(totalIntegers([[[5], 3], 0, 2, ['foo'], [], [4, [5, 6]]])); // 7

// * {1}
// The recursive call hits every array nested within the first array before
// moving onto the next value of the array

// In the test call for example:
// First value of the MAIN array is another array…
// [[5], 3]
// RECURSIVE STEP++
// context paused

// First value of nested array, [[5], 3] is another array…
// [5]
// RECURSIVE STEP++
// context paused

// First value of nested array [5] is an integer
// 'accumulator' is incremented once in this call and
// 'accumulator' is assigned that new value… 1
// 'accumulator' (equal to 1) is returned to the context of the initial array [[5], 3]

// The next value in that array is tested
// 3 is an integer, so 'accumulator' is incremented to 2
// 'accumulator' is returned to the context of the MAIN array

// End of MAIN array FIRST value evaluation

// The next value in the MAIN array is an integer... 0,
// 'accumulator' is incremented
// 'accumulator' is returned to the next iteration of
// the 'for…of' loop

// The next value in the MAIN array is an integer... 2,
// 'accumulator' is incremented
// 'accumulator' is returned to the next iteration of
// the 'for…of' loop
// The next value in the MAIN array is an integer,
// 'accumulator' is incremented
// 'accumulator' is returned to the next iteration of
// the 'for…of' loop

// . . . etc.

// * Extra note:
// ['foo'] - when this 'value' is reached,
// there are no integers so the accumulator retains
// its previous value and returned to the context of main array

// ? recursive approach (quiz solution) [MINE IS BETTER]
function totalIntegers(array) {
  if (array.length === 0) return 0;

  let total = 0;
  let first = array.shift();

  if (Array.isArray(first)) {
    // recursive step // * {1}
    total += totalIntegers(first);
  } else if (Number.isInteger(first)) {
    total += 1;
  }

  return total + totalIntegers(array);
}

// > --------------------------------------------------------------
// > Q8: Write 'sumSquares' function
// * Write a function that sums squares of numbers in a list that may contain more lists
// * FUN FACT: In JabaScript, arrays are often referred to as lists
// * (ordered, accessible, mutable, heterogeneous)

// * Sample:
// *
// * var l = [1,2,3];
// * console.log(SumSquares(l)); // 1 + 4 + 9 = 14
// *
// * l = [[1,2],3];
// * console.log(SumSquares(l)); // 1 + 4 + 9 = 14
// *
// * l = [[[[[[[[[1]]]]]]]]]
// * console.log(SumSquares(l)); // 1 = 1
// *
// * l = [10,[[10],10],[10]]
// * console.log(SumSquares(l)); // 100 + 100 + 100 + 100 = 400

// ? recursive approach (first attempt) [TCO OPTIMIZED, SLIGHTLY LESS READABLE]
function sumSquares(array, accumulator = 0) {
  if (array.length === 0) return 0;

  for (const value of array) {
    if (typeof value === 'number' && !isNaN(value)) {
      accumulator += value ** 2;
    } else if (Array.isArray(value)) {
      accumulator = sumSquares(value, accumulator);
    }
  }

  return accumulator;
}
// !  console.log( sumSquares( [1, 2, 3] ) ); // 1 + 4 + 9 = 14
// !  console.log( sumSquares( [[1, 2], 3] ) ); // 1 + 4 + 9 = 14
// !  console.log( sumSquares( [[[[[[[[[1]]]]]]]]] ) ); // 1 = 1
// !  console.log( sumSquares( [10, [[10], 10], [10]] ) ); // 100 + 100 + 100 + 100 = 400

// ? recursive apporach (quiz solution enhanced) [MORE TRADITIONAL APPROACH]
function sumSquaresQuizSolution(array) {
  if (array.length === 0) return 0;

  let total = 0;
  for (let i = 0; i < array.length; i++) {
    if (typeof array[i] === 'number' && !isNaN(array[i])) { // * {1} {2}
      total += array[i] ** 2; // * {3}
    } else if (Array.isArray(array[i])) {
      total += sumSquares(array[i]);
    } 
  }

  return total;
}
// ! console.log( sumSquaresQuizSolution( [1, 2, 3] ) ); // 1 + 4 + 9 = 14
// ! console.log( sumSquaresQuizSolution( [[1, 2], 3] ) ); // 1 + 4 + 9 = 14
// ! console.log( sumSquaresQuizSolution( [[[[[[[[[1]]]]]]]]] ) ); // 1 = 1
// ! console.log( sumSquaresQuizSolution( [10, [[10], 10], [10]] ) ); // 100 + 100 + 100 + 100 = 400

// * {1} Enhancement 1:
  // Add check for if type of current value is a number

// * {2} Enhancement 2:
  // Swapped conditionals position so recursive case is beneath base case
  // (convention/readability/logical progression/consistency)

// * {3} Enhancement 3:
  // Use exponent operator instead of accumulator = array[i] * array[i]

// > --------------------------------------------------------------
// > Q9: Write 'replicate' function
// * The function should return an array containing repetitions of the number argument.
// * replicate(amount, number)

// * Sample
// console.log(replicate(3, 5)) // [5, 5, 5]
// console.log(replicate(1, 69)) // [69]
// console.log(replicate(-2, 6)) // []

// ? built in method 1: 'Array.from':
function replicate(amount, number) {
  return amount > 0 ? Array.from({ length: amount }, () => number) : [];
}

// ? built in method 1: 'Array.fill':
function replicate(amount, number) {
  return amount > 0 ? new Array(amount).fill(number) : [];
}

// ? iterative approach (first attempt)
function replicateIterative(amount, number) {
  let array = [];
  if (amount < 0) return array;

  while (amount !== 0) {
    array.push(number);
    amount--
  }

  return array;
}
// ! console.log(replicateIterative(3, 5)) // [5, 5, 5]
// ! console.log(replicateIterative(1, 69)) // [69]
// ! console.log(replicateIterative(-2, 6)) // []

// ? recursive approach (first attempt) [MORE MEMORY EFFICIENT]
function replicateRecursive(amount, number, array = []) {
  if (amount <= 0) { // base case
    return array;
  } else { // recursive case
    array.push(number);
    replicateRecursive(amount - 1, number, array);
    return array;
  }
}
// ! console.log(replicateRecursive(3, 5)) // [5, 5, 5]
// ! console.log(replicateRecursive(1, 69)) // [69]
// ! console.log(replicateRecursive(-2, 6)) // []

// ? recursive apporach (quiz solution) [MORE ELEGANT & CONCISE] 
function replicateRecursiveElegant(amount, number) {
  if (amount <= 0) return [];

  return [number].concat(replicate(amount - 1, number)); // * {1}
}
// ! console.log(replicateRecursiveElegant(3, 5)) // [5, 5, 5]
// ! console.log(replicateRecursiveElegant(1, 69)) // [69]
// ! console.log(replicateRecursiveElegant(-2, 6)) // []

// * {1} First log explained // PARAM: (3, 5)
// Order of results: numbers sequentially -> letters alphabetically

  // the first return from the recursive case:
  // 1. [5].concat(replicate(3, 5));
    // d. returns [5]concat([5, 5]) -> [5, 5, 5]
  
  // 2. [5].concat(replicate(2, 5))
    // c. returns [5].concat([5]) -> [5, 5] to initial call

  // 3. [5].concat(replicate(1, 5))
    // b. returns [5].concat([]) -> [5] to previous call
    
  // 4. [5].concat(replicate(0, 5))
    // a. returns [] to the previous call


