# Test Driven Development 

This methodology emphasizes test-first development. Here we write a test _before_ writing just enough production code to fulfill that test and the go on to refactor the code. It is a way to think through our requirements or design before writing code. The goal is to write clean code that works.

The first step is to quickly add a test, basically just enough for your code to fail. Next you run your tests, often the complete test suite although for the sake of speed we may decide to run only a subset, to ensure that the new test does in fact fail. We then update our code to make it pass the new tests. Finally, we run our tests again and update our code until they pass.

![TDD Steps](./assets/tdd-steps.jpg)

## Intro

### TDD Benefits

#### Why should developers care about automated unit tests?

  - Keeps us out of the (time hungry) **debugger**.
  - Reduces **bugs** in new features and in existing features.
  - Reduces the **cost of change**.
  - Improves **design**.
  - Encourages **refactoring**.
  - Builds a **safety net** to defend against the dark arts. I mean other programmers.
  - It's **fun**? 🤨
  - Forces you to **slow down and think**.
  - Speeds up development by **eliminating waste**.
  - Reduces **fear**.

#### How does TDD take development to the next level?

  - Improves **productivity** by:
    * minimizing time spent **debugging**.
    * reduces the need for **manual (monkey) checking** by developers and tester.
    * helping developers to maintain focus.
    * reduce **wastage**: hand overs.
  - Improves **communication**.
  - Creating living, up-to-date **specification**.
  - Communicate **design decisions**.
  - **Learning**: listen to your code.
  - **Baby Steps**: slow down and think.
  - Improves **confidence**.
  - **Testable** code by **design** + safety net.
  - **Loosely-coupled** design.
  - **Refactoring**

### Summary

The importance of TDD cannot be overemphasized. It means less bugs, higher quality software, and a razor focus, but it can slow development down and the test suites can be tedious to manage and maintain. All in all, it is a recommended approach as **the Pros far outweighs the Cons**. 

---

## TDD: Fun Fun Function

### Why Unit Testing?

```javascript

const someOrder = {
  items: [
    { name: 'Dragon food', price: 0, quantity: 8 },
    { name: 'Dragon cage (small)', price: 800, quantity: 2 },
    { name: 'Shipping', price: 40, shipping: true }
  ]
};

const orderTotal = order => {
  const toalItems = order.items
  .filter(item => !item.shipping)
  .reduce((prev, curr) => prev + (curr.price * curr.quantity), 0);

  const shippingItem = order.items.find(item => !!item.shipping); // {1}

  const shippingPrice = totalItems > 1000 ? 0 : shippingItem.price;

  return totalItems + shipping;
}

const result = orderTotal(someOrder); // 1664
```

💭 **{1}** When you use a variable alone in a conditional statement (such as an `if` statement), JavaScript implicitly converts it to a boolean to determine whether the condition is true or false. This is part of JavaScript's type coercion mechanism; However, the explicit use of `!!` ensures that the variable is converted to a boolean value, making the code more readable and intention explicit. This can be especially useful in complex conditions where implicit type conversion might be less clear to the reader.

**Example of Implicit Conversion**:
```javascript
let shit = 'some shit';

if (shit) {
  console.log('Shit exists and its truthy.');
} else {
  console.log(`Shit does not exist or is falsy.`);
}
```

**Example of Explicit Conversion**:
```javascript
let value = 'some shit';

if (!!value) {
  console.log('Shit exists and its truthy.');
} else {
  console.log('Shit does not exist or is falsy.');
}
```

`!!` enhances:
  - **readability**: its use makes it clear that the intention is to treat the variable as a boolean.
  - **consistency**: explicitly converting to a boolean can prevent unexpected behavior from implicit type coercion in more complex expressions.
  - **clarity**: it makes the developers intention explicit, especially when dealing with expressions that might be confusing.

### Implementing Tests

#### Triangulation

Triangulation in TDD is a strategy used to ensure that code evolves through the introduction of multiple. incrementally more specific tests. This approach helps to gradually build up the complexity of the implementation while keeping focus on the behavior described by the tests.

