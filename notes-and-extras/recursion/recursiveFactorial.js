function factorial(n) {
  if (n < 0) {
    throw new Error('Factorials cannot be negative.');
  } else if (n === 0 || n === 1) {
    return 1;
  } else if (n === 2) return 2;

  return n * factorial(n - 1);
}

console.log(factorial(4));

function factorialTernary(n) {
  if (n < 0) {
    throw new Error('Factorials cannot be negative.');
  } else if (n === 0 || n === 1) return 1;

  return n === 2 ? 2 : n * factorialTernary(n - 1);
}

console.log(factorialTernary(5));

// factorial(5): param n = 5, calls n * factorial(4)
// factorial(4): param n = 4, calls n * factorial(3)
// factorial(3): param n = 3, calls n * factorial(2)
// factorial(2): param n = 2, returns 2

// back to factorial(3) => n * factorial(2) = 3 * 2 = 6
// back to factorial(4) => n * factorial(3) = 4 * 6 = 24
// back to factorial(5) => n * factorial(4) = 5 * 24
// returns 120 :)

// > --------------------------------------------------------------

function factorialIterative(n) {
  if (n < 0) throw new Error('Factorial cannot be less than zero.');
  if (n === 0) return 1; // factorial of 0 is 1

  let product = 1;
  for (let i = 2; i <= n; i++) {
    product *= i;
  }

  // or
  // while (n > 0) {
  //  product * = n
  //  n--;
  // }

  return product;
}
