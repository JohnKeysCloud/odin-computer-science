/**
 * Class representing a single node in a linked list.
 * Each node holds data and a reference to the next node in the list.
 */
class Node {
  /**
   * Create a node.
   * @param {*} data - The data to store in the node. This can be of any type.
   */
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

/**
 * Class representing a singly linked list with methods to manipulate and query the list.
 */
class CycloneLinkedList {
  /**
   * Create a CycloneLinkedList.
   * @param {string} name - The name of the linked list.
   * @throws {Error} Will throw an error if the name is not provided.
   */
  constructor(name) {
    if (!name) throw new Error('Linked list must have a name.');

    this.name = name
    this.head = null;
    this.tail = null;

    this.size = 0;
  }

  /**
   * Prepend a node to the beginning of the list.
   * @param {*} data - The data of the new node to prepend.
   */
  prependNode(data) {
    const newHeadNode = new Node(data);

    if (!this.head) { // ? If the list is empty.
      this.tail = newHeadNode;
    } else {
      // ? Append rest of list to new head.
      newHeadNode.next = this.head
    }

    // ? prependNode.
    this.head = newHeadNode;

    this.size++
  }

  /**
   * Append a node to the end of the list.
   * @param {*} data - The data of the new node to append.
   */
  appendNode(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  /* 
    ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
    │   // 💭 ⬆️ `appendNode`:                                                                                            │
    │     // * Time Complexity: O(1)                                                                                      │
    │       // * We directly access the tail reference in th elinked list.                                                │
    │       // * We simply set the `next` pointer of the current tial to the new node                                     │
    │       // * and update the tail reference to this new node.                                                          │
    │     // * Space Complexity: O(1)                                                                                     │
    │       // * The method only needs to create a single new node regardless of the list size.                           │
    │       // * No additional space is used during the operation.                                                        │
    │                                                                                                                     │
    │   // 💭 `appendNodeWithoutTailReference` (ommented out below):                                                      |
    │     // * Time Complexity: O(n)                                                                                      │
    │       // * We have to start at the `head` and traverse all nodes to find the `tail`.                                 │
    │       // * The time it takes to append a new node thus depends linearly on the number of                            │
    │       // * nodes in the list, where "n" is the total number of nodes.                                               │
    │     // * Space Complexity: O(1)                                                                                     │
    │   // * Similarly to `appendNode`, we are still only creating a single node.                                         │
    └─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
   */
  // ? `appendNodeWithoutTailReference`
  // appendNodeWithouTailReference(data) {
  //   const newNode = new Node(data);

  //   if (!this.head) {
  //     // ? If the list is empty, the new node becomes both head & tail.
  //     this.head = newNode;
  //     this.tail = newNode;
  //   } else {
  //     // ? Start form the head and find the last node.
  //     // ? After the loop, `current` is the last node of the list.
  //     let current = this.head;

  //     while (current.next !== null) {
  //       current = current.next; // ? Move to the next node.
  //     }

  //     // ? appendNode.
  //     current.next = newNode;

  //     // ? Make the new node the tail of the list.
  //     this.tail = newNode;
  //   }

  //   this.size++;
  // }

  /**
   * Insert a node at the specified index in the list.
   * @param {*} data - The data of the node to insert.
   * @param {number} indexOfInsertion - The index at which to insert the node.
   * @throws {Error} Will throw an error if data or index of insertion is undefined.
   */
  insertNodeAt(data, indexOfInsertion) {
    // ? Ensure neither data nor index of insertion is undefined as both are required.
    if (data === undefined || indexOfInsertion === undefined) {
      throw new Error('You must pass in both a "data" and "indexOfInsertion" argument.');
    }

    // ? Check if the list is empty or if the insertion is at the head.
    if (!this.head || indexOfInsertion === 0) {

      // ? If there is no head AND the index of insertion isn't 0, the node can't be inserted.
      if (!this.head && indexOfInsertion !== 0) {
        console.warn(`Cannot insert at index ${indexOfInsertion}; List: ${this.name} is empty.`);
        return;
      }

      // ? Insert at the head if the list is empty or insertion index is 0.
      this.prependNode(data);

      return;
    }

    let current = this.head;
    let previous = null;
    let currentIndex = 0;
    
    // ? Traverse the list until the end of list or until the index of insertion is reached.
    while (current !== null && currentIndex < indexOfInsertion) {
      previous = current;
      current = current.next;
      currentIndex++;
    }

    // ? Insert the new node if the specified index is reached or if it's the end of the list.
    if (currentIndex === indexOfInsertion) {
      const newNode = new Node(data);

      // ? Sets the next value of the new node to be the rest of the list
      newNode.next = current;

      // ?  If we are replacing the head, there won't be a previous value, so we check for it here.
      if (previous) previous.next = newNode;
      
      // ? Update the tail if the new node is inserted at or becomes the end of the list.
      if (!newNode.next) this.tail = newNode;

      this.size++
    } else {
      console.warn(`Index ${indexOfInsertion} out of bounds for list: ${this.name}`);
    }
  }

  /**
   * Remove the node at the specified index from the list.
   * @param {number} indexOfRemoval - The index of the node to remove.
   * @throws {Error} Will throw an error if indexOfRemoval is undefined or not a non-negative number.
   */
  removeNodeAt(indexOfRemoval) {
    if (indexOfRemoval === undefined) throw new Error('You must pass in an "indexOfRemoval" argument.');
    if (typeof indexOfRemoval !== 'number' || indexOfRemoval < 0) throw new Error('The indexOfRemoval argument must be a non-negative number.');

    if (!this.head) {
      console.warn(`The following list is empty: ${this.name}`);
      return;
    }

    let current = this.head;
    let currentIndex = 0;
    let previous = null;

    while (current !== null && currentIndex < indexOfRemoval) {
      previous = current;
      current = current.next;
      currentIndex++;
    }

    // ? We have reached the end of the list.
    if (current === null) {
      console.warn(`Index ${indexOfRemoval} out of bounds for list: ${this.name}`);
      return;
    }

    /* 
      ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
      │     // ? Lets say the `currentIndex = 0` and `indexOfRemoval = 1`                                                   │
      │                                                                                                                     │
      │     // ? The loop runs one time:                                                                                    │
      │     // ? 1. previous the node before the one we wish to remove.                                                     │
      │                                                                                                                     │
      │     // ? 2. `current` becomes the node we are removing.                                                             │
      │     // ? Therefore if `!current.next`, we are removing the `tail` node and we need to set it to `previous`.         │
      │                                                                                                                     │
      │     // ? 3. currentIndex++ becomes the index of the node wwe wish to remove (currently held by `current`).          │
      │                                                                                                                     │
      │     // ? We set the `previous` nodes `next` value to be the `current` nodes `next` value; hence, effectively        │
      │     // ? removing the node at the specified index.                                                                   │
      │                                                                                                                     │
      │     // ? There will always be a previous because our loop starts from the node at the first index.                   │
      │     // ? current.next either evaluates to the node after the one we have removed or null                            │
      └─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
     */

    // ? This means `indexOfRemoval` is 0
    if (previous === null) {
      // ? `current` holds the head value
      this.head = current.next;
    } else {
      previous.next = current.next;
    }
    
    // ? If the removed node (`current`) was the tail, we set the previous node as the `tail`
    if (!current.next) {
      this.tail = previous;
    }

    this.size--;
  }

  /**
   * Removes the first node in the list that contains the specified data.
   * @param {*} data - The data of the node to be removed.
   */
  removeNodeByData(data) {
    if (!this.head) {
      console.warn(`The following list is empty: ${this.name}`);
      return;
    }

    // ? If the head contains the data for the node we are looking to delete.
    if (this.head.data === data) {
      // ? Set the `head` of the list to the currents `next` value.
      this.head = this.head.next;

      // ? If the value of the new `head` points to null, set the new `head` as the lists `tail`.
      if (!this.head) {
        this.tail = null; // ? Set tail to null if list becomes empty.
      } else if (!this.head.next) {
        this.tail = this.head; // ? If there is only one node left, it's both `head` and `tail` of the list.
      }

      this.size--;

      return;
    }

    let previous = this.head;
    let current = this.head.next;

    // ? If the value of `current` isn't `null` AND the value of `current` doens't contain the data our node to delete holds… run loop.
    while (current !== null && current.data !== data) {
      // ? Store previous to bridge gap after node deletion.
      previous = current;
      // ? Check the next node.
      current = current.next;
    }

    if (!current) {
      console.warn(`The node with data: "${data}" does not exist in list named: ${this.name}`);
      return;
    } else if (current.data === data) {
      // ? Delete the node while bridging the gap between its previous and next nodes.
      previous.next = current.next;

      // ? If deleting the last node, update the tail.
      if (!current.next) this.tail = previous; // ? Set tail to the previous node, which now becomes the last node.

      this.size--;
    }
  }

  /**
   * Get a node at a specific index.
   * @param {number} index - The index of the node to retrieve.
   * @returns {Node|null} The node at the specified index, or null if the index is out of bounds.
   */
  getNodeAtIndex(index) {
    if (!this.head) {
      console.warn(`The following list is empty: ${this.name}`);
      return;
    }

    let current = this.head;

    for (let i = 0; i < index; i++) {
      if (!current.next) {
        console.warn(`A node at index: ${index} deos not exis in the list named: ${this.name}`);
        return null;
      }

      current = current.next;
    }

    return current;
  }

  /**
   * Returns the index of the first node containing the specified data, or null if the node does not exist.
   * @param {*} data - The data to search for in the list.
   * @returns {number|null} The index of the node, or null if not found.
   */
  getNodeIndex(data) {
    // * Returns the index of the node containing the data or null otherwise;

    if (!this.head) {
      console.warn('The list is empty.');
      return false;
    }

    let current = this.head;
    let index = 0;

    while (current !== null) {
      if (current.data === data) {
        return index;
      }
      current = current.next;
      index++;
    }

    console.warn(`Node does not exist for data: ${data}`);

    return null;
  }

  /**
   * Returns the current number of nodes in the list.
   * @returns {number} The size of the list.
   */
  getSize() {
    return this.size;
  }

  /**
   * Returns the head node of the list.
   * @returns {Node|null} The head node of the list.
   */
  getHead() {
    return this.head;
  }

  /**
   * Returns the tail node of the list.
   * @returns {Node|null} The tail node of the list.
   */
  getTail() {
    return this.tail;
  }

  /**
   * Check if the list contains a node with the specified data.
   * @param {*} data - The data to check within the list.
   * @returns {boolean} True if the data is found in the list, otherwise false.
   */
  containsNode(data) {
    // * Returns true if the passed in data is in the list… returns returns false otherwise.

    if (!this.head) {
      console.warn('The list is empty.');
      return false;
    }

    let current = this.head;

    while (current !== null) {
      if (current.data === data) return true;
      current = current.next;
    }

    return false;
  }

  /**
   * Remove and return the last element from the list.
   * @returns {Node|null} The last node of the list, or null if the list is empty.
   */
  pop() {
    // * Removes and returns the last element from the list.

    if (!this.head) {
      console.warn('The list is empty.');
      return null;
    }

    // ? Handle single element list.
    if (this.head.next === null) {
      let removedNode = this.head;
      this.head = null;
      this.tail = null;

      // ? Decrease list size reference.
      this.size--

      return removedNode;
    }

    let current = this.head;
    let previous = null;

    // ? Traverse the list until reaching the last node.
    while (current.next !== null) {
      previous = current;
      current = current.next;
    }

    // ? Remove the last node
    previous.next = null;

    // ? Set the tail of the list to the new last node.
    this.tail = previous;

    // ? Decrease list size reference.
    this.size--

    // ? At the end of our loop, `current` stores the removed node.
    return current;
  }

  /**
   * Convert the list to a string representation.
   * @returns {string} A string representation of the list.
   */
  toString() {
    // * Format: ( value ) -> ( value ) -> ( value ) -> null

    if (!this.head) {
      console.warn(`The following list is empty: ${this.name}`);
      return 'null';
    }

    let current = this.head;
    // ? If the list only has a `head` node, return list string with null pointer.
    if (!current.next) return `(${current.data}) -> null`;

    let listStringArray = [];

    // ? Traverse list until tail node is reached.
    while (current !== null) {

      // ? Push current (non-null) node string to list.
      listStringArray.push(`(${current.data})`);

      // ? Only add an arrow if the next node isn't `null`.
      if (current.next) listStringArray.push('->');

      current = current.next;
    }

    // ? Append final `null` value
    listStringArray.push('-> null');

    // ? Combine all string components from the array separated by space.
    return listStringArray.join(' ');
  }
}