**Steps**:
1. Write a test and see it fail.
2. Implement just enough code to make the test pass.
3. Write another test that fails due to a different reason.
4. Refactor and extend the code to make both tests pass.
5. Repeat the process.

This method helps ensure that the code is generalized properly and that it meets the requirements specified by the tests.

**Example**

**1. Write a Test and See it Fail:**

```javascript
// add.test.js

const add = require('./add');

test('adds 1 + 1 to equal 2', () => {
  expect(add(1,1)).toBe(2);
});
```

**2. Implement Just Enough Code to Make the Test Pass:**
_Now, we implement the `add` function to make the test pass._

```javascript
// add.js

function add(...nums) {
  return nums.reduce((acc, curr) => acc + curr, 0);
}

module.exports = add;
```

Run the test (`$ jest`). This test shall pass.

**3. Write Another Test That Fails for a Different Reason:**

```javascript
// add.test.js

const add = require('./add');

test('adds 1 + 1 to equal 2', () => {
  expect(add(1,1)).toBe(2);
});

test('adds 2 + 3 to equal 5', () => {
  expect(add(2, 3)).toBe(5);
});
```

Run the test (`$ jest`). Both tests pass because our implementation already covers these cases.

**4. Refactor and Extend the Code to Make Both Tests Pass:**
_At this point, our implementation is already correct for the given tests. Let's add a more complex test to ensure robustness._

```javascript
// add.test.js

const add = require('./add');

test('adds 1 + 1 to equal 2', () => {
  expect(add(1, 1)).toBe(2);
});

test('adds 2 + 3 to equal 5', () => {
  expect(add(2, 3)).toBe(5);
});

test('adds -1 + -1 to equal -2', () => {
  expect(add(-1, -1)).toBe(-2);
});
```

All tests pass.

**5. Repeat the Process:**
You can continue this process by adding more tests that cover edge cases and more complex scenarios, and refactor the code as needed. For example, you might add tests for non-integer values or very large numbers.

##### Summary

Triangulation helps in TDD by incrementally introducing tests that drive the implementation of a function or feature. Each new test should challenge the implementation in a new way, ensuring the code is robust and correctly generalized. By following this approach, you can build up the functionally step-by-step, refactoring and extending the code as new tests are added.

### Why Use Test Runners (i.e., Jest, Mocha, JA)
  - DRY Code
  - Pretty Test Results (Nicer outputs than a 'vanilla' option)
  - Predictable for team
  - CI (continuous integration)
  - Auto-runs

---

## Jest
Getting started: https://jestjs.io/docs/getting-started 

### Using Matchers

Jest uses "matchers" to let you test values in different ways.

#### Common Matchers

```javascript
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});
```

In this code `expect(2 + 2)` returns an "expectation" object. You typically won't do much better with these expectation objects except call matchers on them.
In this code, `toBe(4)` is the matcher.
When Jest runs, it tracks all the failing matchers so that it can print out nice error messages for you.

`toBe` uses `Object.is` to test exact equality.
If you want to check the value of an object, use `toEqual`:

```javascript
test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
});
```

`toEqual` recursively checks every field of an object or an array.

💡 Tip: `toEqual` ignores object keys with `undefined` properties, `undefined` array items, array sparseness, or object type mismatch. To take these into account use `toStrictEqual` instead.

You can also test for the opposite of a matcher using `not`:

```javascript 
test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect (a + b).not.toBe(0);
    }
  }
});
```

#### Truthiness

In tests, you sometimes need to distinguish between `undefined`, `null` and `false`, but you sometimes do not want to treat these differently. Jest contains helpers that let you be explicit about what you want:
  * `toBeNull` matches only `null`
  * `toBeUndefined` matches only `undefined`
  * `toBeDefined` is the opposite of `toBeUndefined`
  * `toBeTruthy` matches anything that an `if` statement treats as `true`
  * `toBeFalsy` matches anything that an `if` statement treats as `false`

You should use the matcher that most precisely corresponds to what you want your code to be doing. 

#### Numbers

Most ways of comparing numbers have matcher equivalents:

```javascript
test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqualTo(3.5);
  expect(value).toBeLessthan(5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
```
For floating point equality, use `toBeCloseTo` instead of `toEqual`, because you don't want a test to depend on a tiny rounding error:

```javascript
test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  // expect(value).toBe(0.3); This won't work because of rounding error
  expect(value).toBeCloseto(0.3); // This works
});
```

#### Strings

You can check strings against regular expressions with `toMatch`:

```javascript
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is an "ass" in pass', () => {
  expect('pass').toMatch(/ass/);
});
```

#### Arrays and Iterables

You can check if an array or iterable contains particular item using `toContain`:

```javascript
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'milk',
];

test('the shipping list has milk on it', () => {
  expect(shoppingList).toContain('milk');
  expect (new Set(shoppingList)).toContain('milk');
});
```

#### Exceptions

If you want to test whether a particular function throws an error when it's called, use `toThrow`.

```javascript
function compileAndroidCode() {
  throw new Error('you are using the wrong JDK!');
}

test('compiling android goes as expecrted', () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode().toThrow(Error));
  
  // You can also use a string that must be contained in the error message or a regexp
  expect(() => compileAndroidCode().toThrow('you are using the wrong JDK'));
  expect(() => compileAndroidCode().toThrow(/JDK/));

  // Or you can match an exact error message using a regexp like below
  expect(() => compileAndroidCode().toThrow(/^you are using the wrong JDK$/));
  expect(() => compileAndroidCode().toThrow(/^you are using the wrong JDK!$/));
});
```

💡 Tip: The function that throws an exception needs to be invoked within a wrapping function otherwise the `toThrow` assertion will fail.

### More Info

Complete matchers list: https://jestjs.io/docs/expect
Testing asynchronous code: https://jestjs.io/docs/asynchronous 

---

## James Sinclair (On TDD)
One weird trick that will change the way you code forever: JavaScript TDD.

### Why TDD
Test Driven Development is not about testing. It is a way of thinking and coding that just-so-happens to involve tests.
Test Driven Development is not the same thing as unit tests. Unit tests are a type of test. TDD is a coding technique.

### 2 Rules & 3 Steps for TDD
1. Write new code only if you first have a failing automated test.
2. Eliminate duplication.

**Three Steps to follow on from the two rules:**
1. **Red** - write a little test that doesn't work, perhaps doesn't even compile at first.
2. **Green** - make the test work quickly, committing whatever sins necessary in the process.
3. **Refactor** - eliminate all the duplication created in just getting the test to work.

#### Example

**Step 1: Write a Failing Test (Red)**
First, we'll write a test that we know will fail because the function we want to test doesn't exist yet.

```javascript
// sum.test.js

const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

```
Run the test with Jest.

In _my_ workflow, I have it introduced this capability in my `package.json` scripts such that all I need do is run `npm test` and all test files of my choosing run their tests.
See my Jest test code for source code: 
https://github.com/JohnKeysCloud/jest-test 

The test should fail because `sum` is not defined:

``` bash 
Test suite failed to run

Cannot find module './sum' from 'sum.test.js'
```

**Step 2: Make the Test Work (Green)**
Next, we'll create the `sum` function and make the test pass, even if it means committing "sins" (e.g. hard-coding the return value).

```javascript
// sum.js

function sum(a, b) {
  return 3; // Hardcoded to pass the test
}
```

Run the test again (however your workflow requires that you do. I dunno ask ChatGPT or sumn'. It's probably `jest` 💭).

…`npm run test`

This time, the test should pass:
```bash
PASS  ./sum.test.js
 ✓ adds 1 + 2 to equal 3 (2 ms)
```

**Step 3: Refactor**
Now that the test is passing, we can refactor the code to eliminate duplication and make it more robust:

```javascript
// sum.js

// * My set up:
export function sum(...numbers) {
  return numbers.reduce((accumulator, current) => accumulator += current, 0); // Refactored to correctly add the numbers
}

// *  Probably your set up 🤢:
//     
//    function sum(a, b) {
//      return a + b; // Refactored to correctly add the numbers
//    }
//    module.exports = sum;

```

Run the test again: `npm test || jest` 

They test should still pass:

