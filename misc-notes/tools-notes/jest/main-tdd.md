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
  - minimizing time spent **debugging**.
  - reduces the need for **manual (monkey) checking** by developers and tester.
  - helping developers to maintain focus.
  - reduce **wastage**: hand overs.
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
    { name: 'Shipping', price: 40, shipping: true },
  ],
};

const orderTotal = (order) => {
  const toalItems = order.items
    .filter((item) => !item.shipping)
    .reduce((prev, curr) => prev + curr.price * curr.quantity, 0);

  const shippingItem = order.items.find((item) => !!item.shipping); // {1}

  const shippingPrice = totalItems > 1000 ? 0 : shippingItem.price;

  return totalItems + shipping;
};

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
  expect(add(1, 1)).toBe(2);
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
  expect(add(1, 1)).toBe(2);
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
  const data = { one: 1 };
  data['two'] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});
```

`toEqual` recursively checks every field of an object or an array.

💡 Tip: `toEqual` ignores object keys with `undefined` properties, `undefined` array items, array sparseness, or object type mismatch. To take these into account use `toStrictEqual` instead.

You can also test for the opposite of a matcher using `not`:

```javascript
test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});
```

#### Truthiness

In tests, you sometimes need to distinguish between `undefined`, `null` and `false`, but you sometimes do not want to treat these differently. Jest contains helpers that let you be explicit about what you want:

- `toBeNull` matches only `null`
- `toBeUndefined` matches only `undefined`
- `toBeDefined` is the opposite of `toBeUndefined`
- `toBeTruthy` matches anything that an `if` statement treats as `true`
- `toBeFalsy` matches anything that an `if` statement treats as `false`

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
  expect(new Set(shoppingList)).toContain('milk');
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

- ✨ `test.todo('expect this to be skipped')`

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

```bash
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
  return numbers.reduce((accumulator, current) => (accumulator += current), 0); // Refactored to correctly add the numbers
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

```bash
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

1.  Wrote a failing test.
2.  Made the test pass quickly, even if it meant writing suboptimal code.
3.  Refactored the code to improve it while ensuring the test still passes.

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

import flickrFetcher from 'flickr-fetcher.js';

test('flickrFetcher exists', () => {
  expect(flickrFetcher).toBeDefined();
});
```

This test is super simple. It does nothing other than check that ifx default export from `flickr-fetcher.js` exists. If it is defined to be exact (anything but `undefined`).

The Same test in `Mocha` testing framework/environment with the` Chai` assertion library would look like this:

```javascript
// * Mocha & Chai + CommonJS syntax
// flickr-fetcher-spec.js
// eslint-env mocha <!-- ! {1} --->

// `expect` assertion import in CommonJS syntax
let expect = require('chai').expect; // after installing Chai and Mocha

describe('FlickrFechter', function () {
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
  "id": "25373736106",
  "owner": "99117316@N03",
  "secret": "146731fcb7",
  "server": "1669",
  "farm": 2,
  "title": "Dog goes to desperate measure to avoid walking on a leash",
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
    id: '25373736106',
    owner: '99117316@N03',
    secret: '146731fcb7',
    server: '1669',
    farm: 2,
    title: 'Dog goes to desperate measure to avoid walking on a leash',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0,
  };
  const actual = flickrFetcher.photoObjToUrl(input);
  const expected =
    'https://farm2.staticflickr.com/1669/25373736106_146731fcb7_b.jpg';

  expect(actual).toBe(expected);
});
```

This just passes the example photo object into the new function (that we have yet to write). Therefore our test will fail. We are at **Step 1 - Red** again.

Now, to get the test to pass we need to write our `photoObjToURL` function and get our test to pass. The simplest way to do this would be to simply return the URL we expect:

```javascript
// flickr-fetcher.js

export default {
  photoObjToURL: () =>
    'https://farm2.staticflickr.com/1669/25373736106_146731fcb7_b.jpg',
};
```

After making these changes, my tests run automatically (due to my neat Jest `watch` script)… and we have reached **Step 2 - Green**.

We successfully created an almost useless function that passes the test. This is quite the point of this step though. We want to only write enough code to make the test pass. No more. It takes a lot of discipline to _only_ write the bare minimum code. Of course you will have times where you _just know_ how to write the code, and have many ways of applying optimal efficiency and elegance. You must restrain yourself.

Lets continue. This function is not complete. What if we pass it another photo object? Let's find out by writing another test:

```javascript
// flickr-fetcher.test.js

import flickrFetcher from './flickr-fetcher.js';

test('flickrFetcher exists', () => {
  expect(flickrFetcher).toBeDefined();
});

test('photoObjToURL() takes photo object 1 and returns a URL', () => {
  const input = {
    id: '25373736106',
    owner: '99117316@N03',
    secret: '146731fcb7',
    server: '1669',
    farm: 2,
    title: 'Dog goes to desperate measure to avoid walking on a leash',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0,
  };
  const actual = flickrFetcher.photoObjToUrl(input);
  const expected =
    'https://farm2.staticflickr.com/1669/25373736106_146731fcb7_b.jpg';

  expect(actual).toBe(expected);
});

test('photoObjToURL() takes photo object 2 and returns a URL', () => {
  const input = {
    id: '24765033584',
    owner: '27294864@N02',
    secret: '3c190c104e',
    server: '1514',
    farm: 2,
    title: 'the other cate',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0,
  };
  const actual = flickrfetcher.photoObjToURL(input);
  const expected =
    'https://farm2.staticflickr.com/1514/24765033584_3c190c104e_b.jpg';

  expect(actual).toBe(expected);
});
```

This second test fails obviously.
But what is the simplest way to get the tests to pass?
A fuckin' `if` statement.
Let's modify our function, shall we:

```javascript
export default {
  photoObjToURL: () => {
    if (photoObj.id === '25373736106') {
      return 'https://farm2.staticflickr.com/1669/25373736106_146731fcb7_b.jpg';
    }
    return 'https://farm2.staticflickr.com/1514/24765033584_3c190c104e_b.jpg';
  },
};
```

Would you look at that! **Green**! If this is feeling excessive to you this point, lets think about the following step, refactoring. Could this code be any more efficient to pass these tests? Not _really_.
But is there any duplication here?
The answer is yet. But let's add one more test:

```javascript
// flickr-fetcher.test.js

import flickrFetcher from './flickr-fetcher.js';

test('flickrFetcher exists', () => {
  expect(flickrFetcher).toBeDefined();
});

test('photoObjToURL() takes photo object 1 and returns a URL', () => {
  const input = {
    id: '25373736106',
    owner: '99117316@N03',
    secret: '146731fcb7',
    server: '1669',
    farm: 2,
    title: 'Dog goes to desperate measure to avoid walking on a leash',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0,
  };
  const actual = flickrFetcher.photoObjToUrl(input);
  const expected =
    'https://farm2.staticflickr.com/1669/25373736106_146731fcb7_b.jpg';

  expect(actual).toBe(expected);
});

test('photoObjToURL() takes photo object 2 and returns a URL', () => {
  const input = {
    id: '24765033584',
    owner: '27294864@N02',
    secret: '3c190c104e',
    server: '1514',
    farm: 2,
    title: 'the other cate',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0,
  };
  const actual = flickrfetcher.photoObjToURL(input);
  const expected =
    'https://farm2.staticflickr.com/1514/24765033584_3c190c104e_b.jpg';

  expect(actual).toBe(expected);
});

test('photoObjToURL() takes a photo object 3 and returns a URL', () => {
  const input = {
    id: '24770505034',
    owner: '97248275@N03',
    secret: '31a9986429',
    server: '1577',
    farm: 2,
    title: 'Some pug picture',
    ispublic: 1,
    isfriend: 0,
    isfamily: 0,
  };

  const expected =
    'https://farm2.staticflickr.com/1577/24770505034_31a9986429_b.jpg';
  const actual = flickrFetcher.photoObjToURL(input);

  expect(actual).toBe(expected);
});
```

Running our tests, we are once again in the **red**. The simplest way to get this code to pass is another `if` statement.
Remember, we're "committing whatever sins necessary in the process" to make the test pass:

```javascript
// flickr-fetcher.js

export default {
  photoObjToURL: (photoObj) => {
    if (photoObj.id === '25373736106') {
      return 'https://farm2.staticflickr.com/1669/25373736106_146731fcb7_b.jpg';
    }
    if (photoObj.id === '24765033584') {
      return 'https://farm2.staticflickr.com/1514/24765033584_3c190c104e_b.jpg';
    }
    return 'https://farm2.staticflickr.com/1514/24765033584_3c190c104e_b.jpg';
  },
};
```

**Green** once again! Now here's our function refactored:

```javascript
// flickr-fetcher.js

export default {
  photoObjToURL = (photoObj) => {
    return [
      'https://farm',
      photoObj.farm, '.staticflickr.com/',
      photoObj.server, '/',
      photoObj.id, '_',
      photoObj.secret, '_b.jpg'
    ].join('');
  }
};

// or MINE… which is better:
export default {
  photoObjToURL: (photoObj) => {
    return `https://farm${ photoObj.farm }.staticflickr.com/${ photoObj.server }/${ photoObj.id }_${ photoObj.secret }_b.jpg`
  }
};
```

**Green** all the way around!
All thats left to do now is refactor our tests:

```javascript
// flickr-fetcher.test.js

import flickrFetcher from '../flickr-fetcher.js';

describe('flickrFetcher', () => {
  test('flickrFetcher exists', () => {
    expect(flickrFetcher).toBeDefined();
  });

  describe('photoObjToURL()', () => {
    const testCases = [
      {
        input: {
          id: '25373736106',
          owner: '99117316@N03',
          secret: '146731fcb7',
          server: '1669',
          farm: 2,
          title: 'Dog goes to desperate measure to avoid walking on a leash',
          ispublic: 1,
          isfriend: 0,
          isfamily: 0,
        },
        expected:
          'https://farm2.staticflickr.com/1669/25373736106_146731fcb7_b.jpg',
      },
      {
        input: {
          id: '24765033584',
          owner: '27294864@N02',
          secret: '3c190c104e',
          server: '1514',
          farm: 2,
          title: 'the other cate',
          ispublic: 1,
          isfriend: 0,
          isfamily: 0,
        },
        expected:
          'https://farm2.staticflickr.com/1514/24765033584_3c190c104e_b.jpg',
      },
      {
        input: {
          id: '24770505034',
          owner: '97248275@N03',
          secret: '31a9986429',
          server: '1577',
          farm: 2,
          title: 'Some pug picture',
          ispublic: 1,
          isfriend: 0,
          isfamily: 0,
        },
        expected:
          'https://farm2.staticflickr.com/1577/24770505034_31a9986429_b.jpg',
      },
    ];

    test.each(testCases)(
      'takes a photo object and returns a URL',
      ({ input, expected }) => {
        const actual = flickrFetcher.photoObjToURL(input);
        expect(actual).toBe(expected);
      }
    );
  });
});
```

Ok, that looks nice 😎.

#### **{1}** - Quick Chai Break

_(referring to the code snippet above)_

**Chai** provides _assertion styles_ which include, but are not limited to, `expect` and `should`.

**Mocha** is the actual test framework. It allows you to organize your tests into logical units using `describe` blocks, which help group related tests together. Within these `describe` blocks, you define individual test cases using `it` blocks. Mocha also supports hooks (`before`, `after`, `beforeEach`, `afterEach`) for setup and teardown, and handles asynchronous testing.

**Chai**’s `expect` assertion style supports a range of assertions for verifying code behavior, such as `expect(*).to.exist` (a modern alternative to the deprecated `to.be.defined`).

**Jest** is an all-in-one solution that includes a test runner, an assertion library, and additional features like mocking and snapshot testing. In contrast, Mocha and Chai are often used together where Mocha handles test execution and structure, and Chai provides assertions.

**Summary**

| **Tool**  | **Role**                    | **Main Features**                                                                                          |
| --------- | --------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Chai**  | Assertion Library           | `expect`, `should`, `assert` styles for writing assertions.                                                |
| **Mocha** | Test Framework              | Test organization with `describe` and `it` blocks, supports hooks, and asynchronous testing.               |
| **Jest**  | All-in-One Testing Solution | Test running, assertions, mocking, and snapshot testing. Uses `test` and `describe` for test organization. |

**Chai Assertions Example**

| **Assertion**                               | **Description**                                | **Example**                            |
| ------------------------------------------- | ---------------------------------------------- | -------------------------------------- |
| `expect(value).to.exist`                    | Checks if `value` is not `null` or `undefined` | `expect(flickrFetcher).to.exist;`      |
| `expect(value).to.be.null`                  | Checks if `value` is `null`                    | `expect(value).to.be.null;`            |
| `expect(value).to.be.undefined`             | Checks if `value` is `undefined`               | `expect(value).to.be.undefined;`       |
| `expect(value).to.equal(expected)`          | Checks if `value` equals `expected`            | `expect(value).to.equal(5);`           |
| `expect(array).to.include(item)`            | Checks if `array` contains `item`              | `expect(arr).to.include(2);`           |
| `expect(object).to.have.property(property)` | Checks if `object` has `property`              | `expect(obj).to.have.property('key');` |
| `expect(value).to.be.a(type)`               | Checks if `value` is of type `type`            | `expect(value).to.be.a('string');`     |

**More Info**

- [Chai Documentation](https://www.chaijs.com/api/bdd/)
- [Mocha Documentation](https://mochajs.org/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)

---

## More on Testing

An important basic concept in testing is isolation.
You should only test one method at a time, and your tests should not depend on an external function behaving correctly - especially if that function is being tested elsewhere.
The main reason for this is that when your tests fail, you want to be able to narrow down the cause of this failure as quickly as possible.
If you have a test that depends on several functions, it can be hard to tell exactly what is going wrong.

### Pure Functions

In the projects of novice developers, the JavaScript is typically _tightly coupled_.
Most if not all functions include references to functions in other parts of the code, and the whole thing is _filled_ with DOM methods or `console.log()`.

Tightly coupled code is hard to test! Take for example:

```javascript
// kizuKuraudo💭
function guessingGame(number) {
  const magicNumber = Math.ceil(Math.random() * 100);
  const guess =
    typeof number === 'number' ? number : Math.ceil(Math.random() * 100);

  console.log(
    `Your guess was "${guess}". The magic number was "${magicNumber}"!`
  );

  if (guess > magicNumber) {
    console.log('YOUR GUESS IS TOO BIG');
  } else if (guess < magicNumber) {
    console.log('YOUR GUESS IS TOO SMALL');
  } else if (guess === magicNumber) {
    console.log('YOU DID IT! 🎉');
  }

  guessingGame();
}

