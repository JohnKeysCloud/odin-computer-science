// ? "async" before a function means the
// ? function will always return a promise.
async function f() {
  return 1;
}

f().then(console.log); // 1

// 💭 --------------------------------------------------------------

// ? await
async function f2() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('done!'), 1000 * 3);
  });

  let result = await promise;

  console.log(result);
}

f2();

// 💭 --------------------------------------------------------------

// ? await accepts thenables
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    console.log(resolve);
    //  resolve with this.num*2 after 1000ms
    setTimeout(() => resolve(this.num * 2), 1000); // * (*)
  }
}

async function f() {
  // waits for 1 second, then result becomes 2
  let result = await new Thenable(1);
  console.log(result);
}

f();

// * If `await` gets a non-promise object with .then(),
// * it calls that method providing the built-in functions
// * `resolve` and `reject` as arguments (just as it does for
// * a regular Promise executor). Then await waits until
// * one of them is called (in the example above it happens
// * in the line (*)) and then proceeds with the result.

// 💭 --------------------------------------------------------------

// ? ASYNC conversion

// ! before
function loadJson(url) {
  return fetch(url).then(response => {
    if (response.status == 200) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
  });
}

loadJson('https://javascript.info/no-such-user.json')
  .catch(alert); // Error: 404

// ! after
async function loadJson(url) {
  let response = await fetch(url);

  if (response.status === 200) {
    let json = await response.json();
    return json;

    // or return response.json(); instead of awaiting it
  }

  throw new Error(response.status);
}

loadJson('https://javascript.info/no-such-user.json')
  .catch(alert); // Error: 404

// 💭 --------------------------------------------------------------

class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

async function loadJson(url) {
  let response = await fetch(url);

  if (response.status === 200) {
    return response.json();
  }

  throw new HttpError(response);
}

async function demoGitHubUser() {
  let user;

  while (true) {
    let name = prompt('Enter a name:', 'cloud');

    try {
      user = await loadJson(`https://api.github.com/users/${name}`);
      break; // no error, exit loop
    } catch(error) {
      if (error instanceof HttpError & error.response.status === 404) {
        alert('No such user, plesae reenter.');
      } else {
        throw error
      }
    }
  }

  alert(`Full Name: ${user.name}`);
  return user;
}

demoGitHubUser();

// 💭 --------------------------------------------------------------

function doubleAfter2Seconds(x) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('step');
      resolve(x * 2);
    }, 2000);
  });
}

// ? without async-await
function addPromise(x) {
  return new Promise((resolve) => {
    doubleAfter2Seconds(10).then((a) => { // ? a === 20  after 2 seconds
      doubleAfter2Seconds(20).then((b) => { // ? b === 40 after 2 seconds
        doubleAfter2Seconds(30).then((c) => { // ? c === 60 after 2 seconds
          resolve(x + a + b + c);
          // ? x + 20 + 40 + 60 = x + 120 immediately after the preceding return
          // ? note: final resolve has access to preceding then values.
        });
      });
    });
  });
}

addPromise(10).then(a => console.log(a)); // 130

// ? conversion to async-await
async function addAsync(x) {

  let one = await doubleAfter2Seconds(10);
  let two = await doubleAfter2Seconds(20);
  let three = await doubleAfter2Seconds(30);

  let sum = [x, one, two, three].reduce((accumulator, current) => accumulator + current);
  // ?accumulator is the value resulting from the previous call.
  // ?on the first call, its value is the 'initial value'
  // ?(the optional second paramerter of reduce)
  // ?otherwise, the initial value is array[0]

  // ?on the first call, 'current' is array[1] if 'initial
  // ?value' isn't specified. If there was an initial value,
  // ?current is array[0]

  // ? obviously could have just done: let sum = x + one + two + three
  // ? but I didn't feel like it so suck my dick from the back mf.

  return sum;
}

addAsync(10).then(result => console.log(result));

// 💭 --------------------------------------------------------------

function sleep(amount) {
  return new Promise((resolve, reject) => {
    if (amount <= 300) {
      return reject("Mf you ain't sleep. That was a blink!");
    }
    setTimeout(() => resolve(amount), amount);
  });
}

let counter = 0;

sleep(500)
  .then(result => {
    console.log(`${++counter}. You slept for ${result / 1000} seconds mf total.`);
    return sleep(result + 1000);
  })
  .then(result => {
    console.log(`${++counter}. You slept for ${result / 1000} seconds mf total.`);
    return sleep(result + 1000);
  })
  .then(result => {
    console.log(`${++counter}. You slept for ${result / 1000} seconds mf total.`);
    return sleep(result + 3500);
  })
  .then(result => {
    console.log(`${++counter}. You slept for ${result / 1000} seconds mf total.`);
  })
  .catch(error => console.log(error));

async function sleepAsync(initial) {
  let periodOne = await sleep(initial);
  console.log(
    `${++counter}. You slept for ${periodOne / 1000} seconds mf total.`
  );

  let periodTwo = await sleep(periodOne + 3000);
  console.log(
    `${++counter}. You slept for ${periodTwo / 1000} seconds mf total.`
  );

  let periodThree = await sleep(periodTwo + 5500);
  console.log(
    `${++counter}. You slept for ${periodThree / 1000} seconds mf total.`
  );

  return periodThree;
}

sleepAsync(500).then((result) =>
  console.log(`total time sleeping = ${result / 1000} seconds`)
);

// 💭 --------------------------------------------------------------
// ? wrapper for safe async function calling

// ? HoF: high order function
// ?
function handleError(fn) {
  return function (...params) {
    return fn(...params).catch(function (error) {
      console.error(`Error: ${error}`);
    });
  };
}

const handleError =
  (fn) =>
  (...params) =>
    fn(...params).catch(console.error);

// for use with async functions to catch errors

async function example(url) {
  // do something that errors out;
  const test = await fetch(`https://${url}.com`);
}

const safeExample = handleError(example);

safeExample(); // does the same as `example`

// 💭 --------------------------------------------------------------

// ? How do you declare an async function?
// * You put async before the declaration dickhead.

// ? What does the async keyword do?
// * It tells the JavaScript engine that you are declaring an asychronous function
// * It enables 'await' usage. Which is essentially a 'then' replacement.
// * It always returns a promise.
// * Can be used any of the ways a function can be created (arrow, expression, declaration)
// * Syntactic sugar for promises:
// * function promise(value) {
// *  return new Promise((resolve, reject) => {})
// * }

// ? What does the await keyword do?
// * It tells the JavaScript engine that we are taking asynchronous action
// * A 'pause until done' keyword.
// * replaces .then()

// ? What is returned from an async function?
// * A promise!

// ? What happens when an error is thrown inside an async function?
// * It results in the async function being rejected
// * since async functions always return a promise.

// ? How can you handle errors inside an async function?
// * Could use the .catch() method or the 'try…catch' block
// * if you're calling the function within another async function using the 'await' keyword.

// 💭 --------------------------------------------------------------

// ? try catch vs catch when calling async func
async function myAsyncFunction() {
  throw new Error('This is an error');
}

// ? Using .catch() method to handle the error
myAsyncFunction().catch((error) => {
  console.log(error.message); // ? Output: This is an error
});

// ? Using try...catch with await in another async function
async function anotherAsyncFunction() {
  try {
    await myAsyncFunction();
  } catch (error) {
    console.log(error.message); // ? Output: This is an error
  }
}

// 💭 --------------------------------------------------------------
