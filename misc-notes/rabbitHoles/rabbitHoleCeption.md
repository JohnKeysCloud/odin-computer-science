### Prototype vs static methods
**Prototype Method**: 
 - A prototype method is a method that is only accessible when you create an instance of the class. 

**Static Method**:
  - A static method is something you can call without instantiating the class. 

---  

### javaScript: for...of vs forEach vs for...in
* `for...of`
  - iterates over the values of an iterable object (arrays, strings, maps, sets, etc.)
  - does _not_ work with objects
  - can use break, continue, and return statements
  - can be used with async/await
  - can be used with generators
  - can be used with custom iterable objects

* `forEach`
  - only works with arrays
  - does not work with objects
  - does not work with async/await
  - does not work with generators
  - does not work with custom iterable objects
  - does not support break, continue, or return statements

* `for...in`
  - iterates over the enumerable properties of an object
  - can be used with arrays, **but not recommended**
  - can be used with objects
  - can be used with strings
  - can be used with maps
  - can be used with sets
  - can be used with custom iterable objects
  - does not work with async/await
  - does not work with generators
  - does not support break, continue, or return statements

---

### Creating Copies of Data Structures in JavaScript
Creating copies of data structures in JavaScript is essential for maintaining data integrity. There are several methods to make copies of data, depending on the type of data (e.g., objects, arrays) and the depth of the copy required (shallow vs. deep copy). Here are some common techniques:

#### 1. **Shallow Copy**

Shallow copies only duplicate the top-level structure of the data, not nested structures.

##### Arrays
- **Spread Operator (`...`)**: Creates a new array with the same top-level elements.
  ```javascript
  const newArray = [...oldArray];
  ```
- **Array methods (`slice`, `concat`)**: These methods also return a new array.
  ```javascript
  const newArray = oldArray.slice();
  // or
  const newArray = [].concat(oldArray);
  ```

##### Objects
- **Object Spread**: Similar to arrays, this only copies enumerable own properties.
  ```javascript
  const newObject = {...oldObject};
  ```
- **Object.assign()**: Used to copy properties from one or more source objects to a target object.
  ```javascript
  const newObject = Object.assign({}, oldObject);
  ```

#### 2. **Deep Copy**

Deep copies replicate every layer of the data structure, useful when objects contain other objects or arrays.

- **JSON Serialization**: This method involves converting an object to a JSON string and then parsing that string back into a new object. It's a quick way to deep copy but doesn't work with methods, undefined, or circular references.
  ```javascript
  const deepCopy = JSON.parse(JSON.stringify(oldObject));
  ```
- **Recursive Copy**: Manually implementing a recursive function to traverse and copy all elements of an object or array. This is customizable and can handle complex structures.
  ```javascript
  function deepCopy(obj) {
      if (obj === null || typeof obj !== 'object') {
          return obj;
      }
      let temp = obj.constructor(); // give temp the original obj's constructor
      for (let key in obj) {
          temp[key] = deepCopy(obj[key]);
      }
      return temp;
  }
  ```

- **Libraries**: Libraries like Lodash provide utility functions (e.g., `_.cloneDeep`) that safely copy deep objects.
  ```javascript
  const deepCopy = _.cloneDeep(oldObject);
  ```

#### 3. **Using Structured Cloning**

- **Structured Clone Algorithm**: Recently, browsers have started supporting the structured clone algorithm natively via `structuredClone()`. This method can clone almost any JavaScript object, including complex structures with cycles.
  ```javascript
  const clonedObject = structuredClone(oldObject);
  ```

#### Choosing the Right Method

- **For simple, flat structures**: Use shallow copying techniques.
- **For nested or complex structures**: Use deep copying techniques, especially if the data structure contains nested arrays, objects, or special types.
- **For handling functions, dates, or special objects**: JSON methods won't work, and manual or library-supported methods are preferred.
- **For modern browsers with complex needs**: `structuredClone()` is a robust choice.

Each of these methods serves different needs and comes with its own set of limitations and benefits, so choosing the right approach depends on the specific requirements and constraints of your application.

---

### "Recombination/Reconstruction" of a number from its constituent parts in reference to word/register size

> This type of knowledge is more characteristic of roles that require deep interaction with the system hardware or optimization of low-level operations. Out of scope for most software engineering roles.

#### Formula:

`r1 * 2^w + r0`