// The Odin Project 🔨
function guessingGame() {
  const magicNumber = 22;
  const guess = prompt('guess a number between 1 and 100!');
  if (guess > magicNumber) {
    alert('YOUR GUESS IS TOO BIG');
  } else if (guess < magicNumber) {
    alert('YOUR GUESS IS TOO SMALL');
  } else if (guess == magicNumber) {
    alert('YOU DID IT! 🎉');
  }
}
```

Making this testable requires us to split up all the different things that are happening.
In The Odin Projects version of the guessing game above, we don't need to test the `prompt` or `alert` functions because they are built in to the browser.
They are external to our program and whoever wrote them has already tested them.
What we _do_ need to test is the number logic, which is much easier if we untangle it from the other functions:

```javascript
// kizuKuraudo💭
function guessingGame(number) {
  const evaluateGuess = (magicNumber, guess) => {
    let message = '';

    if (guess > magicNumber) {
      message = 'YOUR GUESS IS TOO BIG!';
    } else if (guess < magicNumber) {
      message = 'YOUR GUESS IS TOO SMALL';
    } else if (guess === magicNumber) {
      message = 'YOU DID IT! 🎉';
    }

    return (
      message +
      ` Your guess was "${guess}". The magic number was "${magicNumber}"!`
    );
  };

  const magicNumber = Math.ceil(Math.random() * 100);
  const guess =
    typeof number === 'number' ? number : Math.ceil(Math.random() * 100);
  const message = evaluateGuess(magicNumber, guess);

  return message;
}

// The Odin Project 🔨
function evaluateGuess(magicNumber, guess) {
  if (guess > magicNumber) {
    return 'YOUR GUESS IS TOO BIG';
  } else if (guess < magicNumber) {
    return 'YOUR GUESS IS TOO SMALL';
  } else if (guess == magicNumber) {
    return 'YOU DID IT! 🎉';
  }
}

function guessingGame() {
  const magicNumber = 22;
  const guess = prompt('guess a number between 1 and 100!');
  const message = evaluateGuess(magicNumber, guess);
  alert(message);
}

guessingGame();
```

In The Odin Projects example above, the only thing we really need to test is the `evaluateGuess` function. which is much easier to test because it has a clear input and output and doesn't call any external functions.
This implementation is _much_ nicer as well because it's much easier to extend.
If we wanted to switch out the `prompt` and `alert`s for methods that manipulate the DOM we can do that easier now and if we want to make our game more advanced by letting the user make multiple guesses, that is also easier.
If we had written this program with TDD it is very likely that it would have looked more like the second example to begin with. TDD encourages better program architecture because it encourages you to write _PURE FUNCTIONS_.

#### Definition of a Pure Function

1. The function always returns the same result if the sam arguments are passed in. It does not depend on any state, or data, change during a program's execution. It must only depend on its input arguments.

2. The function does not produce any observable side effects such as network requests, input and output devices, or data mutation.

That's all there is to a pure function. If it passes the above 2 requirements it's pure.

#### Observable Side Effects

An observable side effect is **any** interaction with the outside world from within a function.
That could be anything from changing a variable that exists outside the function, to calling another method from within a function.

**Note:** If a pure function calls a pure function this isn't a side effect and the calling function is still pure.

Side effects include, but are not limited to:

- Making a HTTP request
- Mutating data
- Printing to a screen or console
- DOM Query/Manipulation
- Math.random()
- Getting the current time

Side effects themselves are not bad and are often required. Except, for a function to be declared pure it must not contain any. Not all functions need to be, or should be pure.

#### Pure Function Example

For demonstration purposes here is an example of a pure function that calculates the price of a product including tax (UK tax is 20%):

```javascript
function priceAfterTax(productPrice) {
  return productPrice * 0.2 + productPrice;
}
```

It passes both 1, and 2, of the requirements for a function to be declared pure.
It doesn't depend on any external input, it doesn't mutate any data and it doesn't have any side effects.
If you run this function with the same input a kajillion times it will **always produce the same result.**

#### Impure Function Example

```javascript
let tax = 20;

function calculateTax(productPrice) {
  return productPrice * (tax / 100) + productPrice;
}
```

Because the above function depends on an external variable, `tax`, it is an impure function.

#### Why Are Pure Functions Important In JavaScript?

They are used heavily in Functional Programming. And libraries, such as **ReactJS** and **Redux** require the use of pure functions.

Pure functions can also be used in regular JavaScript that doesn't depend on a single programming paradigm. You can mix pure and impure functions and that's perfectly fine.

Not all functions need to be, or should be, pure. For example, an event handler for a button press that manipulates the DOM is not a good candidate for a pure function. But, the event handler can call other pure functions which will reduce the number of impure functions in your application.

##### Testability And Refactoring

One of the major benefits of using pure functions is they are immediately testable. They will always produce the same result if you pass in the same arguments.

They also make maintaining and refactoring code much easier. You can change a pure function and not have to worry about unintended side effects messing up the entire application and ending up in debugging hell.

When used correctly, pure functions produce better quality code.
It's a cleaner way of working with lots of benefits.

#### Impure to Pure Function Refactor

##### Impure

```html
<body>
  <form name="bmi">
    <h3>BMI Calculator</h3>
    <label>
      <input
        type="text"
        name="weight"
        placeholder="Weight (kg)"
        data-name="weight"
      />
    </label>
    <label>
      <input
        type="text"
        name="height"
        placeholder="Height (cm)"
        data-name="height"
      />
    </label>
    <button type="submit">Calculate BMI</button>
    <div class="calculation">
      <div>BMI calculation: <span class="result"></span></div>
      <div>This means you are: <span class="health"></span></div>
    </div>
  </form>
  <script>
    (() => {
      const form = document.querySelector('form[name=bmi]');

      const onSubmit = (event) => {
        event.preventDefault();

        let healthMessage; // to be mutated

        const result = form.querySelector('.result');
        const health = form.querySelector('.health');

        const weight = parseInt(
          form.querySelector('input[data-name=weight]').value,
          10
        );
        const height = parseInt(
          form.querySelector('input[data-name=height]').value,
          10
        );

        // weight (kg) / height(m)^2
        // 1cm / 100 = 1m
        const bmi = (weight / (((height / 100) * height) / 100)).toFixed(1);

        if (bmi < 18.5) {
          healthMessage = 'considered underweight';
        } else if (bmi >= 18.5 && bmi < 25) {
          healthMessage = 'considered normal weight';
        } else if (bmi >= 25 && bmi < 30) {
          healthMessage = 'considered overweight';
        } else {
          healthMessage = 'considered obese';
        }

        // bind results to DOM
        result.innerHTML = bmi;
        health.innerHTML = healthMessage;
      };

      form.addEventListener('submit', onSubmit, false);
    })();
  </script>
</body>
```

Paying attention to the JavaScript, upon first look, this is absolutely fine in terms of the fact that "it works"; However, if we began to scale this, we would end up with a monstrosity codebase with a bible of procedural code that is very easily broken.

#### Going Pure

1. Starting with the input value parsing and calculating the BMI, lets address this part of the code:

```javascript
const weight = parseInt(
  form.querySelector('input[data-name=weight]').value,
  10
);
const height = parseInt(
  form.querySelector('input[data-name=height]').value,
  10
);

const bmi = (weight / (height / 100) ** 2).toFixed(1);
```

This deals with `parseInt` and the formula to calculate the BMI. This is not very flexible and likely very error prone when at some point in an application we'd come to refactoring or adding more features.

To refactor, we're only going to obtain each input's value property alone, and delegate those into a `getBMI` function:

```javascript
const weight = form.querySelector('input[data-name=weight]').value;
const height = form.querySelector('input[data-name=height]').value;

const bmi = getBMI(weight, height);
```

Here's how the `getBMI` function could look:

```javascript
function getBMI(weight, height) {
  const parsedWeight = parseInt(weight, 10);
  const parsedHeight = parseInt(height, 10);

  return (parsedWeight / (parsedHeight / 100) ** 2).toFixed(1);
}
```

This function takes the `weight` and `height` as arguments, converts them to Numbers through `parseInt` and then performs the calculation for the BMI. Whether we pass a string or Number as each argument, we can safely get our values via `parseInt`.

2. Onto the next function. Instead of `if` and `else if` logic to assign `healthMessage`. we'll create the expected result to look like this:

```javascript
health.innerHTML = getHealthMessage(bmi);
```

This is much easier to reason with. Here's the implementation for `getHealthMessage`:

```javascript
function getHealthMessage(bmi) {
  let healthMessage;

  if (bmi < 18.5) {
    healthMessage = 'considered underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    healthMessage = 'considered normal weight';
  } else if (bmi >= 25 && bmi < 30) {
    healthMessage = 'considered overweight';
  } else {
    healthMessage = 'considered obese';
  }

  return healthMessage;
}
```

Putting it all together,the JavaScript that is, we have this:

```javascript
(() => {
  const form = document.querySelector('form[name=bmi]');

  function getHealthMessage(bmi) {
    if (bmi < 18.5) {
      return 'considered underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
      return 'considered normal weight';
    } else if (bmi >= 25 && bmi < 30) {
      return 'considered overweight';
    } else {
      return 'considered obese';
    }
  }

  function getBMI(weight, height) {
    const parsedWeight = parseInt(weight, 10);
    const parsedHeight = parseInt(height, 10);

    return (parsedWeight / (parsedHeight / 100) ** 2).toFixed(1);
  }

  const onSubmit = (event) => {
    event.preventDefault();

    let healthMessage; // to be mutated

    const result = form.querySelector('.result');
    const health = form.querySelector('.health');

    const weight = form.querySelector('input[data-name=weight]').value;

    const height = form.querySelector('input[data-name=height]').value;

    // weight (kg) / height(m)^2
    // 1cm / 100 = 1m
    const bmi = getBMI(weight, height);

    // bind results to DOM
    result.innerHTML = bmi;
    health.innerHTML = getHealthMessage(bmi);
  };

  form.addEventListener('submit', onSubmit, false);
})();
```

You can see how much clearer this becomes. It also means we can test the `getBMI` and `getHealthMessage` functions on their own, without any external variables being needed. This means our "impure" `onSubmit` function becomes much clearer and easier to extend.

Reasons why the `onSubmit` function is impure:

1. **Modifies External State (DOM Manipulation)**:

- The function interacts with and modifies the DOM by by setting the `innerHTML` of the `result` and `health` elements:

```javascript
result.innerHTML = bmi;
health.innerHTML = healthMessage;
```

2. **Depends on External State**:

- The function relies on the DOM to get values for weight and height.

```javascript
const weight = form.querySelector('input[data-name=weight]').value;
const height = form.querySelector('input[data-name=height]').value;
```

3. Prevents Default Form Submission:

- The function calls `event.preventDefault()`, which is a side effect because it alters the default behavior of the form submission.

```javascript
event.preventDefault();
```

### Mocking

There are two solutions to the "tightly coupled code" problem. The first, and best option is to remove those dependencies from your code as we did above, but that is not always possible. The second option is **mocking** - writing "fake" versions of a function that always behaves _exactly_ how you want. For example, if you're testing a function that gets information from a DOM input, you really don't want to have to set up a web page and dynamically insert something into the input just to run your tests. With a mock function, you could just create a fake version of the input-grabbing function that always returns a specific value and use THAT in your test.

#### Mocking With "Fun Fun Function"

```javascript
// order-total.js
function orderTotal(fetch, order) {
  fetch(`https://vatapi.com/v1/country-code-check?code=${order.country}`);
  return Promise.resolve(
    order.items.reduce(
      (accumulator, current) =>
        accumulator + current.price * (current.quantity || 1),
      0
    )
  );
}

module.exports = orderTotal;

// ---------------------------------------------------------------

// order-total.test.js
const orderTotal = require('./order-total');

test('calls vatapi.com correctly', () => {
  let isFakeFetchCalled = false;
  const fakeFetch = (url) => {
    expect(url).toBe('https://vatapi.com/v1/country-code-check?code=DE');
    isFakeFetchCalled = true;
  };

  orderTotal(fakeFetch, {
    country: 'DE',
    items: [{ name: 'Dragon waffles', price: 33, quantity: 2 }],
  }).then((result) => {
    expect(isFakeFetchCalled).toBe(true);
  });
});
```

Because we are getting `fetch` as an argument, this is a technique called **dependency injection**. It is a very common to use it unit tested applications. It is in fact what allows us to run the test above.

You can also mock internal functions _dynamically_ with Jest. For example (with the `fetch` dependency injection removed).

Here is my variation of MPJ's ("Fun Fun Function" host) test function and associated tests which doesn't rely on dependency injection:

**order-total.js**

```javascript
async function orderTotal(order) {
  let vat = 0;

  try {
    const response = await fetch(
      `https://vatapi.com/v1/country-code-check?code=${order.country}`
    );
    const data = await response.json();
    vat = data.rates.standard.value / 100;
    // ⬆️  Assuming the VAT API returns the VAT rate as a percentage
  } catch (error) {
    console.error(`Failed to fetch VAT information: ${error}`);
  }

  const total = order.items.reduce(
    (accumulator, current) =>
      accumulator + current.price * (current.quantity || 1),
    0
  );

  return total + total * vat;
}

export { orderTotal };
```

**order-total.test.js**

```javascript
import { orderTotal } from './playground.js';

