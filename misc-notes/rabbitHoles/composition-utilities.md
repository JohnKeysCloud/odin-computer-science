**Examples of generic composition utilities:**

1. **Function composition** e.g., `lodash/fp/compose`
``` javascript
// Combining functions where the output of one function becomes the input of the next
const { compose } = require('lodash/fp');

const addOne = (x) => x + 1;
const double = (x) => x * 2;

const addOneAndDouble = compose(double, addOne);

console.log(addOneAndDouble(3)); // Outputs: 8
```

2. **Component composition** e.g., composing higher-order components with function composition
``` javascript
// Creating react components, and creating HOC's with them to add functionality.

// Adds a logger to a component that enables the logging of its properties
const withLogger = (Component) => (props) => {
  console.log('Rendering with props:', props);
  return <Component {...props} />;
};

// Wraps a component in a div with a class of theme-dark
const withTheme = (Component) => (props) => (
  <div className="theme-dark">
    <Component {...props} />
  </div>
);

const MyComponent = (props) => <div>Hello, {props.name}</div>;

const EnhancedComponent = withLogger(withTheme(MyComponent));

// In React render:
// <EnhancedComponent name="World" />
```

3. **State store/model composition** e.g., Redux `combineReducers`
Redux is a state management library often used with React.
In Redux, a reducer is a function that takes the current state and an action as arguments and returns a new state. The state represents the current data of your application, and the action represents something that happened (e.g., a user clicked a button).

In the following, `userReducer` manages the state related to the user, such as their profile information. The initial state is an empty object: `{}`. `postsReducer` manages the state related to posts, such as a list of blog posts. The initial state is an empty array `[]`. Each reducer has its own logic to handle specific actions and update the state accordingly. 

`combineReducers` is a function provided by Redux to help you combine multiple reducers into a single root reducer.  You pass it a object where each key responds to a slice of your applications state, and each value is the reducer responsible for managing that slice. In the case below, `userReducer` is responsible for the `user` slice of state and `postReducer` is responsible for the `posts` slice of state. The resulting `rootReducer` will be a function that manages the entire state of the application by delegating responsibility to the appropriate reducer based on the part of the state being updated.

Once `combineReducers` creates the `rootReducer`, Redux will use it to manage the state of application. When an action related to the user is dispatched (like updating the user profile), `rootReducer`, will return the new `user` state. If an action related to posts is dispatched (liked adding a new post), `rootReducer` will delegate this action to `postsReducer`, which will update the `posts` state.

The overall state of the application managed by `rootReducer` will look something like a JSON file with the name of the various state objects (the 'state slices') as properties and their values, the state objects themselves.

This is what the shit looks like:
``` javascript
import { combineReducers } from 'redux';

const userReducer = (state = {}, action) => {
  // user reducer logic
};

const postsReducer = (state = [], action) => {
  // posts reducer logic
};

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
});

// rootReducer will now manage both `user` and `posts` slices of state
```

4. **Object or factory composition** e.g., mixins or functional mixins
``` javascript
const canFly = (obj) => ({
  ...obj,
  fly: () => console.log('Flying!'),
});

const canSwim = (obj) => ({
  ...obj,
  swim: () => console.log('Swimming!'),
});

const duck = canSwim(canFly({ name: 'Duck' }));

duck.fly(); // Outputs: Flying!
duck.swim(); // Outputs: Swimming!
```

5. **Process composition** e.g., transducers
Transducers are a concept in functional programming that allow you to compose transformation processes in a way that is efficient and reusable. They are typically used in scenarios where you want to process data through a pipeline of transformations, such as filtering, mapping, or reducing, but without creating intermediate collections or data structures.

**Peep this shit my boy:**
```javascript
// 1. Define basic transformation functions
const double = (x) => x * 2;
const isEven = (x) => x % 2 === 0;

// 2. Create transducer higher-order functions
const map = (fn) => (reducer) => (acc, value) => reducer(acc, fn(value));
const filter = (predicate) => (reducer) => (acc, value) => {
  return predicate(value) ? reducer(acc, value) : acc;
}

// 3. Test map transducer
// Create Reducer Function
const arrayReducer = (acc, value) => {
  acc.push(value);
  return acc;
};
const mapDouble = map(double)(arrayReducer); // {1}
const numbers = [1, 2, 3];
const result = numbers.reduce(mapDouble, []); // {2} | [2, 4, 6]

// 4. Compose transducers
const composedTransducer = (reducer) => {
  return map(double)(filter(isEven)(reducer));
};

// 5. Apply the composed transducers
const numbersTwo = [1, 2, 3, 4, 5];
const composedResult = numbers.reduce(composedTransducer(arrayReducer), []); // {3}
console.log(result); // Output: [4, 8]
```

