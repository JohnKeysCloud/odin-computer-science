// ? Write a function printList(list) that outputs list items one-by-one

let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null,
      },
    },
  },
};

function printListIterative(list) {
  let current = list;

  while (current !== null) {
    console.log(current.value);
    current = current.next;
  }
}
// ! printListIterative(list);

function printListIterativeTwo(list) {
  let current = list;

  for (let current = list; current !== null; current = current.next) {
    console.log(current.value);
  }
}
// ! printListIterativeTwo(list);

function printListRecursive(list) {
  if (list.next === null) return console.log(list.value);
  console.log(list.value);
  printListRecursive(list.next);
}
// ! printListRecursive(list);

function printListRecursiveTwo(list) {
  console.log(list.value);

  if (list.next) {
    printListRecursiveTwo(list.next);
  }
}
// ! printListRecursiveTwo(list);

// > --------------------------------------------------------------

// ? Output a single linked-list in the reverse order
let listTwo = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null,
      },
    },
  },
};

function printReversedListIterative(list) {
  let arr = [];
  let temp = list;

  while (temp) {
    arr.push(temp.value);
    temp = temp.next;
  }

  console.log(arr); // [1, 2, 3, 4]

  for (let i = arr.length - 1; i >= 0; i--) {
    console.log(arr[i]);
  }
}
// printReversedListIterative(listTwo);

function printReversedListRecursive(list) {
  console.log(list);

  if (list.next) {
    printReversedListRecursive(list.next);
  }
  // pauses until recursion is finished

  console.log(list.value);
}
printReversedListRecursive(list);