describe('orderTotal', () => {
  let order;

  beforeAll(() => {
    // {1}
    global.fetch = jest.fn();
  });

  beforeEach(() => {
    // {2}
    order = {
      country: 'DE',
      items: [
        { price: 10, quantity: 2 },
        { price: 5, quantity: 3 },
      ],
    };
  });

  afterEach(() => {
    // {3}
    fetch.mockClear();
  });

  test('fetch is called with the correct URL', async () => {
    // {4}
    fetch.mockResolvedValueOnce({
      // {5}
      json: () => Promise.resolve({ rates: { standard: { value: 20 } } }), // {6}
    });

    await orderTotal(order); // {7}

    expect(fetch).toHaveBeenCalledWith(
      'https://vatapi.com/v1/country-code-check?code=DE'
    ); // {8}
  });

  test('orderTotal returns the correct total with VAT', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ rates: { standard: { value: 20 } } }),
    });

    const total = await orderTotal(order);
    expect(total).toBe(42); // 2*10 + 3*5 = 35 + 20% VAT = 42
  });

  test('orderTotal handles fetch error gracefully', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    const total = await orderTotal(order);
    expect(total).toBe(35); // 2*10 + 3*5 = 35
  });
});
```

{1}
Mocks the global `fetch` function once before all tests run.

{2}
Initializes the `order` object before each test to ensure a fresh instance is used. This avoids potential side effects between tests (i.e., if one test modified the object, it would remain modified in other tests).

{3}
Clears the mock state after each test to prevent interference between tests.

{4}
Since the test function is asynchronous, Jest waits for all the `await` statements to complete before the test. If it weren't asynchronous, Jest might finish running the test before the asynchronous code inside `orderTotal` (or any other awaited function) has a chance to complete, leading to false positives or negatives in test results.

{5}
Jest method used to simulate the resolution of a promise

{6}
Since the test function uses `await` to wait for asynchronous operations to complete, we need to ensure that the mocked `fetch` returns a resolved promise with a specific value.

`mockReturnValue`, returns a fixed value immediately which isn't suitable for promises, meaning that it won't mimic the asynchronous behavior of `fetch`.

`mockResolvedValueOnce` ensures that when the `orderTotal` awaits the promise returned by `fetch`, it receives the correct data. We also `await` the `response.json()`, hence the nested promise resolution in the mock resolved value. They are separate asynchronous operations. `fetch` returns the `Response` object. This object includes the metadata about the response, such as the status code and headers, but not the actual body data. `response.json()` is also asynchronous. The `.json()` method on the `Response` object is used to parse the body of the response as JSON. This parsing process can be time-consuming (especially if the response body is large), so it returns a promise that you need to `await` to get the actual parsed data.

{7}
Waits for the `orderTotal` function to complete its execution, including all asynchronous operations like the `fetch` call. It can be a bit unusual to see `await` used without assigning the result to a variable; However, this pattern is common when the awaited function has side effects or when you only need to ensure that the asynchronous operation completes before continuing. The test doesn't need the returned value from `orderTotal`; it only needs to verify that `fetch` was called with the correct URL. Hence, there's no need to store the result in a variable. This pattern is often used in tests where the focus is on verifying that certain actions took place rather than on the output of a function.

{8}
Because `fetch` is mocked with `mockResolvedValueOnce`, when the `orderTotal` function calls `fetch`, it immediately resolves with the mock data without any real network delay.

#### "Mocking is a Code Smell" - Eric Elliott

Most developers pass through a stage in their TDD skills where they want to achieve 100% unit test coverage, and can't imagine a world in which they do not use mocks extensively. In order to squeeze mocks into their application, they tend to wrap dependency injection functions around their units or (worse), pack services into dependency injection containers. Angular takes this ti an extreme by baking dependency injection right into all Angular component classes, tempting users to view dependency injection as the primary means of decoupling. But dependency injection is not the best way to accomplish decoupling.

TDD should simplify your code. If your code becomes harder to read or maintain when you make it more testable, or you have to bloat your code with dependency injection boilerplate, you're doing TDD wrong.

> "A code smell is a surface indication that usually corresponds to a deeper problem in the system." - Martin Fowler

Different types of code need different levels (and different kinds) of mocks. Some code exists primarily to facilitate I/O, in which case, there is little to do other than test I/O, and reducing mocks might mean your unit test coverage would be close to 0.

If there is no logic in your code (just _pipes_ and _compositions_), 0% unit test coverage might be acceptable, assuming your integration or functional test coverage is close to 100%.

**Pipes** are a way of chaining functions together, where the output of one function becomes the input of the next. This is similar to a pipeline, where data flows through a series of transformations. In the following example the output of `addOne` is passed directly into `double`.

```javascript
const addOne = (x) => x + 1;
const double = (x) => x * 2;

const result = double(addOne(3)); // First addOne(3) is called, then double(4), so result is 8

// or

const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x);

const process = pipe(addOne, double);

console.log(process(3)); // Outputs: 8
```

**Pure Composition** refers to combining functions in a way where each function is pure, meaning it does not have side effects (like modifying a global variable or logging to the console) and always produces the same output for the same input. In the following example, `addOneAndDouble` is a _composition_ of the (pure) `addOne` and `double` functions.

However, if there is logic (conditional expressions, assignments to variables, explicit function calls to units, etc...), you probably do need unit test coverage, and there may be opportunities to simplify your code and reduce mocking requirements.

##### What is mocking?

A **mock** is a test double that stands in for real implementation code during the unit testing process. A mock is capable of producing assertions about how it was manipulated by the test subject during the test run. If your test double produces assertions, it's a mock in the specific sense of the word.

All test doubles (dummies, spies, fakes, etc...) stand in for real code that the test subject is tightly couples to, therefore, all test doubles are an indication of coupling, and there may be an opportunity to simplify the implementation and improve the quality of the code under test. At the same time, eliminating the need for mocking can radically simplify the tests themselves, because you won't have to construct the mocks.

##### What is a unit test?

Unit tests test individual units (modules, functions, classes) in isolation from the rest of the program. Contrast unit tests with integration tests, which test integrations between two or more units, and functional tests, which test the application from the point of view of the user, including complete user interaction workflows from simulated UI manipulation, to data layer updates, and back to the user output (e.g., the on-screen representation of the app). Functional tests are a subset of integration tests, because they test all of the units of an application, integrated in the context of the running application.

Examples:

1. **Unit Test**

- **Purpose:** Test individual units (functions, methods) in isolation.

Let's say we have a function `calculateTotal` that calculates the total price of items in a cart.

```javascript
// calculateTotal.js
export const calculateTotal = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

// calculateTotal.test.js
import { calculateTotal } from './calculateTotal';

test('calculates the total price of items in the cart', () => {
  const items = [
    { price: 10, quantity: 2 },
    { price: 5, quantity: 1 },
  ];

  const total = calculateTotal(items);

  expect(total).toBe(25); // (10 * 2) + (5 * 1) = 20 + 5 = 25
});
```

- **Focus:** The `calculateTotal` function is tested in isolation, without involving any other part of the application (like fetching tax information or displaying the result on the UI).

2. **Integration Test**

- **Purpose:** Test the interaction between multiple units.

Now, let’s say you have another function that fetches tax information and calculates the total with tax applied. This function uses `calculateTotal`.

```javascript
// calculateTotalWithTax.js
import { calculateTotal } from './calculateTotal';

async function fetchTaxRate(jurisdiction) {
  // wrapping the followng in a `try-catch` block would be safer but to keep things simple…
  const response = await fetch(
    `https://api.example.com/tax-rate/in${jurisdiction}`
  );
  const data = await response.json();
  return data.taxRate;
}

async function calculateTotalWithTax(items, fetchTaxRate) {
  const taxRate = await fetchTaxRate('NYC'); // Fetch the NYC tax rate asynchronously
  const price = calculateTotal(items);

  return price * (1 + taxRate);
}

// calculateTotalWithTax.test.js
import { calculateTotalWithTax } from './calculateTotalWithTax';

test('calculateTotalWithTax returns correct total with tax', async () => {
  const mockFetchTaxRate = jest.fn().mockResolvedValue(0.2); // Mock the async tax rate fetch

  const items = [
    { price: 10, quantity: 2 },
    { price: 5, quantity: 1 }
  ];

  const total = await calculateTotalWithTax(items, mockFetchTaxRate);

  expect(total).toBe(30);
  expect(mockFetchTaxRate).toHaveBeenCalled(); // Ensure fetchTaxRate was called
});
```

- **Focus:** Integration of Asynchronous Tax Fetching and Calculation Logic: The updated version shifts the focus slightly towards testing the integration of asynchronous tax rate fetching (`fetchTaxRate`) with the overall total calculation (`calculateTotalWithTax`). It is indicative of an integration test because it combines the `calculateTaotal` logic with the asynchronous tax fetching, ensuring that these units work together correctly. 

3. **Functional Test**

- **Purpose:** Test the entire application workflow from the user’s perspective.

Imagine a web page where users add items to their cart. The application fetches the tax rate asynchronously and displays the final price including tax on the user interface.

```javascript
// app.js
import { calculateTotalWithTax } from './calculateTotalWithTax';

export const displayFinalTotal = async (items, fetchTaxRate) => {
  const totalWithTax = await calculateTotalWithTax(items, fetchTaxRate);

  // Display the calculated total with tax on the UI
  document.getElementById('total').textContent = `Total: $${totalWithTax.toFixed(2)}`;
};

// calculateTotalWithTax.js
import { calculateTotal } from './calculateTotal';

async function fetchTaxRate(jurisdiction) {
  const response = await fetch(`https://api.example.com/tax-rate/in${jurisdiction}`);
  const data = await response.json();
  return data.taxRate;
}

export async function calculateTotalWithTax(items, fetchTaxRate) {
  const taxRate = await fetchTaxRate('NYC'); // Fetch the NYC tax rate asynchronously
  const price = calculateTotal(items);

  return price * (1 + taxRate);
}

// app.test.js
import { displayFinalTotal } from './app';
import { calculateTotalWithTax } from './calculateTotalWithTax';

// Mocking the asynchronous fetchTaxRate function
jest.mock('./calculateTotalWithTax', () => ({
  ...jest.requireActual('./calculateTotalWithTax'),
  calculateTotalWithTax: jest.fn(),
}));

test('displays the final total with tax on the UI', async () => {
  // Setting up a mock DOM element
  document.body.innerHTML = '<div id="total"></div>';

  // Mocking the calculateTotalWithTax function to return a fixed total with tax
  calculateTotalWithTax.mockResolvedValue(36); // Suppose the calculated total with tax is $36

  // Simulating the items in the cart
  const items = [
    { price: 10, quantity: 2 }, // $20 total
    { price: 5, quantity: 1 },  // $5 total
  ];

  // Mock fetchTaxRate function (injected below)
  const mockFetchTaxRate = jest.fn().mockResolvedValue(0.2); // 20% tax rate

  // Display the final total with tax on the UI
  await displayFinalTotal(items, mockFetchTaxRate);

  // Checking that the correct total is displayed
  expect(document.getElementById('total').textContent).toBe('Total: $36.00');

  // Ensure the tax rate was fetched and applied
  expect(calculateTotalWithTax).toHaveBeenCalledWith(items, mockFetchTaxRate);
});
```

- **Focus:**
* Simulated User Interaction: The test simulates a user interacting with the web page, where they see the total amount including tax displayed after adding items to their cart.

* Mocking Asynchronous Operations: The asynchronous `fetchTaxRate` function and `calculateTotalWithTax` are mocked to simulate the real-world fetching of tax data and the total calculation, reflecting the flow of an actual application.

* Complete Workflow: The test ensures that from fetching the tax rate to calculating the total and updating the UI, everything works together as it would in a real-world scenario, making this a functional test.

**Summary:**

- **Unit Test:** Isolates and tests a single function or module (e.g., `calculateTotal`).
- **Integration Test:** Tests the interaction between multiple units (e.g., `calculateTotalWithTax`).
- **Functional Test:** Tests the entire application workflow, simulating user interaction and verifying the output (e.g., `displayFinalTotal` updates the UI with the correct total).

##### What is test coverage?

Code coverage refers to the amount of code covered by test cases. Coverage reports can be created by instrumenting the code and recording which lines were exercised during a test run. In general, we try to produce a high level of coverage, but code coverage starts to deliver diminishing returns as it gets closer to 100%. 

There are two kinds of coverage:

1. **Code coverage:** how much of the code is exercised
2. **Case coverage:** how many of the use-cases are covered by the test suites.

Case coverage refers to use-case scenarios: How the code will behave in the context of real world environment, with real users, real networks, and even hackers intentionally trying to subvert the design of the software for nefarious purposes.

Coverage reports identify code-coverage weaknesses, not case-coverage weaknesses. The same code may apply to more than one use-case, and a single use-case may depend on code outside the subject-under-test, or even in a separate application or 3rd party API.

To reiterate, _unit tests_ focus on testing individual pieces of code (like functions or modules) by themselves, without considering how they interact with other parts of the system. 

_Use-cases_ often involve multiple parts of the system working together, like interacting with users, handling different environments, or dealing with network conditions.

**Code Coverage Example:** This test covers the `add` function by ensuring that when you add 2 and 3, you get 5. The test checks if the function works correctly for this specific cae, and since it runs through the code, it counts toward code coverage.
``` javascript
// Code coverage (Unit test)
function add(a, b) {
  return a + b;
}

// Unit test
test('adds two numbers', () => {
  expect(add(2, 3)).toBe(5);
})
```

**Case Coverage Example:** Now, imagine you have a web application where a user logs in, adds items to a shopping cart, and then checks out. This process involves multiple units working together:
  1. User logs in (authentication service)
  2. User adds items to cart (cart service)
  3. System fetches item prices and calculates total (pricing service)
This test checks if all these steps work together as expected. It's note just about whether each individual function works, but whether they work together in a real-world scenario. It covers the "case" of a user completing a purchase which involves multiple units and interactions.
``` javascript
// Functional test (simplified example)
test('user can log in, add items to cart, and check out', async () => {
  const user = await login('username', 'password'); // Log in
  await addItemToCart(user, 'item1'); // Add item to cart
  const total = await calculateTotal(user.cart); // Calculate total
  const receipt = await checkout(user, total); // Check out

  expect(receipt.status).toBe('success');
})
```

The idea is that unit tests alone can't cover the full use-case because they test components in isolation, not in the integrated context that users experience. This means that a test suite containing only unit tests will always have close to 0% case coverage for integration and functional use-case scenarios.

Here is a more complete example:
``` javascript
// cart.js
export function addItem(cart, item) {
  return [...cart, item];
}