**Another Transducer Example Scenario:** Summing Double the Amounts of Grocery Transactions
``` javascript
// transactions array
const transactions = [
  { type: 'grocery', amount: 50 },
  { type: 'electronics', amount: 200 },
  { type: 'grocery', amount: 30 },
  { type: 'clothing', amount: 100 },
  { type: 'grocery', amount: 20 },
];

// basic functions
const isGrocery = (transaction) => transaction.type === 'grocery';
const doubleAmount = (transaction) => ({ ...transaction, amount: transaction.amount * 2 });
const sumReducer = (acc, transaction) => acc + transaction.amount;

// transducers
const map = (fn) => (reducer) => (acc, value) => reducer(acc, fn(value));
const filter = (predicate) => (reducer) => (acc, value) => {
  return predicate(value) ? reducer(acc, value) : acc;
};

// compose transducers {4}
const composedTransducer = (reducer) => {
  return map(doubleAmount)(filter(isGrocery)(reducer));
};

// apply the composed transducer
const totalDoubleGrocery = transactions.reduce(composedTransducer(sumReducer), 0);
console.log(totalDoubleGrocery); // Output: 200
```

{1} `map(fn)` is a higher-order function that takes a function as its argument. This `fn` is the transformation function that will be applied to each value in the data collection.
The `map` function returns _another_ function that takes a `reducer` as its argument. This `reducer` is the function that will be used to accumulate the transformed values. The returned function is the transducer itself and it takes the two arguments, accumulator and value. Our reducer function applies the function we passed into our map to each element of our array via the passing of the accumulator, an empty array and the value, with the function applied to it via `fn(value)`.

{2} `map(double)` returns a function that takes a `reducer` function as its argument. In this case, `reducer` will be `arrayReducer`. 
`map(double)(arrayReducer)` now returns _another_ function that takes two arguments: `acc` (the accumulator) and `value` (the current value being processed).
Inside this returned function, it calls the original `arrayReducer`, but before it does, it first applies the `double` function to the `vslue`. 

{3} When `mapDouble` is passed into the `reduce` function, it takes over the role of the reducer. In this context, `reduce` starts by passing the first value from the array as the current value to `mapDouble`. The `mapDouble` function then applies the `double` function to this value, and the `arrayReducer` function (baked into `mapDouble`) updates the accumulator accordingly.

The accumulator is initialized as an empty array (the second argument of `reduce`). As `reduce` iterates over each value in the array, `mapDouble` continues to apply the double function to each value, and the `arrayReducer` function pushes these modified values into the accumulator. This process continues until all values have been processed, resulting in the final array with all doubled values.

{3} First filters out the odd numbers, and then doubles the remaining even numbers.

💭 So… we are essentially applying multiple transformations to the same data set using the composition of multiple transducers in one `reduce` call. In other words, by composing multiple transducers, you create a pipeline of transformations that are applied in one `reduce` call. This approach allows you to efficiently process data operations like filtering, mapping and reducing without having to loop through the data multiple times.

