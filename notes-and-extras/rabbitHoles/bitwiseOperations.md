# 🚀 Intro to bitwise operators:

- Bitwise operators are used to perform operations on binary numbers.
- They work on a bit-by-bit basis, which means they operate on the binary representation of numbers.
- Bitwise operators are very efficient because they are implemented at the hardware level in most processors.
- Bitwise operators are used to perform low-level operations such as bit manipulation, data compression, and encryption.

- The most common bitwise operators are:
  - `&` (AND): Sets each bit to 1 if both bits are 1… otherwise, the results will have a bit set to 0.
    for example:
    ``` javascript
    5 & 3
    // 5 in binary is 101
    // 3 in binary is 011
    // 101 & 011 = 001
    // 1 in decimal is 1
    ```

  - `|` (OR): Sets each bit to 1 if one of the bits is 1.
    for example:
    ``` javascript
    5 | 3
    // 5 in binary is 101
    // 3 in binary is 011
    // 101 | 011 = 111
    // 7 in decimal is 7
    ```

  - `^` (XOR): Sets each bit to 1 if only one of the bits is 1.
    for example:
    ``` javascript
    5 ^ 3
    // 5 in binary is 101
    // 3 in binary is 011
    // 101 ^ 011 = 110
    // 6 in decimal is 6
    ```

  - `~` (NOT): Inverts all the bits.
    for example:
    ``` javascript
    ~5
    // 5 in binary is 101
    // ~101 = 010
    // 2 in decimal is 2
    ```

  - `<<` (Left Shift): Shifts the bits to the left.
    for example:
    ``` javascript
    5 << 1
    // 5 in binary is 101
    // 101 << 1 = 1010
    // 10 in decimal is 10
    ```

  - `>>` (Right Shift): Shifts the bits to the right.
    for example:
    ``` javascript
    5 >> 1
    // 5 in binary is 101
    // 101 >> 1 = 10
    // 2 in decimal is 2
    ```

- Bitwise operators are used in many applications such as:
  - Data compression algorithms.
  - Cryptography algorithms.
  - Network protocols.
  - Device drivers.
  - Embedded systems.

Examples of bitwise operations:
  - `x % 16` is equivalent to `x & 15`
  - `x % 8` is equivalent to `x & 7`
  - `x % 4` is equivalent to `x & 3`
  - `x % 2` is equivalent to `x & 1`

  other bitwise operations are: 
  - `x << 1` is equivalent to `x * 2`
  - `x << 2` is equivalent to `x * 4`
  - `x << 3` is equivalent to `x * 8`
  - `x << 4` is equivalent to `x * 16`

  more bitwise operations are:
  - `x >> 1` is equivalent to `x / 2`
  - `x >> 2` is equivalent to `x / 4`
  - `x >> 3` is equivalent to `x / 8`
  - `x >> 4` is equivalent to `x / 16`

  more bitwise operations are:
  - `x & 1` is equivalent to `x % 2`
  - `x & 3` is equivalent to `x % 4`
  - `x & 7` is equivalent to `x % 8`
  - `x & 15` is equivalent to `x % 16`

  and some more:
  - `x | 1` is equivalent to `x + 1`
  - `x | 3` is equivalent to `x + 3`
  - `x | 7` is equivalent to `x + 7`
  - `x | 15` is equivalent to `x + 15`

- Using bit shifts which are computationally inexpensive, can substitute division or multiplication are bitwise operations.

---

## 🚀 Bit Shifting:
- The binary number representation of '5' is `101`.

**Left Shifts** _(multiplying by powers of 2)_ 
* `5 << 1`: this shifts the bits one position to the left, adding a zero at the end.
  - **Original**: `101`
  - **Shift left by 1**: `1010` (which is `10` in decimal system)
  - **Effect**: This is equivalent to multiplying 5 by 2… yielding `10`.

* `5 << 2`: this shifts the bits two positions to the left, adding two zeros at the end.
  - **Original**: `101`
  - **Shift left by 2**: `10100` (which is `20` in decimal system)
  - **Effect**: This is equivalent to multiplying 5  by 4… yielding `20`.

**Right Shifts**  _(dividing by powers of 2)_  
* `5 >> 1`: this shifts the bits one position to the right, removing the last digit.
  - **Original**: `101`
  - **Shift right by 1**: `10` (which is `2` in decimal system)
  - **Effect**: This is equivalent to dividing 5 by 2… yielding `2`.

* `5 >> 2`: this shifts the bits two positions to the right, removing the last two digits.
  - **Original**: `101`
  - **Shift right by 2**: `1` (which is `1` in decimal system)
  - **Effect**: This is equivalent to dividing 5 by 4… yielding `1`.

💭 Notice how during the shift right when we divided 5 by 2, it yielded 2. 
Bit shifts work differently because they operate on integers.
When performing a right shift on an integer in binary thats odd, the result is always rounded down to the nearest integer. The fractional part is truncated.
This is built into the shifting operators in most programming languages.

---

## Special Property of 2^n
`x % 2^n` can be replaced by `x & (2^n - 1)` or `(2^n - 1) & x`

For hashing purposes, we often use the modulo operator with a power of 2.
This is because the modulo operator is very fast and can be optimized by the compiler.
_When using the modulo operator with a power of 2, we can replace it with a bitwise AND operator (subtracting 1 from the operand that is a power of 2)._
This is because the binary representation of a power of 2 is a 1 followed by n 0s.
For example, `2^4 = 16 = 10000` in binary.
The binary representation of `16 - 1 = 15` is `1111`.
Therefore, `10 % 16` is equivalent to `10 & 15`.

### Example
```javascript

let arithmetic = 10 % (2 ** 4);
// ? 10 % 16 = Remainder of: 10 / 16 = 10

let bitwise = 10 & ((2 ** 4) - 1);
// ? 10 = 1010 (binary)
// ? 15 = 1111 (binary)
// ? 10 & 15 = 1010 & 1111 = 1010 = 10

console.log(arithmetic); // ? 10
console.log(bitwise); // ? 10
```