export function calculateTotal(cart) {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function applyDiscount(total, discount) {
  return total - total * discount;
}

// cart.test.js
import { addItem, calculateTotal, applyDiscount } from './cart';

// Unit test
test('addItem adds an item to the cart', () => {
  const cart = [];
  const item = { name: 'Book', price: 10, quantity: 1 };
  const updatedCart = addItem(cart, item);

  expect(updatedCart).toEqual([item]);
});

// Unit test
test('calculateTotal calculates the total price of items in the cart', () => {
  const cart = [
    { name: 'Book', price: 10, quantity: 1 },
    { name: 'Pen', price: 1, quantity: 3 }
  ];
  const total = calculateTotal(cart);

  expect(total).toBe(13);
});

// Unit test
test('applyDiscount applies a discount to the total price', () => {
  const total = 100;
  const discount = 0.1; // 10%
  const discountedTotal = applyDiscount(total, discount);

  expect(discountedTotal).toBe(90);
});

// Integration test
import { addItem, calculateTotal, applyDiscount } from './cart';

test('complete checkout process', () => {
  const cart = [];
  const item1 = { name: 'Book', price: 10, quantity: 1 };
  const item2 = { name: 'Pen', price: 1, quantity: 3 };

  const updatedCart = addItem(cart, item1);
  const updatedCartAgain = addItem(updatedCart, item2);
  const total = calculateTotal(updatedCartAgain);
  const finalTotal = applyDiscount(total, 0.1);

  expect(finalTotal).toBe(11.7);
});

// Functional test
import { addItem, calculateTotal, applyDiscount } from './cart';

test('user adds items and checks out with discount', () => {
  // Simulate user interaction
  const cart = [];
  const item1 = { name: 'Book', price: 10, quantity: 1 };
  const item2 = { name: 'Pen', price: 1, quantity: 3 };

  let updatedCart = addItem(cart, item1);
  updatedCart = addItem(updatedCart, item2);

  let total = calculateTotal(updatedCart);
  total = applyDiscount(total, 0.1);

  // Simulate UI update
  document.body.innerHTML = `<div id="total">Total: $${total.toFixed(2)}</div>`;

  expect(document.getElementById('total').textContent).toBe('Total: $11.70');
});
```

The integration/functional tests are necessary to ensure that the different parts of the application work together correctly and fulfill the use-cases that the users care about. Without these these tests, your test suite might miss significant issues that only arise when the unit tests are combined or used in real-world scenarios. This is why a test suite only containing unit tests has close to 0% case coverage for integration and functional use-cases.

HENCE, 100% code coverage does not guarantee 100% case coverage. 
Developers targeting 100% code coverage are chasing the wrong metric.

##### What is tight coupling?
The need to mock in order to achieve unit isolation for the purpose of unit tests is caused by coupling between units. Tight coupling makes code more rigid and brittle: more likely to break when changes are required. In general, less coupling is desirable for its own sake because it makes code easier to extend and maintain. The fact that it also makes testing easier by eliminating the need for mocks is just icing on the cake. 

If you are mocking some shit, there may be an opportunity to decouple shit. Once that's done, you won't need the mocks anymore.

**Coupling** is the degree to which a unit of code (module, function, class, etc.) depends upon other units of code. Tight coupling, or a high degree of coupling refers to how likely a unit is to break when changes are made to its dependencies. In other words, the tighter the coupling, the harder it is to maintain or extend the application. Loose coupling reduces the complexity of fixing bugs and adapting the application to new use-cases.

**Forms of Coupling:**
* **Subclass coupling:** subclasses are dependent on the implementation and entire hierarchy of the parent class: the tightest form of coupling available in OO design. 

In the following example, `Dog` is tightly coupled to `Animal` because it inherits all of its methods and is dependent on the `Animal` class structure. Any changes to `Animal` could affect `Dog`:
``` javascript
class Animal {
  makeSound() {
    return 'Some generic sound';
  }
}

class Dog extends Animal {
  makeSound() {
    return 'Bark';
  }
}

const myDog = new Dog();
console.log(myDog.makeSound()); // Outputs: "Bark"
```

* **Control dependencies:** code that controls its dependencies by telling them what to do, e.g., passing method names, etc. If the control API of the dependency changes, the dependent code will break. 

In the following example, the `Switch` class is controlling the `Light` by telling it what method to execute (`turnOn` or `turnOff`). If the `Light` class changes its API (e.g., method names), the `Switch` would break:
``` javascript
class Light {
  turnOn() {
    console.log('Light is on');
  }
  turnOff() {
    console.log('Light is off');
  }
}

class Switch {
  constructor(light) {
    this.light = light;
  }

  operate(action) {
    this.light[action](); // Control dependency
  }
}

const light = new Light();
const switcher = new Switch(light);
switcher.operate('turnOn');  // Outputs: "Light is on"
```

* **Mutable state dependencies:** code that shares mutable state with other code, e.g., can change properties on a shared object. If relative timing of mutations change, it could break dependent code. If timing is nondeterministic, it may be impossible to achieve program correctness without a complete overhaul of all dependent units: e.g, there may be an irreparable tangle of race conditions. Fixing one but could cause others to appear in other dependent units. 

In the following example, both `increment` and `decrement` functions depend on and modify the same `sharedState`. If the order of their calls changes, the final state may be unpredictable or incorrect:
``` javascript
let sharedState = { count: 0 };

function increment() {
  sharedState.count += 1;
}

function decrement() {
  sharedState.count -= 1;
}

increment();
console.log(sharedState.count); // Outputs: 1
decrement();
console.log(sharedState.count); // Outputs: 0
```

* **State shape dependencies:** code that shares data structures with other code, and only uses a subset of the structure. If the shape of the shared structure changes, it could break the dependent code. 

In the following example, the `getUserCity` function is dependent on the shape of the user object. If the address structure changes (e.g., renaming city or restructuring address), this function will break:
``` javascript
const user = {
  name: 'Alice',
  age: 30,
  address: {
    city: 'New York',
    zip: '10001'
  }
};

function getUserCity(user) {
  return user.address.city; // State shape dependency
}

console.log(getUserCity(user)); // Outputs: "New York"
```

* **Event/message coupling:** code that communicates with other units via message passing, events, etc.

In the following example, the code listening for the `dataReceived` event is dependent on that event being emitted. If the event name or the structure of the message changes, the dependent code will break.

``` javascript
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('dataReceived', (data) => {
  console.log('Data received:', data);
});

eventEmitter.emit('dataReceived', 'Hello World'); // Outputs: "Data received: Hello World"
```

###### What causes tight coupling?
Tight coupling has many causes:
- **Mutation** vs immutability
- **Side-effects** vs purity/isolated side-effects
- **Responsibility overload** vs Do One Thing (DOT)
- **Procedural instructions** vs describing structure
- **Class inheritance** vs composition

Imperative and object-oriented code is more susceptible to tight coupling than functional code. That doesn't mean that programming in a functional style makes your code immune to tight coupling, but functional code uses pure functions as the elemental unit of composition, and pure functions are less vulnerable to tight coupling by nature.
  * _Imperative code_ tells the computer _how_ to do something _step-by-step_, often involving changing the state of variables and objects.
  * _Object-oriented code_ organizes data and behavior into objects and classes, which often interact with each other by directly accessing and modifying each other's state.

Because these paradigms involve sharing and mutating state (changing the values of variables or properties), they tend to create **tight coupling**. Tight coupling means that different parts of the code are closely dependent on each other, making the system more fragile and harder to change. If one part changes, the other parts may break.  

Functional programming focuses on _what_ to do rather than _how_ to do it, using functions that take inputs and return outputs without changing the state (pure functions). Pure functions are the core building blocks in functional programming. They don't depend on or alter the state outside of their scope. They only rely on their input arguments and always produce the same output for the same inputs. Because pure functions don't have side effects (they don't change the state of the system), they are naturally **less prone to tight coupling.** Each function operates independently, reducing the dependencies between different parts of the code. This makes the code more modular, easier to test, and more resilient to changes. 

Here are examples of each:
1. **Imperative Code:**
- **Focus:** How to perform the task step by step.
- **Explanation:** The imperative approach explicitly outlines how to iterate through the array, square each number, and accumulate the sum. It directly manipulates the state (`sum` variable) and changes it with each iteration.
- **Example:**
```javascript
const numbers = [1, 2, 3, 4, 5];
let sum = 0;

for (let i = 0; i < numbers.length; i++) {
  const square = numbers[i] * numbers[i];
  sum += square;
}

console.log(sum); // Outputs: 55
```

2. **Object-Oriented Code:**
- **Focus:** Organizing the task using objects and methods.
- **Explanation:** The object-oriented approach encapsulates the data (`numbers`) and related behavior (methods like `square` and `sumOfSquares`) within a class. The method `sumOfSquares` still performs a similar step-by-step process as the imperative code but is organized around an object (`Calculator`).
- **Example:**
```javascript
class Calculator {
  constructor(numbers) {
    this.numbers = numbers;
  }

  square(number) {
    return number * number;
  }

  sumOfSquares() {
    let sum = 0;
    for (let i = 0; i < this.numbers.length; i++) {
        sum += this.square(this.numbers[i]);
    }
    return sum;
  }
}

const calculator = new Calculator([1, 2, 3, 4, 5]);
console.log(calculator.sumOfSquares()); // Outputs: 55
```

**Functional Code:**
- **Focus:** Using pure functions and avoiding state mutations.
- **Explanation:** The functional approach focuses on what the program should accomplish without describing the steps to do it. It uses pure functions (`square`, `sumOfSquares`) and higher-order functions like `map` (to transform the array) and `reduce` (to sum the values). The code avoids explicit loops and state changes, making it more declarative.
- **Example:**
```javascript
const numbers = [1, 2, 3, 4, 5];

const square = (number) => number * number;

const sumOfSquares = (nums) => nums.map(square).reduce((sum, num) => sum + num, 0);

console.log(sumOfSquares(numbers)); // Outputs: 55
```

##### What does composition have to do with mocking?
Everything. The essence of all software development is the process of breaking a large problem down into smaller, independent pieces (decomposition) and composing the solutions together to form an application that solves the large problem (composition).

> Mocking is required when our decomposition strategy has failed.

Mocking is required when the units used to break the large problem down into smaller parts depend on each other. Put another way, _mocking is required when our supposed atomic units of composition are not really atomic_, and our decomposition strategy has failed to decompose the larger problem into smaller, independent problems. 

When decomposition succeeds, it's possible to use a generic composition utility to compose the pieces back together.

**Examples of generic composition utilities:**

1. **Function composition** e.g., `lodash/fp/compose`
2. **Component composition** e.g., composing higher-order components with function composition
3. **State store/model composition** e.g., Redux `combineReducers`
Redux is a state management library often used with React.
4. **Object or factory composition** e.g., mixins or functional mixins
5. **Process composition** e.g., transducers
6. **Promise or monadic composition** e.g., `asyncPipe()`, Kleisli composition with `composeM()`, `composeK()`, etc.
7. etc...

💭 Details on each of the above can be found here: ![Composition Utilities](../../rabbitHoles/composition-utilities.md)

When you use generic composition utilities, each element of the composition can be unit tested in isolation _without mocking the others_.

The compositions themselves will be declarative, so they'll contain _zero unit-testable logic_ (presumably the composition utility is a third party library with its own unit tests).

Under those circumstances, there's nothing meaningful to unit test. You need integration tests instead.

_Imperative_ vs _Declarative_ Composition:
``` javascript
// import pipe from 'lodash/fp/flow';
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);
// Functions to compose
const g = n => n + 1;
const f = n => n * 2;
// Imperative composition
const doStuffBadly = x => {
  const afterG = g(x);
  const afterF = f(afterG);
  return afterF;
};
// Declarative composition
const doStuffBetter = pipe(g, f);
console.log(
  doStuffBadly(20), // 42
  doStuffBetter(20) // 42
);

// most modern langauges allow declarative composition since in most languages support first-class functions (they can be assigned to variables, passed as arguments, returned from other functions, storable in data structures).
```

Function composition is the process of applying a function to the return value of another function. In other words, you create a pipeline of functions, then pass a value to the pipeline, and the value will go through each function like a stage in an assembly line, transforming the value in some way before it's passed to the next function in the pipeline. Eventually, the last function in the pipeline returns the final value.

The imperative style requires logic that should be tested. Declarative style means we're telling the computer the relationships between things. It's a description of structure using equational reasoning.

Assuming `f` and `g` have their own unit tests, and `pipe()` has its own unit tests (use `flow()` from Lodash or `pipe()` from Ramda, and it will), there's no new logic here to unit test.

In order for this style to work correctly, the units we compose need to be _decoupled_.

##### Causes of tight coupling include:
  - Class inheritance (coupling is multiplied by each layer of inheritance and each descendant class)

  - Global variables (multiple functions can mutate this variable, and/or change outputs)

  - Other mutable global state (browser DOM, shared storage, network, etc...)

  - Module imports with side-effects

  - Implicit dependencies from compositions (e.g., `const enhancedWidgetFactory = compose(eventEmitter, widgetFactory, enhancements);` where `widgetFactory` depends on `eventEmitter`)

  - Dependency injection parameters/containers ![Parameters vs. Container](../../rabbitHoles/dependency-injection.md)

  - Control parameters (an outside unit is controlling the subject unit by telling it what to do):
``` javascript
  // Tightly Coupled:
  function processOrder(order, isUrgent) {
    if (isUrgent) {
      expediteShipping(order);
    } else {
      standardShipping(order);
    }
  }
  // `isUrgent` is a control parameter. It tightly couples the `processOrder` function to the logic that decides whether shipping should be expedited or standard.

  // Refactored:
  function processOrder(order, shippingStrategy) {
    shippingStrategy(order);
  }
```

  - Mutable parameters:
``` javascript
  // Tightly Coupled:
  function addItemToCart(cart, item) {
    cart.items.push(item);
  }

  // Refactored:
  function addItemToCart(cart, item) {
    return {
      ...cart,
       items: [...cart.items, item],
    };
  }
  // This way, the original `cart` is not modified, reducing side effects and making the function more predicatable and easier to test.
  ```

Methods of Loose Coupling:
  - Module imports without side-effects (In black box testing, regardless of implementations, do inputs lead to expected outputs. System functionality. Functional tests are an example of a type of black box test), not all imports need isolating.
  - Message passing/pubsub 
  - Immutable parameters (can still cause shared dependencies on state shape. If the state shape changes, who the fuck knows if the functions will still be compatible).

> Can the unit be tested without mocking dependencies? If it can’t, it’s tightly coupled to the mocked dependencies.

###### How to Decouple Code

**1. Use Pure Functions as the Atomic Unit of Composition**
…as opposed to classes, imperative procedures, or mutating functions.

**Example:**
```javascript
// Pure functions for adding and doubling numbers

const add = (a, b) => a + b;
const double = (x) => x * 2;

// Composing pure functions
const addAndDouble = (a, b) => double(add(a, b));

// Usage
console.log(addAndDouble(3, 4)); // Output: 14
```
**Explanation:**
- **Pure Functions:** `add` and `double` are pure functions. They don't have side effects and always produce the same output for the same inputs.
- **Composition:** These functions can be easily composed to create more complex operations (`addAndDouble`), which is the essence of functional programming and promotes decoupling by keeping each function's logic independent and reusable.

**2. Isolate Side-Effects from the Rest of Your Program Logic**
That means don’t mix logic with I/O (including network I/O, rendering UI, logging, etc.).

**Example:**
```javascript
// Pure function for processing data
const processData = (data) => data.map(item => item.toUpperCase());

// Function with side effects (I/O)
const fetchDataAndLog = async (fetchDataFn, logFn) => {
  const data = await fetchDataFn();
  const processedData = processData(data);
  logFn(processedData);
};

// Mock functions for side effects
const fetchDataMock = () => Promise.resolve(['apple', 'banana', 'cherry']);
const logMock = (data) => console.log('Processed Data:', data);

// Usage
fetchDataAndLog(fetchDataMock, logMock);
```
**Explanation:**
- **Pure Function:** `processData` is a pure function that doesn't interact with external systems, making it easy to test and reuse.
- **Side-Effects Isolation:** The side effects (network I/O in `fetchDataFn` and logging in `logFn`) are isolated in `fetchDataAndLog`, which can be injected with different implementations. This decoupling allows you to test `processData` independently from any I/O operations.

**3. Remove Dependent Logic from Imperative Compositions to Create Declarative Compositions**
… which don't need their own unit tests. If there's no logic, there's nothing meaningful to unit test.

**Example:**
```javascript
// Imperative Composition
const fetchDataAndProcessImperative = async () => {
  const data = await fetchDataMock();
  const processedData = data.map(item => item.toUpperCase());
  console.log('Processed Data:', processedData);
};

// Declarative Composition
const processDataDeclarative = (fetchFn, logFn) =>
  fetchFn().then(data => data.map(item => item.toUpperCase())).then(logFn);