#### Example:
Imagine you have a number that is too big, and we split it into two parts.
We'll choose a small _word size_ for simplicity--let's say `w = 4` bits.

This means our system can 'naturally' handle up to 16 different values before needing to split them. 

Now, lets take a relatively large number to see the effect.

Original number: `1234`

1. Splitting the number:
  To fit this in our 4-bit world, we'll pretend we have to plit it into two parts: r1 and r0, where:
  - `r0` (lower order part, the last four digits): `1234` (In our simple analogy, we'll treat the whole number as the lower order part)
  - `r1` (higher order part): `0` (for this example, we'll keep it simple and say there are no preceding high order digits).

💡 In simple terms, r1 is the amount of times we can fit our number into the word/register size truncated… while r0 is the remainder.

Now using `w = 4` bits, `2^w = 2^4 = 16`.

2. Combining the Number:
  We combine them using the formula mentioned above: 

  `r1 * 2^w + r0`

  In our case, since r1 is 0 and r0 is 1234, the formula simplifies to:

  `0 * 16 + 1234 = 1234`

Implementing this in code would look like this:
```js
const w = 4;
const r1 = 0;
const r0 = 1234;

const reconstructedNumber = r1 * Math.pow(2, w) + r0;
console.log(reconstructedNumber); // 1234
```

**Bit Size and 2^w**
  - In the context of splitting and recombining numbers, using `2^w` is used to define a division point or a scale factor, not the maximum value a number can hold in `w` bits.

  - `2^w` represents the number of distinct values (or states) that can be represented with `w` bits, which ranges from 2^1 to 2^64 (in a 64-bit system)… or `0 to 2^w - 1` depending on the word/register size.


#### Realistic Computational Example:
To show how it might actually be used in a computational sense with real splitting, let's take the number 200.

1. Original number: `200`
2. Split into two parts
  * Assume `w = 3` bits. 
  - `r0` (lower order part): `200 % 8 = 0`
  - `r1` (higher order part): `200 / 8 = 25` 
3. Recombine the number:
  - `r1 * 2^w + r0`
  - `25 * 8 + 0 = 200`

💡 Even though the highest achievable number with 3 bits is 7, the use of 2^3, which equals 8, in our example serves a different purpose. It is used as a scaling factor for division and recombination, not as a limit for value representation in this context.

r0 is the remainder of the division of N by 2^w: 
`r0 = N mod 2^w`
Therefore r1 is the quotient of the division of N by 2^w:
`r1 = N / 2^w`

#### Non-Zero Remainder Example:
Let's take the number 237 and split it into two parts using `w = 4` bits:

``` javascript
let N = 237;
let w = 4;

// Splitting the number
// 237 / 16 = 14, remainder 13
let r0 = N % (2 ** w); // "low order" part
// ⌊ 237 / 16 ⌋ = 14 
let r1 = Math.floor(N / (2 ** w)); // "high order" part

// Reconstructing the number
// r1 * 2^w + r0
// 14 * 16 + 13 = 237
let reconstructedNumber = r1 * (2 ** w) + r0;

console.log(reconstructedNumber); // 237
```

---

### parseInt() Practical Usage
`parseInt()` is particularly useful and practical in scenarios where you need to convert strings into integers. Here are some common use cases where `parseInt()` is especially practical:

1. **Extracting Numbers from Strings:** When you have a string that contains numbers and you want to extract and use those numbers as integers. For example, parsing "100px" to get the number 100.
   ```javascript
   let value = "100px";
   let number = parseInt(value);  // returns 100
   ```

2. **Parsing User Input:** Often in web applications, user inputs are received as strings. If you expect numerical input, using `parseInt()` helps convert these inputs into integers before performing calculations or logic checks.
   ```javascript
   let userInput = "42";
   let age = parseInt(userInput);  // returns 42
   ```

3. **Reading Hexadecimal or Other Bases:** `parseInt()` is versatile in that it can interpret strings of numbers in different bases (radix). For instance, converting a hexadecimal color value into a decimal can be done using `parseInt()` with a radix of 16.
   ```javascript
   let hex = "1A3F";
   let decimal = parseInt(hex, 16);  // returns 6719
   ```

4. **Safe Parsing with Leading Zeros:** In cases where numbers might have leading zeros (and aren't meant to be interpreted as octal), `parseInt()` can ensure they're handled correctly, especially if you explicitly specify the radix as 10.
   ```javascript
   let paddedNumber = "000123";
   let number = parseInt(paddedNumber, 10);  // returns 123
   ```

5. **Data Processing from External Sources:** When data comes from external sources in a string format but needs to be processed numerically, `parseInt()` converts those data strings into usable integers.
   ```javascript
   let data = "fetchCount:50";
   let count = parseInt(data.split(':')[1]);  // returns 50
   ```

6. **Avoiding JavaScript Quirks:** JavaScript can behave unpredictably with the `Number` constructor or unary plus when faced with strings that contain non-numeric characters. `parseInt()` provides a more predictable and controlled way of parsing integers up to the first non-numeric character.
   ```javascript
   let weirdInput = "34.99 degrees";
   let temperature = parseInt(weirdInput);  // returns 34, ignores the rest
   ```

In each of these scenarios, the primary advantage of `parseInt()` is its ability to handle strings that start with numeric data but may include other characters, and its ability to explicitly handle different numerical bases. This makes it particularly suited for environments where data cleanliness and precision in how data is interpreted are crucial.

---

### new Array() vs Array.from()
Both `new Array(capacity).fill(null).map(() => [])` and `Array.from({ length: capacity }, () => [])` are valid methods for creating an array of distinct empty arrays, but they have slight differences in their implementation. 

💭: `new Array(capacity).fill([])` would create an array with length `capacity` with values all referring to the same array `[]`. We rarely if ever will need such naughty behavior.

Here’s a comparison to help decide which to use and when:

#### 1. `new Array(capacity).fill(null).map(() => [])`
- **Implementation**:
  ```javascript
  const arr = new Array(capacity).fill(null).map(() => []);
  ```
- **Description**: 
  - This method involves creating an array with a fixed capacity, filling it with `null` values, and then mapping each `null` to a new empty array.
  - This approach uses a two-step process (filling and then mapping), which might be seen as slightly less straightforward.

- **Common Use**: 
  - This method is less common because it involves an extra step (filling with `null`) before mapping.

- **Performance**: 
  - Performance-wise, it might be slightly less efficient due to the extra step of filling the array with `null` values.

#### 2. `Array.from({ length: capacity }, () => [])`
- **Implementation**:
  ```javascript
  const arr = Array.from({ length: capacity }, () => []);
  ```
- **Description**: 
  - This method uses `Array.from` with an object that specifies the length and a mapping function to create each element as a new empty array directly.
  - This approach is more direct and concise, as it combines array creation and element initialization in one step.

- **Common Use**: 
  - This method is more common because it is more straightforward and easier to read.
  - It's generally preferred in the JavaScript community for creating arrays with initialized values.

- **Performance**: 
  - Performance-wise, it’s typically more efficient because it doesn’t involve the extra step of filling the array with `null` values.

#### Choosing Between the Two
- **Readability and Conciseness**:
  - `Array.from({ length: capacity }, () => [])` is more concise and easier to read, making it the preferred choice in most cases.

- **Simplicity**:
  - If you prefer a more straightforward and single-step approach, `Array.from({ length: capacity }, () => [])` is better.

- **Existing Codebase or Style Guide**:
  - Sometimes the choice may depend on the existing codebase or style guide preferences within your team or project. If one method is more commonly used in your project, it might make sense to stick with that for consistency.

#### Example Scenario
If you are initializing a 2D array (an array of arrays) to represent a grid or matrix, and you need each sub-array to be a distinct instance:

- **Preferred Method**:
  ```javascript
  const grid = Array.from({ length: 5 }, () => []);
  ```

- **Less Common Method**:
  ```javascript
  const grid = new Array(5).fill(null).map(() => []);
  ```

#### Conclusion
For most cases, `Array.from({ length: capacity }, () => [])` is the recommended approach due to its conciseness and directness. However, if you have a specific reason to use the two-step process (such as modifying an existing pattern in your codebase), `new Array(capacity).fill(null).map(() => [])` is also a valid choice.

---

### Test
first for loop runs n times.

if n is 10 lets say

loop #1 runs 10 (0 - 10) [the first loop is 0, the last is 9]
in the first iteration, loop #2 doesn't run because j = 0

It does not run until the first loop reaches 5,
at which point loop #2 runs 1 times, and one more time for each iteration until reaching loop 9. So loop #2 runs 5 times in the last loop #1 iteration

1, 2, 3, 4, 5