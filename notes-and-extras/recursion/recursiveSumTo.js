// "SUM TO" FUNCTIONS (IN ORDER OF SPEED, FASTEST TO SLOWEST)

function sumToArithmeticSeries(n) {
  return n * (n + 1) / 2;
  // ? the amount of terms in the series times the sum of 
  // ? the first and last number in the progression… all divided by 2
}
// ! console.log(sumToArithmeticSeries(5)); // * 15

// > --------------------------------------------------------------

function sumToIterative(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}
// ! console.log(sumToIterative(5)); // * 15

// > --------------------------------------------------------------

function sumToRecursive(n) {
  if (n === 1) return 1;
  return n + sumToRecursive(n - 1);
}
// ! console.log(sumToRecursive(5)); // * 15

// ? On first call n = 5, so we take a recursive step where the function is called again with n - 1 (4)
// 💭 execution context #1: 'sumToRecursive(5)'
//    this context calls 'sumToRecursive(4)', so this one is paused until 'sumToRecursive(4)' returns

// ? On second call n = 4, so we take a recursive step where the function is called again with n - 1 (3)
// 💭 execution context #2: 'sumToRecursive(4)'
//    this context calls 'sumToRecursive(3)', so this one is paused until 'sumToRecursive(3)' returns

// ? On third call n = 3, so we take a recursive step where the function is called again with n - 1 (2)
// 💭 execution context #3: 'sumToRecursive(3)'
//    this context calls 'sumToRecursive(2)', so this one is paused until 'sumToRecursive(2)' returns

// ? On fourth call n = 2, so we take a recursive step where the function is called again with n - 1 (1)
// 💭 execution context #4: 'sumToRecursive(2)'
//    this context calls 'sumToRecursive(1)', so this one is paused until 'sumToRecursive(1)' returns

// ? On fifth call n = 1, so we take a recursive step where the function is called again with n - 1 (0)
// 💭 execution context #5: 'sumToRecursive(1)'
//    this context calls 'sumToRecursive(0)', so this one is paused until 'sumToRecursive(0)' returns

// ? On sixth call n = 0, so we take our base step which returns 1 and is immediately popped off the stack...
// 💭 execution context #6: 'sumToRecursive(0)'
//   this context returns n, which is 0

// Then we work back up the recursive chain... unwind...

// Execution Context:

// sumToRecursive(0) returns 0 to sumToRecursive(1);
// 1 + (0) = 1
// Returns 1 to sumToRecursive(2)

// 2 + (1) = 3
// Returns 3 to sumToRecursive(3)

// 3 + 3 = 6
// Returns 6 to sumToRecursive(4)

// 4 + 6 = 10
// Returns 10 to sumToRecursive(5)

// 5 + 10 = 15
// Returns 15!

// > --------------------------------------------------------------

function sumToTailRecursive(n, accumulator = 0) {
  console.log(n, accumulator);
  if (n < 1) {
    return accumulator;
  } else {
    return sumToTailRecursive(n - 1, n + accumulator);
    // ? solely returns recursive step… 
    // ? (enabling Tail Call Optimization where available)
  }
}

console.log(sumToTailRecursive(5));

// ? sumToTailRecursive(5, 0);
// params: {n = 5, accumulator = 0}; // 5 + 0

// ? calls sumToTailRecursive(n - 1, n + accumulator)
// params: {n = 4, accumulator = 5} // 4 + 5

// ? calls sumToTailRecursive(n - 1, n + accumulator)
// params: {n = 3, accumulator = 9} // 3 + 9

// ? calls sumToTailRecursive(n - 1, n + accumulator)
// params: {n = 2}, accumulator = 12} // 2 + 12

// ? calls sumToTailRecursive(n - 1), n + accumulator}
// params: {n = 1, accumulator = 14} // 1 + 14

// ? calls sumToTailRecursive(n - 1), n + accumulator}
// params: {n = 0, accumulator = 15 }
// ! returns accumulator (15) since n < 1;

// * If the engine used TCO (Tail Call Optimization)
// * these optimizations would occur using ONE stacking context
// * updating the parameters in place.

// * The reason why this version of the function is available
// * For tail call optimization is because the function solely calls the function again,
// * … the first version returns an operation on the RETURN of the function...
// * NOT a tail call.
// * The JavaScript engine needs to maintain each calls context on the stack until it
// * completes so that it can add 'n' to the result of the recursive call.