{4}
a. **`filter(isGrocery)(reducer)`**:
   - This returns a `filteredTransducer` function that checks if the value passes the `isGrocery` predicate.
   - If the value passes (i.e., it's a grocery item), the `filteredTransducer` calls the `reducer(acc, value)`.

b. **`map(doubleAmount)(filteredTransducer)`**:
   - This returns a `mappedTransducer` function that applies `doubleAmount` to the value before passing it to the `filteredTransducer`.
   - The `mappedTransducer` will call `filteredTransducer(acc, doubleAmount(value))`.

c. **When the `reduce` function is called**:
   - Each element in the array is passed to the `mappedTransducer`.
   - The `mappedTransducer` first doubles the value by applying `doubleAmount`.
   - Then, the doubled value is passed to `filteredTransducer`.
   - The `filteredTransducer` checks if this doubled value should be passed to the final `reducer` based on the `isGrocery` predicate.

**Example Walkthrough**
Given a transaction like `{ type: 'grocery', amount: 50 }`:

a. **Mapping (`map`)**:
  - `doubleAmount({ type: 'grocery', amount: 50 })` → `{ type: 'grocery', amount: 100 }`.

b. **Filtering (`filter`)**:
  - `isGrocery({ type: 'grocery', amount: 100 })` → `true`.
  - Since the predicate is `true`, the doubled value `{ type: 'grocery', amount: 100 }` is passed to the `reducer`.

c. **Reduction (`sumReducer`)**:
  - The `sumReducer` is called with the accumulator and the doubled, filtered value:
```javascript
sumReducer(acc, { type: 'grocery', amount: 100 })
```

d. **Accumulator Update**:
  - The accumulator is updated based on this doubled value.

**In Summary**

- **First,** each value in the array is doubled by the `map(doubleAmount)` transducer.
- **Then,** the doubled value is passed through the `filter(isGrocery)` transducer.
- **Finally,** if the value passes the filter, it is passed to the `reducer` to update the accumulator.

So yes, the values passed to the `reducer` within the `filter` transducer are the already doubled values!

💭 If you're _still_ having trouble understanding how this is working, I offer you this final breakdown:

When `composedTransducer` is called, `filter(isGrocery)(reducer)` returns a function we'll call `filteredTransducer` which could be represented as:
``` javascript
const filteredTransducer = (acc, value) => {
  isGrocery(value) ? sumReducer(acc, value) : acc;
}
// The transducer is only applied if the current item has a type of `grocery`.
```

Therefore we can represent `composedTransducer` as `map(doubleAmount)(filteredTransducer)`, where the reducer argument provided to `map` is now represented by the  `filteredTransducer`.

Hence, when `map(double)(filteredTransducer)` is called, it returns the composed transducer that is applied to each value when we call `reduce` with it.

Looking at the logic from the `map` transducer, with the function `doubleAmount` passed, followed by the reducer `filteredTransducer`, we can be represented our `composedTransducer` as such:
``` javascript
const composedTransducer = (acc, value) => {
  filteredTransducer(acc, doubleAmount(value));
}
// The `accumulator`, initialized as `0` in our `reduce` call, and doubled amounts of each `value` are passed to the `filteredTransducer` where we either add the doubled value to our `accumulator` if the item has a `type` of `grocery`, otherwise the current item is skipped and the unchanged accumulator carries over to the next `reduce` call with the next item.
```

6. **Promise or monadic composition** e.g., `asyncPipe()`, Kleisli composition with `composeM()`, `composeK()`, etc.
**Monads** are a fundamental concept in functional programming. They are a way to handle side effects (like asynchronous operations, computations that may fail, or state) in a pure functional way. Promises in JavaScript are an example of a monad, used to handle asynchronous operations. **Monadic Composition** refers to the process of chaining operations that return monads, ensuring that the output of one operation can be passed as the input to the next operation. In JavaScript, this is typically done using `then()` with promises. 

**a. Here's Example of Monadic Composition with Promises:**
``` javascript
const fetchData = () => Promise.resolve({ data: 'some data' });
const processData = (data) => Promise.resolve(data.toUpperCase());

fetchData()
  .then(processData)
  .then(console.log);  // Output: 'SOME DATA'
```
Here, `fetchData` returns a `Promise`, and `processData` also returns a Promise. The `then()` method allows us to chain these operations together in a monadic way, passing the resolved value from one function to the next.

**b. `asyncPipe`**
`asyncPipe` is a utility function used to compose asynchronous functions (typically functions that return Promises) in a left-to-right order. Each function in the pipeline receives the resolved value from the previous function.

Example of `asyncPipe`:
``` javascript
const asyncPipe = (...fns) => (initialValue) =>
  fns.reduce((promise, fn) => promise.then(fn), Promise.resolve(initialValue));

// Define some functions that work with the initial value (they each return a promise)
const multiplyByTwo = (number) => Promise.resolve(number * 2);
const addTen = (number) => Promise.resolve(number + 10);
const logResult = (number) => {
  console.log(number);
  return Promise.resolve(number);
};

// Compose the functions using asyncPipe
const processNumber = asyncPipe(multiplyByTwo, addTen, logResult);

// Call the composed function with an initial value
processNumber(5);  // Output: 20
```
In each iteration of the `reduce` function, the `Promise` received from the last iteration is passed along, and the next function in the sequence is applied to its resolved value using `then`.

**c. Kleisli Composition**
Kleisli Composition is a special kind of function composition used with monads. It's named after the Kleisli category in category theory, which is a mathematical structure. `composeM` or `composeK` (where `K` stands for Kleisli) are utilities that help composed monadic functions. Instead of composing regular functions (which just take a value and return a value), Kleisli composition is for functions that return monads (like Promises).

Example of Kleisli Composition:
```javascript
const composeM = (...fns) => (value) =>
  fns.reduceRight((acc, fn) => acc.then(fn), Promise.resolve(value));

const fetchData = () => Promise.resolve({ data: 'some data' });
const processData = (data) => Promise.resolve(data.data.toUpperCase());
const logData = (data) => Promise.resolve(console.log(data));

const processAndLogData = composeM(logData, processData, fetchData);

processAndLogData();  // Output: 'SOME DATA'
```
It's pretty much the same shit as `asyncPipe`, except the functions are applied in reverse order via `reduceRight`. This reflects traditional function composition in mathematics, where the right most function is applied first. 