// Usage
processDataDeclarative(fetchDataMock, logMock);
```
**Explanation:**
- **Imperative Composition:** `fetchDataAndProcessImperative` mixes logic (data processing) with side effects (fetching data and logging), making it harder to test or reuse parts of the logic.
- **Declarative Composition:** In `processDataDeclarative`, the logic (processing data) is decoupled and declaratively composed with the side effects. This function can be used with different fetch or logging implementations without needing to change the core logic, simplifying testing and reducing coupling.

> Don't unit test I/O. I/O is for integrations. Use integration tests instead.

##### Isolate Logic from I/O
Sometimes you can use monad compositions (like promises) to eliminate dependent logic from your compositions. For example, the following function contains logic that you can't unit est without mocking all of the async functions:
``` javascript
// Helper pseudo-code:

// Psuedo Asynchronous Processes
const readUser = async ({user, folder, files}) => {
  // Fetch the user from the database
  const dbUser = await someDatabaseFetch(user);
  return { dbUser, folder, files };
};

const getFolderInfo = async ({dbUser, folder, files}) => {
  // Get the folder information
  const folderInfo = await someFolderFetch(folder);
  return { dbUser, folderInfo, files };
};

const haveWriteAccess = async ({ dbUser, folderInfo, files }) => {
  // Check if the user has write access
  const hasAccess = await checkPermissions(dbUser, folderInfo);
  
  if (!hasAccess) {
    throw new Error("No write access to that folder");
  }
  
  return { hasAccess, dbUser, folderInfo, files };
};

const uploadToFolder = async ({ dbUser, folderInfo, files }) => {
  // Upload files to the folder
  await performUpload(dbUser, folderInfo, files);
  return 'Success!';
};

// gibberish starting variables
const user = '123';
const folder = '456';
const files = ['a', 'b', 'c'];

// 🔴 Test Function (No good!) 🔴
async function uploadFiles({user, folder, files}) {
  const dbUser = await readUser(user);
  const folderInfo = await getFolderInfo(folder);
  if (await haveWriteAccess({dbUser, folderInfo})) {
    return uploadToFolder({dbUser, folderInfo, files});
  } else {
    throw new Error("No write access to that folder");
  }
}

// Enabling Declarative Composition Version Below (…vs. imperative composition above)
const asyncPipe = (...fns) => x => (
  fns.reduce(async (y, f) => f(await y), x)
);

// 🟢 Test Function refactored to use `asyncPipe()` (Good!) 🟢
const uploadFiles = asyncPipe(
  readUser,
  getFolderInfo,
  haveWriteAccess,
  uploadToFolder
);

// Invocation
uploadFiles({user, folder, files}).then(console.log).catch(console.error);
```

**Description:**
`y` represents the `currentValuePromise` returned from each `reduce` call, while `f` is the current function processing the promise to return another promise. `x` is the initial value passed into the pipeline.

In this example, `{user, folder, files}` is the initial value (`x`). The first function, `readUser`, is executed with `x` as its input. Since `y` starts as `x`, it initially holds `{user, folder, files}`. The `readUser` function processes `y` and returns a promise that resolves to data required for the next step.

This resolved promise (`y`) becomes the input for the next function in the pipeline, `getFolderInfo`. This function processes `y` and returns a promise with additional information needed for the subsequent step.

Next, the `haveWriteAccess` function checks whether the user has access to the specified folder, using the data in `y`. If access is granted, the function resolves to the data required for uploading; otherwise, it throws an error, stopping the pipeline.

Finally, in the last `reduce` call, the `uploadToFolder` function receives the resolved data from `haveWriteAccess`. Since access has already been verified, this function focuses solely on uploading the files and returning a success message.

When the `uploadFiles` function is invoked with the initial data, the pipeline processes through these steps. If all steps succeed, the final result is a success message, which is logged via the chained `then()` method. If any step fails, an error is thrown, halting the process.

The `asyncPipe()` function written as follows is superior for a plethora of reasons:
``` javascript
const asyncPipe = (...functions) => initialValue => (
  functions.reduce(async (currentPromise, currentFunction) => currentFunction(await currentPromise), initialValue);
);
```
- In teaching materials, using semantic names helps students firmly grasp the concepts more effectively. 
- For teams, it ensures that code is more maintainable and easier to understand, promoting better collaboration and reducing potential errors.

💭 Using meaningful names should always be a priority in code, as it aligns with best practices for writing clean and understandable code. I vow to always write meaningful names in any tutorials I write.

The conditional logic is easily removed because promises have conditional branching built-in. The idea is that logic and I/O don't mix well, so we want to remove the logic from the I/O dependent code. Promises handle asynchronous results and errors using methods like `.then()` and `.catch()` (the built-in mechanism). It provides a way to handle success or failure without explicitly writing conditional statements every time you handle an asynchronous result. See:

In the declarative composition version of our `asyncPipe()`, we've effectively removed explicit conditional logic from the function by chaining functions together. This approach assumes each function can handle its input appropriately without needing external conditional checks in the pipeline. It aligns with the principle of separating the I/O operations (e.g., fetching data, checking access) from the logic that controls the flow of these operations.

Notice also that each of these functions takes and resolves with the same data type. We could create a `pipelineData` type for this composition which is just an object containing the following keys: `{ user, folder, files, dbUser?, folderInfo? }`. This creates a structure sharing dependency between the components, but you can use more generic versions of these functions in other places and specialize thm for this pipeline with thin wrapping functions. In this scenario, coupling is allowed and even considered beneficial. The idea here is to create a well-defined data structure that all functions in the pipeline will work with, which ensures that each function in the pipeline knows what to expect in terms of input and output. This form of coupling is _controlled_ and _intentional_ since the functions are designed to work together with this pipeline, and the data structure serves at the contract between them. This is stated to further engrain that this type of coupling is often necessary to ensure that components interact correctly.

The astute of you may have noticed the question marks in the `pipelineData` object. In **TypeScript**, question marks are often used to indicate that certain properties are optional. This notation suggests that the properties that prepend the question mark, `?`, might or might not be present at certain stages of the process.

However, in the context of JavaScript or when describing the flow of data through functions, this notation is more symbolic. It implies that the properties will be added to the data structure as it progresses through the pipeline, but they are not part of the initial input. In plain JavaScript, these question marks are not necessary and would not be part of actual code. They simply help to indicate that the properties are not present from the start but added later in the process. 

##### When Unit Tests Not Required

1. **Isolation of Functions**:
   - Each function in your pipeline (`readUser`, `getFolderInfo`, `haveWriteAccess`, `uploadToFolder`) is independent and focused on a single task. They each receive a specific input, perform some operation, and return a result. 
   - Because of this independence, you can unit test each function without needing to consider the others. For example, you can test `readUser` on its own by mocking `someDatabaseFetch` without worrying about what `getFolderInfo` or `haveWriteAccess` does.

2. **No Need for Mocks in Unit Tests**:
   - Since the logic in these functions doesn’t depend on the outcome of other functions in the pipeline, you don't need to mock the other pipeline functions during testing. This makes the tests simpler and more reliable because you're only testing the functionality of each specific unit (function).

3. **Pipeline Logic Extraction**:
   - By refactoring the `uploadFiles` function to use `asyncPipe()`, you have essentially extracted the "pipeline logic" out of the individual functions and placed it into the `asyncPipe` mechanism.
   - The pipeline (`asyncPipe()`) is just a way to sequence the function calls. It doesn’t contain business logic; it just calls the functions in the order they’re provided. Because of this, there's no meaningful logic left in the `uploadFiles` function itself to unit test. The `asyncPipe` pattern just connects the dots between already tested functions.

4. **Focus on Integration Testing**:
   - After the refactor, what’s left to test is how these functions work together when combined. This is where **integration testing** comes in. 
   - Integration tests will ensure that when `readUser` passes its output to `getFolderInfo`, and `getFolderInfo` passes its output to `haveWriteAccess`, everything works as expected across the boundaries of these functions.

**Before refactoring:**
- The `uploadFiles` function contained conditional logic (`if (await haveWriteAccess(...))`) that had to be tested in isolation with mocks to simulate different scenarios (e.g., what happens if `haveWriteAccess` returns `false`?).

**After refactoring:**
- Each function is isolated and can be tested without worrying about the other functions.
- The `uploadFiles` function now just chains the functions together using `asyncPipe`, so there’s no complex logic left in it to unit test.
- The focus shifts to integration tests that ensure the pipeline works correctly when all the functions are combined.

**In summary:**
- **Unit Tests**: Test each function (`readUser`, `getFolderInfo`, etc.) independently.
- **Integration Tests**: Test the whole pipeline (`uploadFiles` using `asyncPipe`) to ensure that when all these functions work together, the final outcome is as expected.

**For completeness, here is what the tests might look like:**
**upload-files.js**: ![`uploadFiles` Module](./Examples/upload-files/upload-files.js)
**upload-files.test.js** ![`uploadFiles` Tests](./Examples/upload-files/upload-files.test.js)

> Remember: Logic and I/O are separate concerns. Logic is thinking. Effects are actions. Think before you act!

Using **generators** and representations of computations in your unit tests, you can simulate everything _up to but excluding_ invoking the real side-effects. You can pass values into `.next()` calls to fake responses, or throw errors at the iterator to fake errors and promise rejections. Using this style, there's no need to mock anything in unit tests, even for complex integrational workflows with lots of side-effects.

See ![Generator Simulations](./feature-generator-simulation.md)

###### Side Effects Reiterated
To reiterate, "side-effects" encompass actual operations that interact with external systems or have a tangible impact outside the scope of the unit being tested.

They are the changes or actions that occur as a result of executing a function or operation, which affect the external state or environment. For example, writing to a file, making network requests, updating a database, or modifying global variables are all side effects.

**Explicit examples include:**
  * **Network requests:** fetching data from a remote server.
  * **Database operations:** reading from or writing to a database.
  * **File system changes:** creating, modifying, or deleting files
  * **External API calls:** interacting with third-party services.

**In testing:**
  * **Simulating side effects:** in unit testing, especially when using generators, you want to simulate the behavior of these operations without actually performing them. This allows you to test how your code handles different scenarios without affecting external systems or resources.
  * **Avoiding Real Side Effects:** by using generators (as mentioned above) to yield simulated responses or throw simulated errors, you avoid making real network requests, database changes, or other operations that could impact the environment or introduce variability into your tests.

  In the context of using generators to simulate computations and responses in unit tests, the term "real side effect" refers to actual operations that interact with external systems or have a tangible impact outside the scope of the unit being tested. Here's a detailed explanation:

**Benefits of Simulating vs. Real Side Effects**
1. **Control**:
   - **Predictable Testing**: Simulating side effects allows for consistent and predictable test outcomes. You can control exactly what responses or errors are returned, ensuring that tests are reliable and repeatable.

2. **Speed**:
   - **Faster Tests**: Tests that avoid real side effects run faster since they don't wait for network responses or database operations. This can significantly speed up the testing process.

3. **Isolation**:
   - **Unit Isolation**: By avoiding real side effects, you ensure that the unit tests are focused solely on the logic of the code being tested. This isolation helps identify and debug issues more effectively.

4. **Safety**:
   - **Preventing Unintended Changes**: Simulating side effects ensures that tests don’t inadvertently modify production data, corrupt databases, or perform unintended actions.

**Example of Simulating vs. Real Side Effects**
Imagine you have a function that sends an email. In a unit test:

- **Real Side Effect**: If you run the test with the actual email-sending function, it will send real emails, which could be unwanted or disruptive.
- **Simulated Side Effect**: Using a generator, you can simulate the behavior of sending an email by yielding a predefined response, allowing you to test the function’s logic without sending actual emails.

```javascript
// send-email.js
// Function to test with dependency injection
async function sendEmail(emailService) {
    try {
        const response = await emailService.next().value; // { success: true }
        // Handle the response (e.g., log success)
        console.log('Email sent:', response);
    } catch (error) {
        // Handle the error (e.g., log failure)
        console.error('Failed to send email:', error.message);
    }
}

// Real email service function (example)
function* realEmailService() {
    // Here you'd have the actual email sending logic, like calling an API
    yield { success: true }; // Simulate a real successful response
}


// send-email.test.s
// Simulated email service for testing
function* emailSimulator() {
    yield { success: true }; // Simulate a successful email sending
    throw new Error('Email service error'); // Simulate an error
}

// Unit Test using the simulated email service
test('sendEmail handles success and failure scenarios', async () => {
    await sendEmail(emailSimulator()); // Pass the generator instead of the real service
});
```

In this example, `emailSimulator` mimics the behavior of the email service, allowing you to test how `sendEmail` handles different scenarios without triggering real side effects. This removes the necessity for mocking. It gives us a direct control over behavior and we need not rely on a mocking framework to simulate the services behavior. It simplifies the testing setup and enables flexible error handling; However, **mocking** is the standard practice on most teams, so using them aligns better with team conventions and expectations.

**Best practice: A Balanced Approach**
There's no one-size-fits-all answer to whether mocking or using generators is "better." A balanced approach is often best:
  * **Use Mocking** when you need detailed control over how a dependency behaves, especially for complex or external dependencies.
  * **Use generators** when you want to simulate a sequence of events in a simple, self-contained way, especially for more linear or async workflows. 
Both practices have their place, and the best choice depends on the specific needs of your test and the complexity of the system you are working with. It's also perfectly fine to use a combination of both in different parts of your codebase.

##### Mocking is great for integration tests
Because integration tests test collaborative integrations between units, its perfectly ok to fake servers, network protocols, network messages, and so on in order to reproduce all the various conditions you'll encounter during communications with other units, potentially distributed across clusters of CPUs or separate machines on a network.

Sometimes you'll want to test how your unit will communicate with a 3rd party API, and sometimes those API's are prohibitively expensive to test for real. You can record real workflow transactions against the real services and replay them from a fake server to test how well your unit integrates with a third party service actually running in a separate network process. Often this is the best way to test things like "did we see the correct message headers?" 

There are lots of useful integration testing tools that throttle network bandwidth, introduce network lag, produce network errors, and otherwise test lots of other conditions that are impossible to test using unit tests which mock away the communication layer.

It's impossible to achieve 100% case coverage without integration tests. Don't skip them even if you manage to achieve 100% unit test coverage. Sometimes 100% is not 100%.

This means that achieving a high percentage of unit test coverage does not guarantee that the integrated units will function as expected. Therefore, integration tests are necessary to ensure that all components work together correctly and to achieve completeness in testing.

#### Jest Docs: Setup and Teardown

Often while writing tests you have some setup work that needs to happen before tests run, and you have some finishing work that needs to happen after tests run. Jest provides helper functions to handle this.

##### Repeating Setup
💭 "Man, wtf is a hook?": ![]

`beforeEach` and `afterEach` are hooks provided by Jest that aid in performing tests that require a repeating setup.

They are useful when you want to make a change before each test such as resetting the state that is modified in the tests.
 
Let's say that several tests interact with a database of cities. In order to perform the tests we have written, we need to call a function, `initializeCityDatabase()` that must be called before each of these tests, and a method `clearCityDatabase()` that must be called after each test.

That shit would look like dis':
``` javascript
beforeEach(() => {
  initializeCityDatabase();
});

