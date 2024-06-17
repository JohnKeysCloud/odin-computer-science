// * first attempt (messy state handling):
let collatz = 0;
function getCollatz(n) {
  if (n < 1) throw new Error('Must be greater than zero');

  if (n === 1) return collatz;
  collatz++;
  return n % 2 === 0 ? getCollatz(n / 2) : getCollatz(3 * n + 1);
}

// ? The use of a global variable to track the number of steps means
// ? the collatz variable must be reset to 0 before calling getCollatz(n)
// ? for a new value, which could lead to errors if forgotten.

console.log(getCollatz(7));

// > --------------------------------------------------------------

// * pure function version
function getCollatz(n) {
  if (n < 1) throw new Error('Must be greater than zero');

  if (n === 1) return 0;
  return n % 2 === 0 ? 1 + getCollatz(n / 2) : 1 + getCollatz(3 * n + 1);
}

console.log(getCollatz(7));