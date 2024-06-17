function getNthFibTermIterative(n) {
  let previous = 0;
  let current = 1;

  if (n < 0) throw new Error('Argument cannot be less than zero.');
  if (n === 0) return 0;

  for (let i = 2; i <= n; i++) {
    let sum = previous + current;

    previous = current;
    current = sum;
  }
  return current;
}
// ! console.log(getNthFibTermIterative(10));

function getNthFibTermIterativeTwo(n) {
  const sequence = [0, 1];

  while (sequence.length < n) {
    let [previous, current] = sequence.slice(-2);
    sequence.push(previous + current);
  }
  return sequence;
}
// !console.log(getNthFibTermIterativeTwo(5));

function getNthFibRecursive(n) {
  if (n < 0) throw new Error("Nth Fibonacci term can't be negative.");

  if (n < 2) {
    // base case
    return n;
  } else {
    // recursive case
    return getNthFibRecursive(n - 1) + getNthFibRecursive(n - 2);
  }
}
// ! console.log( getNthFibRecursive(6));

// *                                                                     fib(6)
// *                                                                fib(5) + fib(4)
// *                                                 fib(4) + fib(3)        +        fib(3) + fib(2)
// *                         (fib(3) + fib(2))   +  (fib(2) + fib(1)          +          (fib(2) + fib(1))  +  (fib(1) + fib(0))
// *       [(fib(2) + fib(1)) + (fib(1) + fib(0))] + [(fib(1) + fib(0)) + 1]    +           [(fib(1) + fib(0)) + 1]  +  (1 + 0)
// *           [(fib(1) + fib(0)) + 1] +  (1 + 0)  +   (1 + 0 + 1)          +            (1   +   0   +  1)    +    1
// *                   (1 + 0 + 1 + 0)     +    1     +      2            +                            2   +    1
// *                           2           +    1     +      2            +                                3
// *                                                                      8

// > --------------------------------------------------------------

function getFibArrayToNthTermIterative(n) {
  if (n <= 1) return n === 1 ? [0] : [];

  let sequence = [0, 1];
  for (let i = 2; i < n; i++) {
    sequence.push(sequence[i - 2] + sequence[i - 1]);
  }

  return sequence;
}
// ! console.log(getFibArrayToNthTermIterative(8));

function getFibArrayToNthTermRecursive(n, sequence = [0, 1]) {
  if (n <= 1) return n === 1 ? [0] : [];
  if (sequence.length >= n) return sequence.slice(0, n); // * {1}

  let [previous, current] = sequence.slice(-2);
  sequence.push(previous + current);

  return getFibArrayToNthTermRecursive(n, sequence);
}
// * {1} prevents the length of the sequence from having a greater length than n;
// ! console.log(getFibArrayToNthTermRecursive(8));

function fibonacciRecursiveTwo(n) {
  if (n <= 1) return n === 1 ? [0] : [];
  if (n === 2) return [0, 1];

  let sequence = fibonacciRecursiveTwo(n - 1);
  sequence.push(sequence[sequence.length - 1] + sequence[sequence.length - 2]);

  return sequence;
}
// ! console.log(fibonacciRecursiveTwo(2)); // This now correctly returns [0, 1, 1, 2, 3], 5 elements as expected.

// recursive case calls

// fibonacciRecursiveTwo(5)
// n = 5, sequence.length = 4
// passes condition
// sequence[sequence.length - 1] -> sequence[3]
// sequence[sequence.length - 2] -> sequence[2]
// sequence[3] + sequence[2] = 3
// 3 pushed to sequence
// [0, 1, 1, 2, 3] returned

// fibonacciRecursiveTwo(4);
// n = 4, sequence.length = 3
// passes condition
// sequence[sequence.length - 1] -> sequence[2]
// sequence[sequence.length - 2] -> sequence[1]
// sequence[2] + sequence[1] = 2
// 2 pushed to sequence
// [0, 1, 1, 2] returned to above

// fibonacciRecursiveTwo(3);
// n = 3, sequence.length = 2
// passes condition
// sequence[sequence.length - 1] -> sequence[1]
// sequence[sequence.length - 2] -> sequence[0]
// sequence[1] + sequence[0] = 1
// 1 pushed to sequence
// [0, 1, 1] returned to above

// fibonacciRecursiveTwo(2);
// n = 2, sequence.length = 2
// fails condition
// [0, 1] returned to above

// fibonacciRecursiveTwo(1);
// n = 1
// [0, 1] returned to above