afterEach(() => {
  clearCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});
```

Both `beforeEach` and `afterEach` can handle asynchronous code in the same ways that tests can handle asynchronous code - they can either take a `done` parameter or return a promise. For example, if `initializeCityDatabase()` returned a promise that resolved when the database was initialized, we would want to return that promise:
``` javascript
beforeEach(() => {
  return initializeCityDatabase();
});
```

##### One-Time Setup

In some cases, you only need to do setup once, at the beginning of a file. This can be especially bothersome when the setup is asynchronous, so you can't do it inline. Jest provides `beforeAll` and `afterAll` hooks to handle this situation. 

For Example, in the following, assume `initializeCityDatabase()` is a time-consuming operation and that we need access to the database to perform our tests. Calling it, opens the connection _before all_ our tests run:

``` javascript
beforeAll(() => {
  return initializeCityDatabase();
});

afterAll(() => {
  return clearCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});
```

##### Scoping

The top level `before*` and `after*` hooks apply to every test in a file. THe hooks declared inside a `describe` block apply only to the tests within that `describe` block.

For example, let's say we had not just a city database, but also a food database. We could do different setup for different tests:

``` javascript
// Applies to all tests in this file
beforeEach(() => {
  return initializeCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});

describe('matching cities to foods', () => {
  // Applies only to tests in this describe block
  beforeEach(() => {
    return initializeFoodDatabase();
  });

  test('Vienna <3 veal', () => {
    expect(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
  });

  test('San Juan <3 plantains', () => {
    expect(isValidCityFoodPair('San Juan', 'Mofongo')).toBe(true);
  });
});
```

Note that the top-level `beforeEach` is executed before the `beforeEach` inside the `describe` block. As a matter of fact, here is an execution order illustration for all hooks:

``` javascript
beforeAll(() => console.log('1 - beforeAll'));
afterAll(() => console.log('1 - afterAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));

test('', () => console.log('1 - test'));

describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  afterAll(() => console.log('2 - afterAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));

  test('', () => console.log('2 - test'));
});

// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll
```

##### Order of Execution 

Jest executes all describe handlers in a test file _before_ it executes any of the actual tests. This is another reason to do setup and teardown inside `before*` and `after*` handlers rather than inside the `describe` blocks. Once `describe` blocks are complete, by default Jest runs all the tests serially in the order they were encountered in the collection phase, waiting for each to finish and be tidied up before moving on.

Consider the following illustrative test file and output:
``` javascript
describe('describe outer', () => {
  console.log('describe outer-a');

  describe('describe inner 1', () => {
    console.log('describe inner 1');

    test('test 1', () => console.log('test 1'));
  });

  console.log('describe outer-b');

  test('test 2', () => console.log('test 2'));

  describe('describe inner 2', () => {
    console.log('describe inner 2');

    test('test 3', () => console.log('test 3'));
  });

  console.log('describe outer-c');
});

// describe outer-a
// describe inner 1
// describe outer-b
// describe inner 2
// describe outer-c
// test 1
// test 2
// test 3
```

Just like the `describe` and `test` blocks Jest calls the `before*` and `after*` hooks in the order of declaration. Note that the `after*` hooks of the enclosing scope are called first. For example, here is how you can set up and tear down resources which depend on each other:

``` javascript
beforeEach(() => console.log('connection setup'));
beforeEach(() => console.log('database setup'));

afterEach(() => console.log('database teardown'));
afterEach(() => console.log('connection teardown'));

test('test 1', () => console.log('test 1'));

describe('extra', () => {
  beforeEach(() => console.log('extra database setup'));
  afterEach(() => console.log('extra database teardown'));

  test('test 2', () => console.log('test 2'));
});

// connection setup
// database setup
// test 1
// database teardown
// connection teardown

// connection setup
// database setup
// extra database setup
// test 2
// extra database teardown
// database teardown
// connection teardown
```

##### General Advice

If a test is failing, one of the first things to check should be whether the test is failing when it's the only test that runs. To run only one test with Jest, temporarily change that `test` command to a `test.only`:

``` javascript
test.only('this will be the only test that runs', () => {
  expect(true).toBe(false);
});

test('this test will not run', () => {
  expect('A').toBe('A');
});
```

If you have a test that often fails when it's run as part of a larger suite, but doesn't fail when you run it alone, it's a good bet that something different test is interfering with this one. You can often fix this by clearing some shared state with `beforeEach`. If you're not sure whether some shared state is being modified, you can also try a `beforeEach` that logs data.

##### Mock Functions

Mock functions allow you to test the links between code by erasing the actual implementation of a function, capturing calls to the function (and the parameters passed in those calls), capturing instances of constructor functions when instantiated with `new`, and allowing test-time configuration of return values.

There are two ways to mock functions: Either by creating a mock function to use in test code, or writing a manual mock to override a module dependency.

###### Using a mock function

``` javascript
// forEach.js
export function forEach(items, callback) {
  for (const item of items) {
    callback(item);
  }
}

// forEach.test.js
import { forEach } from './forEach.js'

const mockCallback = jest.fn(x => 42 + x);

test('forEach mock function', () => {
  forEach([0, 1], mockCallback);

  // The mock function was called twice
  expect(mockCallback.mock.calls).toHaveLength(2);

  // The first argument of the first call to the function was 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // The first argument of the second call to the function was 1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // The return value of the first call to the function was 42
  expect(mockCallback.mock.results[0].value).toBe(42);
});
```

##### `.mock` Property

``` javascript
const myMock1 = jest.fn();
const a = new myMock1();
console.log(myMock1.mock.instances);
// > [ <a> ]

const myMock2 = jest.fn();
const b = {};
const bound = myMock2.bind(b);
bound();
console.log(myMock2.mock.contexts);
// > [ <b> ]
```

###### `.mock` Members

``` javascript
// The function was called exactly once
expect(someMockFunction.mock.calls).toHaveLength(1);

// The first arg of the first call to the function was 'first arg'
expect(someMockFunction.mock.calls[0][0]).toBe('first arg');

// The second arg of the first call to the function was 'second arg'
expect(someMockFunction.mock.calls[0][1]).toBe('second arg');

// The return value of the first call to the function was 'return value'
expect(someMockFunction.mock.results[0].value).toBe('return value');

// The function was called with a certain `this` context: the `element` object.
expect(someMockFunction.mock.contexts[0]).toBe(element);

// This function was instantiated exactly twice
expect(someMockFunction.mock.instances.length).toBe(2);

// The object returned by the first instantiation of this function
// had a `name` property whose value was set to 'test'
expect(someMockFunction.mock.instances[0].name).toBe('test');

// The first argument of the last call to the function was 'test'
expect(someMockFunction.mock.lastCall[0]).toBe('test');
```

##### Mock Return Values

``` javascript
// *.test.js

const myMock = jest.fn();
console.log(myMock());
// > undefined

myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);

console.log(myMock(), myMock(), myMock(), myMock());
// > 10, 'x', true, true
```

###### Functional Continuation-Passing Style

``` javascript
const filterTestFn = jest.fn();

// Make the mock return `true` for the first call,
// and `false` for the second call
filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

const result = [11, 12].filter(num => filterTestFn(num));

console.log(result);
// > [11]
console.log(filterTestFn.mock.calls[0][0]); // 11
console.log(filterTestFn.mock.calls[1][0]); // 12
```

##### Mocking Modules

``` javascript
// users.js

import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data);
  }
}

export default Users;
```

As a quick reminder, the `static` method belongs to the `Users` class itself, rather than instances of the class. It allows us to call the `all()` method directly on the class without needing to create an instance of `Users`. 

Now, to test this method without actually hitting the API (and thus creating slow and fragile tests), we can use the `jest.mock(...)` function to automatically mock the `axios` module. 

One we mock the module we can provide a `mockResolvedValue` for `.get` that returns the data we want our test to assert against. In effect, we are saying that we want `axios.get('/users.json')` to return a fake response:

``` javascript
// users.test.js

import axios from 'axios';
import Users from './users';

jest.mock('axios');

test('should fetch users', () => {
  const users = [{name: 'Bob'}];
  const resp = {data: users};
  axios.get.mockResolvedValue(resp); 
  // mocking the resolved value of the get method of the mocked axios module

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return Users.all().then(data => expect(data).toEqual(users));
});
```

* **Why `return`?**
  - The `return` keyword is necessary in the `test` function above because the test involves an asynchronous operation, specifically a promise returned by `Users.all()`. When testing asynchronous code, Jest needs to know when the asynchronous operations have completed to correctly determine if the test has passed or failed. By returning the promise (`Users.all().then(...)`) from the test function, Jest is informed that it should wait for that promise to resolve or reject before considering the test completes. If you _don't_ return the promise, Jest would not wait for the promise to resolve, and it would consider the test as passed as soon as the synchronous part of the test finished. This could lead to false positives where the test passes even though the asynchronous code may have failed. By chaining the `.then()` method to handle the resolved value of the promise, Jest knows to wait for this chain to finish, ensuring that `expect(data).toEqual(users)` is correctly evaluated. 

* **`axios.get.mockResolvedValue(resp)`**
  - **What it does:** This line of code mocks the `axios.get` method to automatically return a resolved promise with the value `resp`.
  - **How it works:** `mockResolvedValue` is a shorthand method provided by Jest to simplify mocking methods that return promises. It automatically returns a promise that resolves with the specified value (`resp` in this case).
  - **Use Case:** Use `mockResolvedValue` when you want a quick and straightforward way to mock a method that returns a promise and you know what value you want it to resolve with. 

* **`axios.get.mockImplementation(() => Promise.resolve(resp)`**
  - **What it does:** This line of code provides a custom implementation for the `axios.get` method. It specifies that when `axios.get` is called, it should return a promise that resolves with the value `resp`.
  - **How it works:** `mockImplementation` is a more flexible method provided by Jest, allowing you to define exactly what the mocked function should do. In this case, the implementation returns a promise that resolves with `resp`.
  - **Use Case:** Use `mockImplementation` when you need more control over the behavior of the mocked function, such as when you need to simulate more complex logic or different behavior for different calls.

##### Mocking Partials

Subsets of a module can be mocked and the rest of the module can keep their actual implementation.

``` javascript
// foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz'

// foo-bar-baz.test.js
import defaultExport, { bar, foo } from './foo-bar-baz.js';

jest.mock('../foo-bar-baz.js', () => {
  const originalModule  = jest.requireActual('./foo-bar-baz.js');

  // Mock the default export and named export 'foo'
  return {
    _esModule: true,
    ... originalModule,
    default: jest.fn(() => 'mocked baz'),
    foo: 'mocked foo'
  };
});

test('should do a partial mock', () => {
  const defaultExportResult = defaultExport();
  expect(defaultExportResult).toBe('mocked baz');
  expect(defaultExport).toHaveBeenCalled();

  expect(foo).toBe('mocked foo');
  expect(bar()).toBe('bar');
});
```

* The order of the returned module in the `mock` call
  - When we want to preserve the functionality of unmodified parts of an imported module while mocking certain aspects of it, we can use the spread operator to include the original module within the returned mock object. The functions or methods we wish to modify must be defined after the spread so they effectively override the corresponding properties from the original module. If we were to spread `originalModule` after defining our custom mock values, the original properties would overwrite our mock implementations.

* **`_esModule: true`** 
  - This flag is required in the returned mock module to indicate that the module being mocked is an ES module, rather than a CommonJS module. This flag tells Jest that the module uses ES module syntax, such as `import` and `export`, which helps Jest handle the module's behavior correctly, particularly with respect to default and named exports.

##### Mock Implementations

**`jestfn()`**

``` javascript
const myMockFn = jest.fn(cb => cb(null, true));

myMockFn((err, val) => console.log(val));
// > true
```

* `jest.fn()` 
  - Used to create a mock function.

* `cb => cb(null, true);`
  - The argument provided to `jest.fn()` is a function, meaning that whenever `myMockFn` is called, it will execute the provided function, passing along any arguments it receives.

* `myMockFn((err, val) => console.log(val));`
  - The invocation of the mock function is called with a callback function as its argument: `(err, val) => console.log(val)`.
  - When `myMockFn` is executed, it runs the function passed to `jest.fn()` with `null` (for `err`) and `true` (for `val`) as its arguments. Thus it logs `true`.

**`mockImplementation`**
  - This method is useful when we need to define the default implementation of a mock function that is created from another module:
``` javascript
// some-implementation.js
module.exports = function () {
  // some implementation 
};

// some-implementation.test.js
jest.mock('./some-implementation');

const someImplementation = require('./some-implementation');

someImplementation.mockImplementation(() => 42);

someImplementation(); // 42
```

When you need to recreate a complex behavior of a mock function such that multiple function calls produce different results, use the `mockImplementationOnce` method:

``` javascript
const myMockFn = jest
  .fn(() => 'default')
  .mockImplementationOnce(() => 'first call')
  .mockImplementationOnce(() => 'second call');

console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
// > 'first call', 'second call', 'default', 'default'
```

Here's a more practical example of where it would make sense to use `mockImplementationOnce()`:

``` javascript
// userService.js
export function getUserData() {
  return axios.get('/user');
}

// userService.test.js
import { getUserData } from './userService';
import axios from 'axios';

jest.mock('axios');

test('should handle different API responses correctly', async () => {
  const userData = { name: 'John Doe', age: 30 };
  
  // Mock the axios.get method to return different results on subsequent calls
  axios.get
    .mockImplementationOnce(() => Promise.reject(new Error('Network Error'))) // First call fails
    .mockImplementationOnce(() => Promise.resolve({ data: userData }));        // Second call succeeds

  try {
    await getUserData();
  } catch (error) {
    expect(error.message).toBe('Network Error');  // First call results in an error
  }

  const response = await getUserData();
  expect(response.data).toEqual(userData);       // Second call returns the user data
});
```
###### `.mockReturnThis()`

For cases where we have methods that are typically chained (and thus always need to return `this`), we have a sugary AI to simplify this in the form of a `.mockReturnThis()` function that also sits on all mocks:
``` javascript
const myObj = {
  myMethod: jest.fn().mockReturnThis(),
};

// is the same as

const otherObj = {
  myMethod: jest.fn(function () {
    return this;
  }),
};
```

Here is a more practical example:
``` javascript
// Logger.js
class Logger {
  constructor() {
    this.logs = [];
  }

  log(message) {
    this.logs.push(message);
    return this; // Allows method chaining
  }

  error(message) {
    this.logs.push(`ERROR: ${message}`);
    return this; // Allows method chaining
  }

  getLogs() {
    return this.logs;
  }
}

export default Logger;
```

In the above, both `log` and `error` methods return `this`, enabling you to chain calls like:
``` javascript
const logger = new Logger();
logger.log('Starting process').error('Something went wrong').log('Process ended');
```

When writing tests, you might want to mock the `log` and `error` methods without implementing the full class. Since these methods are chained, they need to return the object (`this`). This is where `.mockReturnThis()` becomes handy:

``` javascript
// Logger.test.js
import Logger from './Logger';

test('should chain log and error methods correctly', () => {
  const mockLogger = {
    log: jest.fn().mockReturnThis(),    // This mock allows chaining
    error: jest.fn().mockReturnThis(),  // This mock allows chaining
    getLogs: jest.fn().mockReturnValue(['Starting process', 'ERROR: Something went wrong', 'Process ended']),
  };

  // Simulate method chaining
  mockLogger.log('Starting process').error('Something went wrong').log('Process ended');

  // Assertions
  expect(mockLogger.log).toHaveBeenCalledWith('Starting process');
  expect(mockLogger.error).toHaveBeenCalledWith('Something went wrong');
  expect(mockLogger.getLogs()).toEqual(['Starting process', 'ERROR: Something went wrong', 'Process ended']);
});
```

Therefore, when writing a test to mock a chainable class/API, we need not import its actual code. Instead, we focus on testing the logic that uses the chainable class/API. By mimicking its behavior with `mockReturnThis()`, we can effectively isolate our test from the real implementation, ensuring that our client/consumer code is tested independently.

##### Mock Names

You can optionally provide a name for a your mock functions, which will be displayed instead of `jest.fn()` in the test error output. Use `.mockName()` if you want to be able to quickly identify the mock function reporting an error in your test output.

``` javascript
const myMockFn = jest
  // Step 1: Set a default return value for the mock function
  .fn() // Creates a new mock function
  .mockReturnValue('default') // Initially, the mock function will return 'default' for any call
  
  // Step 2: Override the return value with a custom implementation
  .mockImplementation(scalar => 42 + scalar) // The custom implementation now takes precedence, so the function returns 42 + scalar instead of 'default'
  
  // Step 3: Optionally, give the mock function a name for easier identification in test results
  .mockName('add42'); // The mock function is named 'add42' for easier debugging and test clarity

// Usage Example:
// Calling the function without any arguments will now invoke the custom implementation, not the default return value.
console.log(myMockFn(0)); // Outputs: 42 (since 42 + 0 = 42)
console.log(myMockFn(10)); // Outputs: 52 (since 42 + 10 = 52)

// Note:
// The return value 'default' set by `.mockReturnValue('default')` is overridden by `.mockImplementation(scalar => 42 + scalar)`.
// Therefore, the mock function will not return 'default' but will instead execute the implementation provided by `.mockImplementation()`.
```

##### Custom Matchers
More matchers here: ![Jest Matchers](https://jestjs.io/docs/expect)

``` javascript
// The mock function was called at least once
  // Sugar:
  expect(mockFunc).toHaveBeenCalled();
  // Manual:
  expect(mockFunc.mock.calls.length).toBeGreaterThan(0);

// The mock function was called at least once with the specified args
  // Sugar:
  expect(mockFunc).toHaveBeenCalledWith(arg1, arg2);
  // Manual:
  expect(mockFunc.mock.calls).toContainEqual([arg1, arg2]);

// The last call to the mock function was called with the specified args
  // Sugar:
  expect(mockFunc).toHaveBeenLastCalledWith(arg1, arg2);
  // Manual:
  expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1]).toEqual([
    arg1,
    arg2,
  ]);

  // The first arg of the last call to the mock function was `42`
  // (note that there is no sugar helper for this specific of an assertion)
  expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1][0]).toBe(42);


  // All calls and the name of the mock is written as a snapshot
    // Sugar:
    expect(mockFunc).toMatchSnapshot();
    // Manual:
      // A snapshot will check that a mock was invoked the same number of times,
      // in the same order, with the same arguments. It will also assert on the name.
      expect(mockFunc.mock.calls).toEqual([[arg1, arg2]]);
      expect(mockFunc.getMockName()).toBe('a mock name');
