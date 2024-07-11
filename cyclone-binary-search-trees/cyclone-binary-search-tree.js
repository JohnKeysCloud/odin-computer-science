class Tree {
  constructor(root = null) {
    this.root = root;
  }

  // 💭 --------------------------------------------------------------
  // 💭 Static Private

  static #_sortedArrayToBSTInternal(sortedArray, start, end) {
    if (start > end) return null;

    const middleIndex = Math.floor((start + end) / 2);
    const middleValue = sortedArray[middleIndex];
    const node = {
      value: middleValue,
      left: null,
      right: null
    };

    node.left = this.#_sortedArrayToBSTInternal(sortedArray, start, middleIndex - 1);
    node.right = this.#_sortedArrayToBSTInternal(sortedArray, middleIndex + 1, end);

    return node;
  }

  static #_removeArrayDuplicatesShortForm(array) {
    return [...new Set(array)]; // or Array.from(new Set(array))
  }

  static #_removeArrayDuplicatesLongForm(array) {
    /*
      ┌─────────────────────────────────────────────────────────────────────────────┐
      │     // ? The long form method above is included for educational             │
      │     // ? purposes to demonstrate what happens under the hood of the         │
      │     // ? short form method. They both have time and space complexities      │
      │     // ? of O(n)… equally efficient.                                         │
      └─────────────────────────────────────────────────────────────────────────────┘
     */

    // Doesn't allow the addition of duplicate values
    const seen = new Set();
    // Stores our array, sin duplicates.
    const result = [];

    for (const value of array) {
      if (seen.has(value)) continue;
      seen.add(value);
      result.push(value);
    }

    return result;
  }

  static #createWithRootInternal(rootValue) {
    const rootNode = {
      value: rootValue,
      left: null,
      right: null
    }

    return new Tree(rootNode);
  }

  static #createFromSortedArrayInternal(sortedArray) {
    // Remove duplicates from the sorted array
    const sortedArraySinDuplicates = this.#_removeArrayDuplicatesShortForm(sortedArray);
    // Convert the sorted array without duplicates to a BST
    const rootNode = this.#_sortedArrayToBSTInternal(sortedArraySinDuplicates, 0, sortedArraySinDuplicates.length - 1);

    return new Tree(rootNode);
  }

  static #createFromUnsortedArrayInternal(unsortedArray) {
    // Sort the array
    const sortedArray = unsortedArray.sort((a, b) => a - b);
    // Remove duplicates from the sorted array
    const sortedArraySinDuplicates = this.#_removeArrayDuplicatesShortForm(sortedArray);
    // Convert the sorted array without duplicates to a BST
    const rootNode = this.#_sortedArrayToBSTInternal(sortedArraySinDuplicates, 0, sortedArraySinDuplicates.length - 1);

    return new Tree(rootNode);
  }

  // 💭 --------------------------------------------------------------
  // 💭 Public Static

  static createWithRoot(rootValue = null) {
    return this.#createWithRootInternal(rootValue);
  }

  static createFromSortedArray(sortedArray) {
    return this.#createFromSortedArrayInternal(sortedArray);
  }

  static createFromUnsortedArray(unsortedArray) {
    return this.#createFromUnsortedArrayInternal(unsortedArray);
  }

  // 💭 --------------------------------------------------------------
  // 💭 Private

  #createNodeInternal(value = null) {
    const node = {
      value: value,
      left: null,
      right: null
    }

    return node;
  }

  #insertInternal(node, value) {
    // Base Case (leaf node reached)
    if (node === null) {
      return this.#createNodeInternal(value);
    }
    
    // Store the nodes value
    let nodeValue = node.value;

    // No duplicates allowed
    if (value === nodeValue) return node;

    if (value < nodeValue) {
      // If the value for our new node is less than the current node, recursively traverese the left side of the tree
      node.left = this.#insertInternal(node.left, value);
    } else if (value > nodeValue) {
      // If the value for our new node is greater than the current node, recursively traverese the right side of the tree
      node.right = this.#insertInternal(node.right, value);
    }

    // Return the correct node throughout the recursive unwinding to previous calls
    return node;
  }

  #_getMinValuePrivate(currentNode) {
    let minValue = currentNode.value;

    while (currentNode.left !== null) {
      minValue = currentNode.left.value;
      currentNode = currentNode.left;
    }

    return minValue;
  }
  #deleteNodeInternal(node, value) {
    // Base case
    if (node === null) {
      return node; // This return effectively does nothing to the parent node's child reference
    }

    if (value < node.value) {
      // If the value to be deleted is less than the current nodes value, then it lies in the left subtree
      node.left = this.#deleteNodeInternal(node.left, value);
    } else if (value > node.value) {
      // If the value to be deleted is greater than the current nodes value, then it lies in the right subtree
      node.right = this.#deleteNodeInternal(node.right, value);
    } else { // value === node.value
      // Node to be deleted is found

      // Node with only one child or no child
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      // Node with the two children: get the inorder successor (smallest in the right subtree)
      node.value = this.#_getMinValuePrivate(node.right);

      // Delete the inorder successor
      node.right = this.#deleteNodeInternal(node.right, node.value);
    }

    return node; // Return the (potentially modified) current node back to the parent call
  }

  #preOrderInternal(node, callback) {
    if (node === null) return;

    callback(node.value);
    this.#preOrderInternal(node.left, callback);
    this.#preOrderInternal(node.right, callback);
  }

  #inOrderInternal(node, callback) {
    if (node === null) return;

    this.#inOrderInternal(node.left, callback);
    callback(node.value);
    this.#inOrderInternal(node.right, callback);
  }

  #postOrderInternal(node, callback) {
    if (node === null) return;

    this.#postOrderInternal(node.left, callback);
    this.#postOrderInternal(node.right, callback);
    callback(node.value);
  }

  #levelOrderInternal(root, callback) {
    // Time: O(n)
    // Space: BEST - O(1) in skewed BST (queue only holds one node at a time) | WORST/AVG - O(n)
    if (root === null) return null;

    let queue = [root];
    let values = [];

    while (queue.length) {
      const currentNode = queue.shift();

      if (!callback) {
        values.push(currentNode.value);
      } else {
        callback(currentNode.value);
      }

      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }

    return callback ? null : values;
  }

  #levelOrderRecursiveInternal(root, callback) {
    // Helper fucntion to print nodes at the given value.
    const processLevel = (node, level, callback) => {
      if (node === null) return;
      
      if (level === 1) {
        callback(node.value);
      } else if (level > 1) {
        processLevel(node.left, level - 1, callback);
        processLevel(node.right, level - 1, callback);
      }
    };

    // Calculate the height of the tree.
    const treeHeight = this.#heightInternal(root);

    // Traverse each level from 1 to the tree height.
    for (let currentLevel = 1; currentLevel <= treeHeight; currentLevel++) {
      processLevel(root, currentLevel, callback);
    }
  }

  #findInternal(node, value) {
    // timeComplexity: 
    // BEST (balanced tree): O(log n)
    // WORST (skewed tree): O(n)
    if (node === null) return null;

    if (value === node.value) {
      return node;
    } else if (value < node.value) {
      return this.#findInternal(node.left, value)
    } else if (value > node.value) {
      return this.#findInternal(node.right, value);
    }

    return node;
  }

  #depthInternal(currentNode, targetNode) {
    // TargetNode not found
    if (currentNode === null) return -1;

    // TargetNode found
    if (currentNode === targetNode) return 0;

    let leftDepth = this.#depthInternal(currentNode.left, targetNode); 
    let rightDepth = this.#depthInternal(currentNode.right, targetNode); 

    // Handle -1 return values
    if (leftDepth === -1 && rightDepth === -1) return -1; // Not found in either subtree
    if (leftDepth === -1) return rightDepth + 1; // Not found in left subtree
    if (rightDepth === -1) return leftDepth + 1; // Not fouund in right subtree

    return Math.max(leftDepth, rightDepth) + 1;
  }

  #heightInternal(currentNode) {
    if (currentNode === null) return 0;
    
    let leftHeight = this.#heightInternal(currentNode.left);
    let rightHeight = this.#heightInternal(currentNode.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  #_sortedArrayToBST(sortedArray, start, end) {
    if (start > end) return null;

    const middleIndex = Math.floor((start + end) / 2);
    const value = sortedArray[middleIndex];
    const node = {
      value: value,
      left: null,
      right: null
    };

    node.left = this.#_sortedArrayToBST(sortedArray, start, middleIndex - 1);
    node.right = this.#_sortedArrayToBST(sortedArray, middleIndex + 1, end);

    return node;
  };
  #rebalanceInternal(root) {
    if (this.#isBalancedInternal(root)) return;

    let sortedArray = [];
    this.#inOrderInternal(root, value => sortedArray.push(value));

    this.root = this.#_sortedArrayToBST(sortedArray, 0, sortedArray.length - 1);
  }

  #_checkBalancePrivate(node) {    
    // Base Case: An empty node is balanced and has a height of 0.
    if (node === null) return { height: 0, balanced: true };

    // Recursively check the balance and height of the left subtree.
    const left = this.#_checkBalancePrivate(node.left);

    // Early exit if the left subtree is unbalanced.
    if (!left.balanced) return { height: null, balanced: false };

    // Recursively check the balance and height of the right subtree.
    const right = this.#_checkBalancePrivate(node.right);

    // Early exit if the right subtree is unbalanced. 
    if (!right.balanced) return { height: null, balanced: false };

    // Calculate the height of the current node.
    const height = Math.max(left.height, right.height) + 1;

    // Determine if the current node is balanced.
    // A node is balanced if both its left and right subtrees are balanced and
    // the difference in their heights is not more than 1.
    const balanced = Math.abs(left.height - right.height) <= 1;

    // Return an object containing the height and balance status of the current node.
    return { height, balanced };
  }
  #isBalancedInternal(root) {
    return this.#_checkBalancePrivate(root).balanced;
  }

  #prettyPrintInternal(currentNode, prefix = "", isLeft = true) {
    // Base case: if the node is null, do nothing
    if (currentNode === null) {
      return; 
    }

    // If the right child exists, print the right subtree
    if (currentNode.right !== null) {
      this.#prettyPrintInternal(currentNode.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }

    // Print the current node with appropriate prefix
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${currentNode.value}`);

    // If the left child exists, print the left subtree
    if (currentNode.left !== null) {
      this.#prettyPrintInternal(currentNode.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  // 💭 --------------------------------------------------------------
  // 💭 Public

  createNode(value) {
    return this.#createNodeInternal(value);
  }

  insert(value) {
    this.root = this.#insertInternal(this.root, value);
  }

  deleteNode(value) {
    this.#deleteNodeInternal(this.root, value);
  }

  preOrder(callback) {
    this.#preOrderInternal(this.root, callback);
  }

  inOrder(callback) {
    this.#inOrderInternal(this.root, callback);
  }

  postOrder(callback) {
    this.#postOrderInternal(this.root, callback);
  }

  levelOrder(callback) {
    this.#levelOrderInternal(this.root, callback);
  }

  levelOrderRecursive(callback) {
    this.#levelOrderRecursiveInternal(this.root, callback);
  }

  find(value) {
    return this.#findInternal(this.root, value);
  }
  
  depth(node) {
    return this.#depthInternal(this.root, node);
  }

  rebalance() {
    this.#rebalanceInternal(this.root);
  }

  isBalanced() {
    return this.#isBalancedInternal(this.root);
  }

  height() {
    return this.#heightInternal(this.root);
  }

  prettyPrint() {
    this.#prettyPrintInternal(this.root);
  }

  getRootValue() {
    return this.root.value;
  }
}

// 💭 --------------------------------------------------------------
// 💭 Driver Script

function testBSTDriver(size, includeTraversalLogs) {
  const createArrayWithRandomNumbers = (size) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * size));
  }
  const logger = value => console.log(value);

  /*
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ 1. Create a binary search tree from an array of random numbers < 100.   │
  │ You can create a function that returns an array of random numbers       │
  │ every time you call it if you wish.                                     │
  └─────────────────────────────────────────────────────────────────────────┘
 */
  const randomArray = createArrayWithRandomNumbers(size);
  const testTree = Tree.createFromUnsortedArray(randomArray);

  /* 
    ┌─────────────────────────────────────────────────────────────────────────┐
    │ 2. Confirm that the tree is balanced by calling isBalanced.              │
    └─────────────────────────────────────────────────────────────────────────┘
   */
  console.log(testTree.isBalanced()); // True

  /*
    ┌─────────────────────────────────────────────────────────────────────────┐
    │ 3. Print out all elements in level, pre, post, and in order.            │
    └─────────────────────────────────────────────────────────────────────────┘
   */
  if (includeTraversalLogs) {
    testTree.preOrder(logger);
    testTree.inOrder(logger);
    testTree.postOrder(logger);
    testTree.levelOrder(logger);
    testTree.levelOrderRecursive(logger);
  }

  /* 
    ┌─────────────────────────────────────────────────────────────────────────┐
    │ 4. Unbalance the tree by adding several numbers > 100.                  │
    └─────────────────────────────────────────────────────────────────────────┘
   */
  // Add Several Numbers greater than 100 to skew the tree
  for (let i = size; i <= size + 33; i++) {
    testTree.insert(i);
  }

  /* 
    ┌─────────────────────────────────────────────────────────────────────────┐
    │ 5. Confirm that the tree is unbalanced by calling isBalanced.            │
    └─────────────────────────────────────────────────────────────────────────┘
   */
  console.log(testTree.isBalanced()); // False

  /* 
    ┌─────────────────────────────────────────────────────────────────────────┐
    │ 6. Balance the tree by calling rebalance.                               │
    └─────────────────────────────────────────────────────────────────────────┘
   */
  testTree.rebalance();

  /* 
    ┌─────────────────────────────────────────────────────────────────────────┐
    │ 7. Confirm that the tree is balanced by calling isBalanced.             │
    └─────────────────────────────────────────────────────────────────────────┘
   */
  console.log(testTree.isBalanced()); // True

  /*
    ┌─────────────────────────────────────────────────────────────────────────┐
    │ 8. Print out all elements in level, pre, post, and in order.            │
    └─────────────────────────────────────────────────────────────────────────┘
   */
  if (includeTraversalLogs) {
    testTree.preOrder(logger);
    testTree.inOrder(logger);
    testTree.postOrder(logger);
    testTree.levelOrder(logger);
    testTree.levelOrderRecursive(logger);
  }
}

testBSTDriver(100, false);

const treeTwo = new Tree();
treeTwo.insert(33);

treeTwo.prettyPrint();

// 💭 --------------------------------------------------------------
// ? When we are attacked with ill intentions or harmful actions… these moments become critical turning points. Such opposition compels us to delve into our spiritual depth… tapping into our inner strength and divine wisdom. Instead of being crushed by the pressure, we gain an increased awareness of our spiritual abilities and potential. 
// 💭 --------------------------------------------------------------
// ? Every action triggers a corresponding reaction, divine retribution, echoes the natural principle of cause and effect. This doctrine states that whether actions are good or evil, they will eventually circle back to their originator. When foes target us with negative intentions or hostility, they inadvertently set off a series of events that eventually cause their own misfortune… racking up a karmic debt that requires settlement.
// 💭 --------------------------------------------------------------