``` bash
 PASS  ./sum.test.js
  ✓ adds 1 + 2 to equal 3 (2 ms)
```

**Additional Tests**
To ensure our function work for different inputs, let's add more test. 

```javascript
// sum.test.js

import { sum } from './sum';

// *  Probably your set up 🤢:
//     
//    const sum = require('./sum');

test('add 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('add -1 + 1 to equal 0', () => {
  expect(sum(-1, 1)).toBe(0);
});

test('adds 0 + 0 to equal 0', () => {
  expect(sum(0, 0)).toBe(0);
});
```

Run the tests again : `npm test || jest`

All tests should pass, ensuring that our function works as expected:

```bash
PASS  ./sum.test.js
 ✓ adds 1 + 2 to equal 3 (2 ms)
 ✓ adds -1 + 1 to equal 0
 ✓ adds 0 + 0 to equal 0
 ```

 #### Summary
 By following the TDD approach, we:
 1. Wrote a failing test.
 2. Made the test pass quickly, even if it meant writing suboptimal code.
 3. Refactored the code to improve it while ensuring the test still passes.

 This cycle helps ensure that our code is reliable and maintainable, with a suite of tests that verify its correctness.

### More On the Steps
These steps are fairly simple, but when followed they produce some powerful results, so long as you are _using your brain_.
The real value is not in the tests themselves, but in the way it teaches you to think about coding, and the confidence it gives you in your code.


### Flickr API Walkthrough

#### 2 Rules & 3 Steps in Action
Test file name: `flickr-fetcher.test.js`

```javascript
//* jest + JavaScript ES6 Syntax

// flikr-fetcher.test.js

import flickrFetcher from 'flickr-fetcher.js'

test('flickrFetcher exists', () => {
  expect(flickrFetcher).toBeDefined();
  expect('photoObjToURL()', () => {

  });
});

test('')
```

This test is super simple. It does nothing other than check that ifx default export from `flickr-fetcher.js` exists. If it is defined to be exact (anything but `undefined`).

The Same test in `Mocha` testing framework/environment with the` Chai` assertion library would look like this:

```javascript
// * Mocha & Chai + CommonJS syntax
// flickr-fetcher-spec.js
// eslint-env mocha <!-- ! {1} --->

// `expect` assertion import in CommonJS syntax
let expect = require('chai').expect; // after installing Chai and Mocha

describe('FlickrFechter', function() {
  it('should exist', function () {
      expect(require('./flickr-fetcher')).to.exist;
  });
});
```

**Using Jest**
In **Jest**, with my workflow, I run any and all tests of my choosing via `npm test`. I even have a neat watch script, which updates my test results whenever I save any file in the project. 😎

If I run said `watch` script in our example, our test would automatically fail and be displayed in _red_.

This concludes **Step 1 - Red** 
This is good news because it means we can move onto the next step.

_Step 2_ is to make the test pass. At this stage, we focus on the simplest possible implementation to make the test pass.

The simplest implementation is to create a module. On _my machine_ (where I use ES6 Import/Export Syntax), this involves creating a default export value in the file `flickr-fetcher.js` that can be imported in the test file. In `CommonJS`, you can use `module.exports = {};` to create an empty module that can be required in other files.

At this point, we are at **Step 2 - Green**, as our test has a status of `pass`.

Now, we refactor! Is there any duplication? No. Is there anything we can do to improve our code? Possibly. Here is a small improvement to our previous `CommonJS` module:

```javascript
// flickr-fetcher.js

let flickrFetcher = {};

module.exports = flickrFetcher;
```

This makes it a bit clearer what's going on without adding any new (untested) functionality.

We run our test again and we have successfully reached **Step 3 - Green (Refactoring)**

#### Practical `Flickr` API Example 

The **Flickr API** gives us photo data in `JSON` form.
It doesn't give us URLs for the images (because we have to tell it what size we want).
So, we need a function that will take a photo object and transform it into a URL.
Here is an example of what Photo objects look like:

```json
{
  "id":       "25373736106",
  "owner":    "99117316@N03",
  "secret":   "146731fcb7",
  "server":   "1669",
  "farm":     2,
  "title":    "Dog goes to desperate measure to avoid walking on a leash",
  "ispublic": 1,
  "isfriend": 0,
  "isfamily": 0
}
```
We want a URL that looks like this:
"https://farm2.staticflickr.com/1669/25373736106_146731fcb7_b.jpg"

The Flickr API documentation describes the way we make the _transform_ using the following template:
https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg 

This gives us enough information to write a test:

```javascript
// flickr-fetcher.test.js

import flickrFetcher from './flickr-fetcher.js';

test('flickrFetcher exists', () => {
  expect(flickrFetcher).toBeDefined();
});

test('photoObjToURL() takes a photo object and returns a URL', () => {
  const input = {
    id:       '25373736106',
    owner:    '99117316@N03',
    secret:   '146731fcb7',
    server:   '1669',
    farm:     2,
    title:    'Dog goes to desperate measure to avoid walking on a leash',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0
  }
  const actual = flickrFetcher.photoObjToUrl(input)
  const expected = 'https://farm2.staticflickr.com/1669/25373736106_146731fcb7_b.jpg';

  expect(actual).toBe(expected);
});
```

This just passes the example photo object into the new function (that we have yet to write). Therefore our test will fail. We are at **Step 1 - Red** again.

Now, to get the test to pass we need to write our `photoObjToURL` function and get our test to pass. The simplest way to do this would be to simply return the URL we expect:

```javascript
// flickr-fetcher.js

export default {
  photoObjToURL: () => 'https://farm2.staticflickr.com/1669/25373736106_146731fcb7_b.jpg',
};
```


#### **{1}** - Quick Chai Break
_(referring to the code snippet above)_

**Chai** provides _assertion styles_ which include, but are not limited to, `expect` and `should`.

**Mocha** is the actual test framework. It allows you to organize your tests into logical units using `describe` blocks, which help group related tests together. Within these `describe` blocks, you define individual test cases using `it` blocks. Mocha also supports hooks (`before`, `after`, `beforeEach`, `afterEach`) for setup and teardown, and handles asynchronous testing.

**Chai**’s `expect` assertion style supports a range of assertions for verifying code behavior, such as `expect(*).to.exist` (a modern alternative to the deprecated `to.be.defined`).

**Jest** is an all-in-one solution that includes a test runner, an assertion library, and additional features like mocking and snapshot testing. In contrast, Mocha and Chai are often used together where Mocha handles test execution and structure, and Chai provides assertions.

**Summary**

| **Tool**  | **Role**              | **Main Features**                                                                                         |
|-----------|-----------------------|-----------------------------------------------------------------------------------------------------------|
| **Chai**  | Assertion Library    | `expect`, `should`, `assert` styles for writing assertions.                                             |
| **Mocha** | Test Framework        | Test organization with `describe` and `it` blocks, supports hooks, and asynchronous testing.            |
| **Jest**  | All-in-One Testing Solution | Test running, assertions, mocking, and snapshot testing. Uses `test` and `describe` for test organization. |

**Chai Assertions Example**

| **Assertion**                  | **Description**                                   | **Example**                             |
|-------------------------------|---------------------------------------------------|-----------------------------------------|
| `expect(value).to.exist`      | Checks if `value` is not `null` or `undefined`   | `expect(flickrFetcher).to.exist;`      |
| `expect(value).to.be.null`    | Checks if `value` is `null`                       | `expect(value).to.be.null;`            |
| `expect(value).to.be.undefined` | Checks if `value` is `undefined`                 | `expect(value).to.be.undefined;`      |
| `expect(value).to.equal(expected)` | Checks if `value` equals `expected`           | `expect(value).to.equal(5);`           |
| `expect(array).to.include(item)` | Checks if `array` contains `item`               | `expect(arr).to.include(2);`           |
| `expect(object).to.have.property(property)` | Checks if `object` has `property`         | `expect(obj).to.have.property('key');`|
| `expect(value).to.be.a(type)`  | Checks if `value` is of type `type`               | `expect(value).to.be.a('string');`     |

**More Info**

- [Chai Documentation](https://www.chaijs.com/api/bdd/)
- [Mocha Documentation](https://mochajs.org/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)