# Call a Function Once in JavaScript

## Implementation
``` javascript

// Preferred: ES6 Arrow Function
// Arrow functions do not have their own this context; they inherit it from the surrounding scope. This can simplify the once function slightly, especially if you don't need to worry about the this context being altered.
const onceArrow = (fn) => {
  let called = false;
  return (...args) => {
    if (called) return;
    called = true;
    return fn(...args);  // No need for `apply` if you don't need to handle `this`
  };
};

// Alternative 1: `apply()`
const onceApply = fn => {
  let called = false;
  return function(...args) {
    if (called) return;
    called = true;
    return fn.apply(this, args);
  };
};

// Alternative 2: `WeakMap`
// If you need to apply the once behavior to multiple functions and want to track each one independently, you can use WeakMap to track which functions have been called. We use a weakmap here because it will ensure that if we erase our function (or any other object used as a key) and there are no remaining strong references to that object, it becomes eligible for garbage collection. Consequently, the entry associated with that key in the `WeakMap` will be automatically removed by the garbage collector. It manages memory more effectively.
const onceWeakMap = (() => {
  const calledFunctions = new WeakMap();
  return (fn) => (...args) => {
    if (calledFunctions.has(fn)) return;
    calledFunctions.set(fn, true); 
    // `true` is essentially used as a placeholder to indicate that the function has been called.
    return fn(...args);
  };
})();

// Alternative 3: Using Built-in EventListener Options (for events)
// If your goal is specifically to ensure that an event listener only fires once, the addEventListener method in modern browsers has a once option that you can use directly.
document.body.addEventListener('click', startApp, { once: true });

const startApp = function(event) {
  console.log(this, event); // document.body, MouseEvent
};
document.body.addEventListener('click', once(startApp));
// only runs `startApp` once upon click
```

## Understanding Arrow Functions for `once` Behavior:

1. **Arrow Functions:**
   - Arrow functions (`() => {}`) do not have their own `this` context. Instead, they inherit `this` from the surrounding lexical scope at the time of their creation.
   - This behavior is useful in situations where you need to ensure that `this` is consistently bound, especially in callbacks or event handlers.

2. **Arrow Function for "Once" Behavior:**
   - Using an arrow function to implement "once" behavior ensures that the context (`this`) is preserved as intended. This is because the arrow function inherits `this` from the surrounding context where it was defined.

3. **Implementation Example:**
   - In the provided code, the arrow function is used to ensure that `startApp` is only executed once per event. The `this` context is correctly bound due to the lexical scoping of the arrow function.
   - Here’s how it works:

### Example Walkthrough:
```javascript
const once = fn => {
  let called = false;
  return function(...args) {    // `this` is inherited from the outer scope where `once` is defined
    if (called) return;
    called = true;
    return fn(...args);  // Calls `fn` (`startApp`) with the arguments, without using `apply`
  };
};

const startApp = (event) => {
  console.log(this, event); // `this` is inherited from the lexical scope where `startApp` is defined
};
document.body.addEventListener('click', once(startApp));  // `once(startApp)` is invoked on click
```

### Behavior Explained:
- **`this` Context**: In this implementation, `this` inside `startApp` is not explicitly set by `apply` or `call`, but rather inherited from the scope where `startApp` is defined. This can sometimes lead to unexpected results if the context is not what you expect.
- **Arguments**: The `args` array contains the arguments from the event listener, which include the event object. The arrow function directly passes these arguments to `startApp`.

### Summary:
- Arrow functions are used to preserve the `this` context from their lexical scope, which simplifies handling context-related issues.
- In the "once" behavior implementation, the arrow function does not use `apply` or `call`, but instead directly calls the wrapped function with arguments.
- This approach ensures that `startApp` runs only once per event, but be mindful that `this` in `startApp` will be inherited from its surrounding scope, not explicitly set by the `once` function.

## Alternative 1: `once` with `apply()` Explained

### Understanding `apply` in the Context of `this`:

1. **`apply` Method:**
   - `apply` is a method available on JavaScript functions that allows you to call a function with a specified `this` context and an array (or array-like object) of arguments.
   - When you use `fn.apply(this, args)`, the `this` inside the `startApp` function will be whatever `this` was when the wrapped function (in this case, the function returned by `once`) was called.

2. **Context (`this`) in the Example:**
   - When `document.body.addEventListener('click', once(startApp))` is executed, `once(startApp)` returns a new function that wraps the `startApp` function.
   - When the event listener is triggered by a click, the new function (the wrapper) is called. In this case, `this` inside the wrapper function refers to `document.body`, because the event handler is invoked with the context of the element that received the event (in this case, `document.body`).

3. **How `apply` Uses the Context:**
   - Inside the wrapper function, `fn.apply(this, args)` calls `startApp` with `this` set to `document.body` (the element that triggered the event), and `args` set to the arguments passed to the wrapper function (which will include the event object).
   - This ensures that when `startApp` is called, it behaves as if it was directly invoked by the event listener, preserving the context of `this` as `document.body`.

### Behavior Explained:
- **`this` Context**: When `startApp` is invoked via `apply`, the context (`this`) is preserved as `document.body`. This is because `apply` uses the `this` value from the wrapper function, which is automatically set to the event target (`document.body`) by the event listener.
- **Arguments**: The `args` array passed to `apply` contains the arguments from the event listener, which typically include the event object (`MouseEvent`).

### Example Walkthrough:
```javascript
const once = fn => {
  let called = false;
  return function(...args) {    // `this` is `document.body` because this function is called as an event handler
    if (called) return;
    called = true;
    return fn.apply(this, args);  // Calls `fn` (`startApp`) with `this` as `document.body` and `args` as the event object
  };
};

const startApp = function(event) {
  console.log(this, event); // `this` is `document.body`, `event` is a MouseEvent
};
document.body.addEventListener('click', once(startApp));  // `once(startApp)` is invoked on click
```

### Summary:
- `apply` is used to call a function with a specified `this` context.
- In the `once` wrapper, `this` is determined by the event listener, so when `apply` is called, it passes `document.body` as the context to `startApp`.
- The `startApp` function is correctly executed with `document.body` as `this` and the click event as the argument, ensuring it only runs once per click on `document.body`.


## <!--  TODO: --> `once` with Arrow Function Explained