```

###### `toMatchSnapshot()`
After you use `toMatchSnapshot()` in a Jest test, Jest creates a snapshot file that captures the current state of the mocked function, component, or output. Here's what the snapshot file and its structure might look like:

**Snapshot File Structure**
1. **Snapshot File Location:**
   - The snapshot file is placed in a `__snapshots__` directory adjacent to the test file. For example, if your test file is named `example.test.js`, the snapshot file would be named `example.test.js.snap` and located in a `__snapshots__` directory at the same level as `example.test.js`.

2. **Snapshot Content:**
   - The snapshot file contains a serialized representation of the test data at the time the snapshot was created. This includes information about how mock functions were called, what arguments were passed, and what values were returned.

**Example of Snapshot File Content**
Consider the following test with a mock function:

```javascript
test('mock function matches snapshot', () => {
  const mockFunc = jest.fn().mockReturnValue('some value');
  
  mockFunc('first call');
  mockFunc('second call');
  
  expect(mockFunc).toMatchSnapshot();
});
```

After running this test, Jest generates a snapshot file `example.test.js.snap` that might look like this:

```javascript
// example.test.js.snap
exports[`mock function matches snapshot 1`] = `
Object {
  "calls": Array [
    Array [
      "first call",
    ],
    Array [
      "second call",
    ],
  ],
  "results": Array [
    Object {
      "type": "return",
      "value": "some value",
    },
    Object {
      "type": "return",
      "value": "some value",
    },
  ],
}
`;
```

**Explanation of Snapshot Content:**
- **`calls`**: An array of arrays where each inner array contains the arguments passed to the mock function for each call.
  
- **`results`**: An array of objects representing the result of each call. Each object contains a `type` (e.g., `return` or `throw`) and a `value` (the result of the function call).

**What is meant by "Adjacent"?**
- **Adjacent** means that the `__snapshots__` directory is at the same directory level as the test file, rather than being nested deeper within other directories. For example:
``` bash
project-root/
├── src/
│   ├── example.test.js
│   └── __snapshots__/
│       └── example.test.js.snap
```

In this structure, the `__snapshots__` folder and the `.snap` file are directly beside the `example.test.js` file, which is what is meant by "adjacent".

**Subsequent Test Runs**
  * Each time you run your tests, Jest compares the current output of your tests to the previously saved snapshot.
  * If the current output differs from the snapshot, Jest will flag this as a test failure. You can then choose to update the snapshot if the changes are intentional and correct via the Jest command `jest --updateSnapshot`
  * When Jest detects a difference between the current output and the snapshot, it shows a diff in the test results. For example:
``` diff
- Object {
-   "calls": Array [
-     Array [
-       "first call",
-     ],
-     Array [
-       "second call",
-     ],
-   ],
-   "results": Array [
-     Object {
-       "type": "return",
-       "value": "some value",
-     },
-     Object {
-       "type": "return",
-       "value": "some value",
-     },
-   ],
- }
+ Object {
+   "calls": Array [
+     Array [
+       "first call",
+     ],
+     Array [
+       "second call",
+     ],
+   ],
+   "results": Array [
+     Object {
+       "type": "return",
+       "value": "updated value",
+     },
+     Object {
+       "type": "return",
+       "value": "updated value",
+     },
+   ],
+ }
```


#### Rails Conference 2013 The Magic Tricks of Testing by Sandi Metz

##### Message Origins
The three origins of messages (queries or commands) from the point of view of the object under test:
1. Incoming
2. Sent to Self
3. Outgoing

##### Review: Query Vs. Command

###### Query

* **Purpose:** A query is used to _retrieve_ information without modifying any data or state.

* **Example:**
  - In JavaScript, `array.length` is a query because it returns the number of elements in the array but doesn't alter it.
  - `array.includes(value)` checks if a value exists in the array and returns `true` or `false`, without modifying the array.

###### Command

* **Purpose:**  A command is used to _modify_ data or state. It may also return a result but its main purpose it to make a change.

* **Example:**
  - In JavaScript, `array.push(value)` is a command because it adds a new element to the array, thereby changing its state.
  - `array.pop()` removes the last element from an array, altering the array's content, and returns the removed element. Although it returns a value, it's primarily a command because it modifies the array.

###### Summary
A command can have query-like behavior (conflated), but a pure query will never modify anything, and thus cannot be considered a command.

##### Testing Rules Pertaining to Queries and Commands

1. **Incoming Query Messages**
  * Test incoming messages by making assertions about what they send back (about _state_): An assertion about a result (value).
  * Test the interface, not the implementation. If we test only the interface, it means we can change the implementation without breaking the test.

2. **Incoming Command Messages**
  * Test incoming messages by making assertions about _direct public side effects_:
    - **Direct:** The effect must be a direct consequence of the action taken by the object or function. There are no intermediaries or dependencies that cause the effect; it's the result of the last object in the chain of actions.
    - **Public:** The side effect is visible or accessible outside the object or function, meaning it has an impact on the system's observable state.
    - **Side Effects:** These are changes or impacts that occur as a result of executing a function or method, beyond just returning a value (e.g., modifying a global variable, updating a database, etc.).

  * Send the message that causes the side-effect, and then make an assertion about the value of it.

3. **Messages Sent to Self** 
  **Private Methods**
  a. **Avoid Testing Private Methods**: 
    - **Reason**: Tests for private methods are tightly coupled to the implementation details rather than the public interface. This makes it difficult to refactor code, as any change to the implementation (even if the public behavior remains the same) can cause these tests to fail.
    - **Impact**: Such tests can lead to fragile test suites that discourage developers from improving or refactoring code, as they might break tests that shouldn’t be relevant to the public behavior.

  b. **Caveat - Cost-Effectiveness During Development**:
    - **Temporary Testing**: It might be practical to write tests for private methods during development to ensure correctness while building the feature. However, these should be seen as temporary and should ideally be removed or moved to a separate file before pushing to production. The latter, I have dubbed a _'Metz'_ practice.
    - **Commenting**: If you leave private tests, clearly mark them as disposable with comments like "if these tests fail, delete them," acknowledging that they’re not part of the long-term test strategy. This is also a _'Metz'_ practice.

  c. **The Adult Rule vs. Practical Rule**:
    - **Adult Rule**: The mature approach is to focus on testing the public interface only, ignoring private methods. This aligns with the principle of testing behavior, not implementation.
    - **Practical Rule**: In some scenarios, particularly when cost or time is a factor, it might be practical to test private methods temporarily. However, the overarching goal should be to ensure that these tests do not hinder future refactoring or improvements.

    **Summary**
      - **Private Methods Are an Implementation Detail**: Testing should focus on the external behavior of the class or module. If a private method is critical enough to warrant testing, consider whether it should be extracted and made part of the public interface of a new class or module.
      - **Segregating Private Tests**: If you must test private methods, isolate them in their own test file, clearly separated from the main test suite. This segregation minimizes the impact on refactoring while allowing you to test specific logic during development.

4. **Outgoing query messages**
  - **Ignore Them:** When testing, you don't need to assert the behavior of outgoing query messages. The responsibility for ensuring correct state or response lies with the receiver of the query. Testing outgoing queries would be redundant, as the receiver of the query should already have tests verifying the correct handling of such queries. Therefore, focus on testing the effects of receiving and processing the query on the receiving side.

5. **Outgoing command messages**
  - When testing outgoing command messages, it's important to note that the object sending the command is not responsible for testing the distant side effect that the command triggers. Testing the actual outcome or side effect of the command would fall under the scope of an integration test.

  - Instead, the focus should be on verifying that the command was correctly sent. This is where mocking comes in:
    1. **Create and Inject the Mock**: Use a mock object to replace the actual recipient of the command.
    2. **Set an Expectation**: Define an expectation that the message (or command) will be sent to the mock object.
    3. **Trigger the Event**: Perform the action in your test that would normally cause the command to be sent.
    4. **Verify the Test**: Confirm that the mock object received the expected command, verifying that the correct message was sent.

##### Summary: Final Rules

**Be a Minimalist:**
- Use good judgment.
- Test everything _once_.
- Trust collaborators.
- Insist on simplicity.
- Practice the tricks!

## Knowledge Check

### What is tightly coupled code?

- **Definition**: Tightly coupled code refers to a situation where different components or classes in a software system are highly dependent on each other. This means that changes in one component can necessitate changes in other dependent components.

- **Characteristics**:
  - **High Dependency**: Components rely heavily on the internal workings or specific implementations of other components.
  - **Difficulty in Refactoring**: Because of these dependencies, modifying one component often requires modifying others, which can complicate code maintenance and refactoring.
  - **Reduced Flexibility**: Tightly coupled systems are less flexible and harder to test in isolation because changes in one part of the system can affect others.

#### Example:
If you have a class `A` that directly creates and interacts with instances of class `B`, and `B` is changed, you might need to change `A` as well. This direct dependency makes `A` and `B` tightly coupled.

**Contrast with Loosely Coupled Code**:
- **Loosely Coupled Code**: In a loosely coupled system, components interact with each other through well-defined interfaces or abstractions, reducing the direct dependencies. Changes to one component are less likely to require changes in others, improving flexibility and maintainability.

In summary, tightly coupled code involves strong dependencies between components, making it more difficult to modify, test, and maintain the system.

---

### What are the two requirements for a function to be pure?

1. **Deterministic Output**: Given the same input, a pure function must always produce the same output. This means that the function's result is entirely dependent on its input values and does not vary across different executions.

   - **Clarification**: The function should produce the same output **every time** it is called with the same inputs. The goal is complete consistency.

2. **No Side Effects**: A pure function should not cause any side effects. This means it should not modify any external state or perform operations that affect the outside world, such as writing to a file, changing a global variable, or sending a network request.

   - **Clarification**: Side effects refer to any observable interaction with the outside world. The function's behavior should be self-contained, and it should not alter any external state or interact with other systems beyond returning a value based on its input.

#### Summary

- **Deterministic**: Always produces the same output for the same input.
- **No Side Effects**: Does not alter any external state or produce observable effects outside the function.

By adhering to these two requirements, a function is considered pure, which facilitates easier testing, reasoning, and debugging.

---

### What are side effects and why is it important to identify them when testing a function?
**Side effects** refer to any observable changes or actions that a function performs outside of its local scope, beyond simply returning a value. Identifying side effects is crucial when testing functions because they can impact the function's behavior, reliability, and testability. Here's a detailed look at side effects and their importance in testing:

#### What Are Side Effects?

**Side Effects** Include:
1. **State Modifications**: Changes to variables, data structures, or objects outside the function, such as modifying global variables or class properties.
2. **I/O Operations**: Interactions with external systems, such as writing to or reading from files, sending network requests, or interacting with databases.
3. **External State Changes**: Alterations in external systems or services that the function interacts with, like updating a UI element or changing the state of a shared resource.
4. **Exceptions and Errors**: Throwing exceptions or logging errors, which might affect how other parts of the system behave or how tests are interpreted.

#### Why Is It Important to Identify Side Effects in Testing?

1. **Test Isolation**: 
   - **Impact**: Functions with side effects can make tests interdependent, meaning that the result of one test might affect others. Identifying side effects helps ensure that tests are isolated and independent, making them more reliable.
   - **Example**: If a function writes to a file, subsequent tests might fail if the file state is not properly reset between tests.

2. **Predictability and Reliability**:
   - **Impact**: Functions with side effects can produce different results based on the external state, making it difficult to predict and reproduce outcomes. Identifying and managing side effects improves the consistency and reliability of tests.
   - **Example**: A function that depends on network availability might produce inconsistent results if the network state changes.

3. **Debugging and Maintenance**:
   - **Impact**: Side effects can introduce bugs that are hard to track down because they might affect other parts of the system. Identifying side effects helps in debugging and maintaining code by isolating and controlling their impact.
   - **Example**: A function that updates a global variable might inadvertently affect other parts of the code that rely on that variable.

4. **Test Setup and Cleanup**:
   - **Impact**: Functions with side effects might require additional setup and cleanup steps in tests to ensure that side effects do not interfere with other tests. Identifying side effects allows for proper test preparation and teardown.
   - **Example**: Setting up mock servers or databases to simulate external interactions and then cleaning them up after tests.

5. **Mocking and Stubbing**:
   - **Impact**: Understanding side effects helps in deciding when to use mocks or stubs to simulate interactions with external systems, isolating the function under test.
   - **Example**: Using a mock object to simulate database access instead of performing actual database operations during testing.

#### Summary

Identifying side effects is crucial in testing because it ensures that tests are reliable, predictable, and isolated from external changes. By managing and controlling side effects, you can create robust tests that accurately reflect the function's behavior and facilitate easier debugging and maintenance.

---

### What should you try before testing tightly coupled code?

**1. Simplify Functions:**
   - **Abstract Out Parts**: Break down complex functions into smaller, more manageable functions. Each smaller function should handle a distinct piece of functionality. This process makes it easier to test each function in isolation, leading to more straightforward and effective testing.
   - **Example**: If you have a function that performs multiple operations (e.g., data validation, processing, and logging), consider refactoring it into separate functions for validation, processing, and logging. This way, you can test each operation independently.

**2. Use Dynamic Compositions:**
   - **Dynamic Compositions**: Structure your code to use dynamic compositions where possible. This involves composing functions or components dynamically rather than using imperative approaches that tightly couple different parts of the code.
   - **Example**: Instead of hard-coding the steps of a process within a single function, use higher-order functions or composition patterns to build the process dynamically. This allows for easier testing of each component in isolation.

**3. Avoid Imperative Compositions:**
   - **Imperative Compositions**: This approach involves tightly coupling different pieces of functionality together in a specific sequence. It can make the code harder to test because changes in one part of the code might require changes in other parts.
   - **Example**: A function that directly modifies global state or relies heavily on other functions' internal behavior is tightly coupled. Refactoring to avoid such direct dependencies helps in creating more testable code.

**Benefits of Simplifying and Abstracting Code:**
- **Improved Testability**: Smaller, well-defined functions are easier to test in isolation. You can write unit tests for each function separately, which helps in catching bugs early and ensuring each function behaves as expected.
- **Better Maintainability**: Simplified code with clear abstractions is easier to understand and maintain. It also reduces the likelihood of introducing bugs when making changes or adding new features.
- **Enhanced Reusability**: Abstracted functions can be reused across different parts of your codebase or in different projects, promoting code reuse and reducing redundancy.

#### Summary

Before testing tightly coupled code, simplify and refactor your functions by abstracting out parts into standalone functions. This approach leads to dynamic compositions and makes the testing process easier and more effective. Avoiding imperative compositions reduces tight coupling and enhances testability, maintainability, and reusability.

---

### How can you test code that can't be decoupled? What is mocking? When should you use a mock function?

When you can't easily decouple code, testing can be challenging. However, there are strategies to effectively test such code, with mocking being one of the most common techniques:

1. **Mocking**:
   - **Definition**: Mocking involves creating mock objects or functions that simulate the behavior of real components. This allows you to test interactions between components without needing the real implementations.
   - **Use**: You can use mocking to isolate the unit of code you're testing from its dependencies. For instance, if a function depends on another function or a module that can't be easily decoupled, you can replace that dependency with a mock.
   - **Tools**: Many testing frameworks, like Jest, provide built-in support for mocking. For example, `jest.mock()` can be used to mock modules, and `jest.spyOn()` can be used to spy on method calls.

2. **Integration Testing**:
   - **Definition**: Integration tests focus on the interactions between components and can be useful when dealing with tightly coupled code.
   - **Use**: Even if you can't fully decouple the code, you can write tests that ensure the components work together as expected. This approach tests the system as a whole, verifying that different parts integrate correctly.

3. **Test Doubles**:
   - **Definition**: Test doubles include mocks, stubs, fakes, and spies that replace real components in tests.
   - **Use**: Depending on the scenario, different types of test doubles can be used. For example, a stub might be used to provide controlled responses, while a spy can be used to verify interactions.

4. **Refactoring**:
   - **Definition**: Refactoring involves restructuring code without changing its external behavior.
   - **Use**: While not always feasible, refactoring can sometimes simplify tightly coupled code, making it easier to test. For instance, extracting parts of the code into smaller, testable units can help.

5. **Dependency Injection**:
   - **Definition**: Dependency injection is a technique where dependencies are passed to a component rather than the component creating them.
   - **Use**: By using dependency injection, you can inject mock dependencies into the component, allowing for easier testing of the component's behavior.

#### Example of Mocking

Here’s a brief example of how you might use mocking with Jest:

```javascript
// Example function to be tested
const fetchData = async (apiClient) => {
  const response = await apiClient.get('/data');
  return response.data;
};

