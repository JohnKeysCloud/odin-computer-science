// ? Calculates the product of 2 Integers - Similar to how manual multiplication is done by hand.

function integerMultiplication(x, y) {
  const xDigits = x.toString().split('').map(a => Number(a)); 
  const yDigits = y.toString().split('').map(a => Number(a));

  const partialProducts = [];

  for (let i = xDigits.length - 1; i >= 0; i--) {
    for (let j = yDigits.length - 1; j >= 0; j--) {
      const product = xDigits[i] * yDigits[j];
      const zeros = '0'.repeat(xDigits.length - 1 - i + yDigits.length - 1 - j);
      partialProducts.push(product + zeros);
    }
  }

  console.log(partialProducts);
}
