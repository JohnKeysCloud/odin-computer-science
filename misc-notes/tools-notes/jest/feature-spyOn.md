### How `jest.spyOn()` Works:

1. **Import the Module/Object**: You must first import the module or object that contains the method you want to spy on.
2. **Spying on a Method**: You use `jest.spyOn()` to create a spy on the specific method. This replaces the original method with a mock function that you can control (e.g., to track calls or change its behavior).

### Example:
Suppose you have a module `math.js` with a function `add()`:

```javascript
// math.js
export const add = (a, b) => a + b;
```

To spy on the `add` function in a test, you would do the following:

```javascript
// math.test.js
import * as math from './math';  // Import the module

test('spies on add method', () => {
  const spy = jest.spyOn(math, 'add');  // Spy on the add function

  // Call the function to trigger the spy
  const result = math.add(1, 2);

  // Assert that the spy was called
  expect(spy).toHaveBeenCalled();
  expect(spy).toHaveBeenCalledWith(1, 2);
  expect(result).toBe(3);

  // Restore the original method if needed
  spy.mockRestore();
});
```

### Key Points:
- **Import Required**: You must import the module or object that you want to spy on because `jest.spyOn()` needs to replace the actual method within the imported module.
- **Spy on Specific Method**: `jest.spyOn()` only works on methods of objects or classes, so you need to provide both the object (e.g., `math`) and the method name (`'add'`).
- **Control and Restore**: Once you spy on a method, you can track its calls, alter its behavior using `.mockImplementation()`, and eventually restore it to its original state with `.mockRestore()`.

### What Happens Internally:
When you use `jest.spyOn()`, Jest temporarily overrides the original implementation of the method you're spying on. It manipulates how that method behaves during your test, allowing you to inspect how it's called, change its behavior, and verify that it's used as expected.

### Conclusion:
You need to import the module or object containing the method you wish to spy on with `jest.spyOn()`. The spy then manipulates the method during the test, allowing you to assert on its usage without permanently altering the original function.