// Test file
import { fetchData } from './fetchData';

test('fetchData uses apiClient to fetch data', async () => {
  const mockApiClient = {
    get: jest.fn().mockResolvedValue({ data: 'mock data' }),
  };

  const result = await fetchData(mockApiClient);

  expect(mockApiClient.get).toHaveBeenCalledWith('/data');
  expect(result).toBe('mock data');
});
```

In this example:
- `mockApiClient` is a mock object that simulates the behavior of a real API client.
- The test verifies that `fetchData` calls `apiClient.get` with the correct arguments and processes the response as expected.

#### Summary

Mocking is a powerful technique for testing tightly coupled code by isolating the unit of work from its dependencies. Alongside mocking, you can use integration tests, test doubles, and dependency injection to manage and test complex codebases effectively.

---

### How should you test incoming query messages?
As it is the receiver of the messages job to assert an expectation about the value, our test should determine if the input/incoming message leads to an expected value via an assertion. 

Here’s a more detailed explanation:

1. **Responsibility of the Receiver**:
   - The receiver of the incoming query message is responsible for handling the query and providing the correct response based on its internal state or logic.

2. **Test Objective**:
   - The objective when testing incoming query messages is to ensure that the receiver processes the query correctly and returns the expected result.

3. **Testing Approach**:
   - **Input-Output Verification**: You need to test that for a given input (the query), the receiver produces the correct output. This involves making assertions about the returned value from the query.
   - **Assertion**: In your test, send a query to the receiver and then assert that the result matches the expected value.

#### Example

Here’s a simplified example to illustrate testing an incoming query message:

Suppose you have a `User` class with a `getUserName()` method:

```javascript
class User {
  constructor(name) {
    this.name = name;
  }

  getUserName() {
    return this.name;
  }
}
```

To test that `getUserName` returns the correct user name:

```javascript
// user.test.js
import User from './User';

test('getUserName returns the correct user name', () => {
  const user = new User('Alice');

  // Send the query
  const name = user.getUserName();

  // Assert that the result matches the expected value
  expect(name).toBe('Alice');
});
```

#### Summary

When testing incoming query messages, your test should:
- Focus on the receiver of the query.
- Verify that the receiver produces the correct output for a given input.
- Make assertions about the returned values to ensure correctness.

This approach ensures that the receiver’s implementation is correct and that it handles queries as expected.

---

### Why should you not test implementation?
Because implementations should be interchangeable for improvements. Testing implementations will cause our tests to break when changing them. Doing so also acts as a barrier for collaborators who wish to refactor our code. This is why we should test our interface. Programming to an interface in general leads to a cleaner codebase and more testable code.

To elaborate:

1. **Flexibility for Improvements**:
   - **Interchangeable Implementations**: Testing the implementation directly ties your tests to the specific details of that implementation. This makes it difficult to change or improve the implementation without breaking the tests, even if the changes do not alter the observable behavior or interface.
   - **Barrier to Refactoring**: When tests are closely tied to implementation details, refactoring or improving the code becomes harder because you'll need to update the tests to match the new implementation. This can discourage necessary refactoring and limit code evolution.

2. **Focus on Interface**:
   - **Test the Behavior, Not the Details**: By testing the public interface (i.e., the observable behavior) rather than the internal implementation, your tests remain valid even if the implementation changes. This ensures that tests are resilient to changes and focus on what the code is supposed to do rather than how it does it.
   - **Cleaner Codebase**: Programming to an interface encourages you to design code in a way that is modular and flexible. It often leads to a more organized and maintainable codebase where components interact through well-defined interfaces.

3. **Collaborative Benefits**:
   - **Easier Refactoring**: When tests are based on the interface, collaborators can refactor and improve the implementation without needing to update tests, as long as the interface remains consistent. This promotes better teamwork and makes the codebase easier to manage.

By focusing on testing the interface and observable behavior rather than the implementation details, you create a more maintainable, flexible, and collaborative codebase.

Certainly! Let's explore both concepts with examples:

#### Example 1: Testing an Interface

Suppose you have a simple module that calculates discounts based on customer type. You have an interface defined by a method `calculateDiscount` which should return a discount percentage based on the input.

##### Module Code

```javascript
// discount.js
export class DiscountCalculator {
  calculateDiscount(customerType) {
    // Implementation details
    if (customerType === 'premium') {
      return 20;
    } else if (customerType === 'regular') {
      return 10;
    }
    return 0;
  }
}
```

##### Test Code

Instead of testing the internal implementation of the `calculateDiscount` method, you test the interface (i.e., what the method returns based on inputs).

```javascript
// discount.test.js
import { DiscountCalculator } from './discount';

describe('DiscountCalculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new DiscountCalculator();
  });

  test('should return 20% discount for premium customers', () => {
    expect(calculator.calculateDiscount('premium')).toBe(20);
  });

  test('should return 10% discount for regular customers', () => {
    expect(calculator.calculateDiscount('regular')).toBe(10);
  });

  test('should return 0% discount for unknown customer types', () => {
    expect(calculator.calculateDiscount('unknown')).toBe(0);
  });
});
```

In this test suite, you only care about the output of the `calculateDiscount` method based on different inputs. You are not concerned with how the method achieves the result, which allows you to change the internal logic without altering the tests, as long as the interface remains consistent.

#### Example 2: Programming to an Interface

Let's consider a scenario where you want to design a system that handles payments. You define an interface for payment processing, and then you can implement different payment methods (e.g., PayPal, Credit Card) that adhere to this interface.

##### Interface Definition

```javascript
// paymentInterface.js
export class PaymentProcessor {
  processPayment(amount) {
    throw new Error('Method not implemented');
  }
}
```

##### Implementation 1: PayPal

```javascript
// paypal.js
import { PaymentProcessor } from './paymentInterface';

export class PayPalProcessor extends PaymentProcessor {
  processPayment(amount) {
    console.log(`Processing ${amount} through PayPal`);
    // PayPal-specific payment processing logic
  }
}
```

##### Implementation 2: Credit Card

```javascript
// creditCard.js
import { PaymentProcessor } from './paymentInterface';

export class CreditCardProcessor extends PaymentProcessor {
  processPayment(amount) {
    console.log(`Processing ${amount} through Credit Card`);
    // Credit Card-specific payment processing logic
  }
}
```

##### Using the Interface

```javascript
// paymentService.js
import { PayPalProcessor } from './paypal';
import { CreditCardProcessor } from './creditCard';

function makePayment(amount, processor) {
  processor.processPayment(amount);
}

const paypalProcessor = new PayPalProcessor();
const creditCardProcessor = new CreditCardProcessor();

makePayment(100, paypalProcessor); // Logs: Processing 100 through PayPal
makePayment(200, creditCardProcessor); // Logs: Processing 200 through Credit Card
```

#### Summary

💭 The above pattern where we create an abstract interface (i.e., a `class` is _one way_ to create an interface in JS) that defines a method signature but throws an error if an attempt is made to call the method without providing an implementation (via `extend` in the case of a class) is called the **Template Method Pattern** (in object-oriented design). We create a skeleton of an algorithm in a base class and allow subclasses to override specific steps. Here are more ways to create interfaces in JavaScript ![Interfaces in JavaScript](../../rabbitHoles/interfaces-in-js.md)

1. **Testing an Interface**:
   - Focuses on testing the observable behavior of a method, not its implementation.
   - Example tests the output of `calculateDiscount` regardless of its internal logic.

2. **Programming to an Interface**:
   - Defines a common interface that multiple implementations can adhere to.
   - Example shows different payment processors implementing the same `processPayment` interface. The client code uses the interface to interact with these processors, allowing for flexibility and interchangeability.

Both approaches promote code maintainability and flexibility by decoupling the code from specific implementations and focusing on behavior and contract adherence.

### Should you test private methods?

No, you typically should not test private methods directly. Instead, focus on testing the public interface of the class or module. If the public methods behave as expected and return the correct output for a given input, it indirectly proves that the private methods (internals) are working correctly. Testing private methods directly can lead to redundant tests and make refactoring more difficult, as changes to internal implementation details could break tests even if the public behavior remains correct.

### Why should you not test outgoing messages with no side effects (queries)?

You generally don't need to test outgoing query messages (those that have no side effects) because these messages are usually just requests for information or data. The main responsibility lies with the **receiver** of the message to ensure that it correctly processes the input and returns the expected output. 

Testing outgoing queries directly would often be redundant because it would duplicate the receiver's responsibility. If the receiver’s tests ensure that it handles the input correctly, it implies that the sender (the one making the query) has fulfilled its role. Therefore, focusing on the receiver's tests is usually sufficient.

#### Summary:
- **Testing Outgoing Queries**: Generally unnecessary and redundant.
- **Receiver's Responsibility**: The receiver should be tested to ensure it processes the input correctly, which implicitly tests that the sender's outgoing queries are working as intended.

### 💭 Bonus - Testing Outgoing _Commands_

Testing an outgoing command is typically considered an integration test. This is because the responsibility of the object under test is to ensure that the outgoing command is correctly formatted and sent, not to verify the resultant state changes. The actual verification of state mutation or the overall system behavior after the command is processed falls under integration testing, which checks how different components of the system work together. Thus, while the object under test should ensure that it sends the correct command, testing whether the state was properly mutated or the system behaves as expected after the command involves checking the interactions between components, which is the domain of integration tests.

---

