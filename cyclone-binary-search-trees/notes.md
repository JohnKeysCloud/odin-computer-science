# Binary Search Trees

- A binary search tree is a binary tree in which all the nodes follow the below-mentioned properties:
  - The left sub-tree of a node has a key less than or equal to its parent node's key.
  - The right sub-tree of a node has a key greater than to its parent node's key.

## What are Balanced B.S.T.'s

- A BST is balanced if:
  - The height of the left subtree and right subtree of the root differ by at most 1.
  - The left subtree is balanced
  - The right subtree is balanced.

### Balanced BST Visualized

Example:
**Input**: [1, 2, 3]
**Output**:
2
/ \
 1 3

**Input**: [1, 2, 3, 4, 5, 6, 7]
**Output**:
4
/ \
 2 6
/ \ / \
 1 3 5 7

### Explanation

- The middle element of the array is chosen as the root node.
- The middle element of the left sub-array is chosen as the left child of the root.
- The middle element of the right sub-array is chosen as the right child of the root.
- The above steps are recursively repeated for the left and right sub-arrays.

All elements less then the root node will be in the left subtree and all elements greater than the root node are in the right subtree.

To reiterate, the idea is to find the middle element of the array and make it the root of the tree. Then perform the same operation (recursively) on the left sub-array for the root's left child and the same operation on the right sub-array for the root's right child. There is also an iterative solution that makes use of a `queue` (remember, FIFO).

## BST Implementations, Key Points & Breakdowns

```javascript
// 💭 --------------------------------------------------------------

// Create node class for implementation use
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// 💭 --------------------------------------------------------------

// 💭 PRO-TIP: When conceptualizing recursion, think about the function in as gestalt-like mannter rather than writing the code with pure logical intricacy.

// **APPROACH #1** - _recursion (with start and end parameters)_
// **Time Complexity**: O(n) because each element is processed exactly once.
// **Space Complexity**: O(log ⁡n) for the recursive call stack in a balanced tree.
function sortedArrayToBST(array, start, end) {
  if (start > end) return null;

  const middleIndex = (start + end) / 2;
  const nodeData = array[middleIndex];
  const node = new Node(nodeData);

  node.left = sortedArrayToBST(array, start, middleIndex - 1);
  node.right = sortedArrayToBST(array, middleIndex + 1, end);

  return node;
}

// 💭 --------------------------------------------------------------

// **APPROACH #2** - _recursion (without start and end parameters)_
// **Time Complexity**: O(n log n) because slicing the array creates new arrays, which takes O(n) time for each call, and there are O(log n) levels of recursion.
// **Space Complexity**: O(n) due to the space required to store the sliced arrays and the call stack.
function sortedArrayToBST(array) {
  if (array.length <= 0) return null;
  if (array.length === 1) return new Node(array[0]);

  const middleIndex = Math.floor(array.length / 2);
  const nodeData = array[middleIndex];
  const node = new Node(nodeData);

  let leftSubTree = array.slice(0, middleIndex);
  node.left = sortedArrayToBST(leftSubTree);

  let rightSubTree = array.slice(middleIndex + 1, array.length);
  node.right = sortedArrayToBST(rightSubTree);

  return node;
}

// 💭 --------------------------------------------------------------

// **APPROACH #3** - _iterative (with queue)_
// **Time Complexity**: O(n) because each element is processed exactly once.
// **Space Complexity**: O(⁡n) due to the space required for the queue.
function sortedArrayToBST(array) {
  if (!array.length) return null;

  const middleIndex = Math.floor(array.length / 2);
  const rootNodeData = array[middleIndex];
  const root = new Node(rootNodeData);

  let queue = [
    [root, [0, middleIndex - 1]],
    [root, [middleIndex + 1, array.length - 1]],
  ];

  while (queue.length) {
    const [parent, [start, end]] = queue.shift();

    if (start <= end) {
      const subMiddleIndex = Math.floor((start + end) / 2);
      const childNodeData = array[subMiddleIndex];
      const childNode = new Node(childNodeData);

      if (childNodeData < parent.data) {
        parent.left = childNode;
      } else {
        parent.right = childNode;
      }

      queue.push([childNode, [start, subMiddleIndex - 1]]);
      queue.push([childNode, [subMiddleIndex + 1, end]]);
    }
  }

  return root;
}
// 💭 --------------------------------------------------------------
```

### Implementation Key Points To Consider

1. **Time Complexity**:

   - **Approach #1 (Recursive with Start and End Parameters)**: O(n)
   - **Approach #2 (Recursive with Slicing)**: O(n log n)
   - **Approach #3 (Iterative with Queue)**: O(n)

2. **Space Complexity**:

   - **Approach #1 (Recursive with Start and End Parameters)**: O(log n) due to the call stack in a balanced tree.
   - **Approach #2 (Recursive with Slicing)**: O(n) due to additional space required for sliced arrays and the call stack.
   - **Approach #3 (Iterative with Queue)**: O(n) due to the space required for the queue.

3. **Stack Overflow Concerns**:
   - **Approach #1 (Recursive with Start and End Parameters)**:
     - Risk of stack overflow for very large arrays due to deep recursion.
   - **Approach #2 (Recursive with Slicing)**:
     - Higher risk of stack overflow due to deeper recursion and additional memory usage from array slicing.
   - **Approach #3 (Iterative with Queue)**:
     - No risk of stack overflow since it uses an explicit queue instead of recursion.

#### Pros & Cons of Given Implementations

**Approach #1: Recursive with Start and End Parameters**

- **Pros**:
  - Simplicity: Easier to understand and implement.
  - Space Efficiency: Uses O(log n) space, which is less than O(n) for large balanced trees.
- **Cons**:
  - Stack Overflow Risk: Potential for stack overflow with very large arrays.

**Approach #2: Recursive with Subtree Array Slicing**

- **Pros**:
  - Simplicity: Easy to implement for small arrays.
- **Cons**:
  - Inefficiency: O(n log n) time complexity due to array slicing.
  - Higher Space Usage: O(n) space due to array slicing and recursion.
  - Stack Overflow Risk: Higher risk due to deeper recursion and additional memory usage.

**Approach #3: Iterative with Queue**

- **Pros**:
  - No Stack Overflow: Avoids stack overflow by using an explicit queue.
- **Cons**:
  - Space Usage: Uses O(n) space for the queue, which is more than O(log n) for the recursive approach in balanced trees.
  - Slightly More Complex: Implementation can be slightly more complex compared to the recursive approach.

#### Practical Considerations

- **Environment Constraints**:

  - **Stack Size**: If stack size is a limitation, Approach #3 is preferable.
  - **Memory Availability**: If _memory is not a constraint_, Approach #3 is more robust for large arrays.

- **Input Size**:

  - **Small Arrays**: For smaller arrays, the difference in space complexity might be negligible, making Approach #1 or Approach #2 more straightforward.

- **Efficiency**:
  - **Time Complexity**: Approach #1 and Approach #3 are more efficient in terms of time complexity compared to Approach #2.
  - **Space Complexity**: Approach #1 is the most space-efficient for balanced trees.

#### Conclusion

- **Approach #1 (Recursive with Start and End Parameters)**: Most efficient in terms of both time and space complexity for balanced trees, but has a potential stack overflow risk.
- **Approach #2 (Recursive with Slicing)**: Generally less efficient due to higher time and space complexity, and higher risk of stack overflow.
- **Approach #3 (Iterative with Queue)**: Robust against stack overflow and has linear time complexity, but uses more space compared to Approach #1.

The choice depends on the specific constraints and requirements of your application and environment. For large arrays and environments with stack size limitations, Approach #3 is more robust. For smaller arrays or when stack overflow is not a concern, Approach #1 is more space-efficient and simpler. Approach #2 should generally be avoided due to its inefficiency.

#### BONUS: Approach #1 - Under The Hood Breakdown

**SA2BST** is the abbrieviation for a sortedArrayToBST() call.

**Test Array**: [1, 2, 3, 4, 5, 6, 7]

**SA2BST = sortedArrayToBST call**
If node.left recursive call, start = 0, end = middleIndex - 1
If node.right recursive call, start = middleIndex + 1, end = array.length - 1

1-SA2BST _initial call_
start = 0 // given
end = 6 // array.length - 1
middleIndex = 3
middleValue/node.data = 4

2-SA2BST _node.left recursive call by initial_
start = 0
end = (3 - 1) = 2
middleIndex = 1
middleValue/node.data = 2

    3-SA2BST _node.left original recursive call by 2-SA2BST_
    start = 0
    end = (1 - 1) = 0
    middleIndex = 0
    middleValue/node.data = 1

      4-SA2BST _node.left recursive call by 3-SA2BST_
      start = 0
      end = (0 - 1) = -1
      node.left = null // {1}.left = null

      5-SA2BST _node.right recursive call by 3-SA2BST_
      start = (0 + 1) = 1
      end = 0
      node.right = null // {1}.right = null

      Node with value 1 returned from 3-SA2BST to node.left in 2-SA2BST // {2}.left = 1

2-SA2BST _node.right recursive call by initial_
middleValue/node.data = 2
node.left = 1 // {2}.left = 1

    6-SA2BST _node.right recursive call by 2-SA2BST_
    start = (1 + 1) = 2
    end = 2
    middleIndex = 2
    middleValue/node.data = 3

      7-SA2BST _node.left recursive call by 6-SA2BST_
      start = 2
      end = (2 - 1) = 1
      node.left = null {3}.left = null

      8-SA2BST _node.right recursive call by 6-SA2BST_
      start = (2 + 1) = 3
      end = 2
      node.right = null // {3}.right = null

      Node with value 3 returned from 6-SA2BST to node.right in 2-SA2BST // {2}.right = 3

Node with value 2 returned from 2-SA2BST to node.left in 1-SA2BST // {4}.left = 2

Left Tree of root Complete
4
/
2  
 / \
1 3
/ \ / \
 NULL NULL

9-SA2BST _node.right recursive call by 1-SA2BST_
start = (3 + 1) = 4
end = 6
middleIndex = 5
middleValue/node.data = 6

10-SA2BST _node.left recursive call by 9-SA2BST_
start = 4
end = (5 - 1) = 4
middleIndex = 4
middleValue/node.data = 5

    11-SA2BST _node.left recursive call by 10-SA2BST_
    start = 4
    end = (4 - 1) = 3
    node.left = null // {5}.left = null

    12-SA2BST _node.right recursive call by 10-SA2BST_
    start = (4 + 1) = 5
    end = 4
    node.right = null // {5}.right = null

    Node with value 5 returned from 10-SA2BST to node.left in 9-SA2BST // {6}.left = 5

13-SA2BST _node.right recursive call by 9-SA2BST_
start = (5 + 1) = 6
end = 6
middleIndex = 6
middleValue/node.data = 7

    14-SA2BST _node.left recursive call by 13-SA2BST_
    start = 6
    end = (6 - 1) = 5
    node.left = null // {7}.left = null

    15-SA2BST _node.right recursive call by 13-SA2BST_
    start = (6 + 1) = 7
    end = 6
    node.right = null // {7}.right = null

    Node with value 7 returned from 13-SA2BST to node.right in 9-SA2BST // {6}.right = 7

Node with value 6 returned from 9-SA2BST to 1-SA2BST, with left child = 5 and right child = 7

Final BST:
4
/ \
 2 6
/ \ / \
 1 3 5 7
/ \/\/\/ \
 NULL AS FUCK

💭 **Gestalt:**
The function fundamentally splits the array into halves through recursion until there are no elements left in the subarrays. At each step, it sets the middle element of the current subarray as the root node, assigns the middle element of the left half to the left child, and the middle element of the right half to the right child. This process ensures that the resulting tree is balanced.

## BST Search Methods

```javascript
// 💭 --------------------------------------------------------------
// 💭 preOrder Traversal
// 💭 <ROOT><LEFT><RIGHT>
// 💭 Utility functions to print preorder traversal of BST;

// ? preOrder Method 1: classic recursion
function preOrder1(node, data = []) {
  if (node === null) return data;

  data.push(node.data);
  preOrder1(node.left, data);
  preOrder1(node.right, data);

  return data;
}

// ? ✨Best Practice✨
// ? preOrder Method 2: nested function with recursion
// ? This method encapsulates the traversal logic within a nested function,
// ? which maintains the `data` array in the outer function scope.
// ? This doesn't necessarily reduce space usage but can help in organizing code better (logic encapsulation, scope management, cleaner function signature, improved readability, reduced external dependencies - the nested function approach ensures that the `traverse` function is only accessible within the scope of `preOrder2`).
function preOrder2(node) {
  const data = [];

  function traverse(node) {
    if (node === null) return;
    data.push(node.data);
    traverse(node.left);
    traverse(node.right);
  }

  traverse(node);

  return data;
}

// ? preOrder Method 3: stack (iterative)
function preOrder3(node) {
  if (node === null) return [];

  const stack = [node];
  const data = [];

  // While loop explanation:
  // The while loop continues to run as long as there are nodes in the stack.
  // It processes nodes in a Last In, First Out (LIFO) order using the pop() method.
  // 1. Pop the top node from the stack (visualizing the array vetically) and process it by adding its data to the data array.
  // 2. Push the right child of the current node to the stack if it exists.
  // 3. Push the left child of the current node to the stack if it exists.
  // This ensures that nodes are processed in preorder (root, left, right) because the stack
  // processes the most recently added nodes first.
  while (stack.length > 0) {
    const current = stack.pop();
    data.push(current.data);

    if (current.right !== null) stack.push(current.right);
    if (current.left !== null) stack.push(current.left);
  }

  return data;
}

// 💭 --------------------------------------------------------------
// 💭 USAGE

const array = [1, 2, 3, 4, 5, 6, 7];
const arrayLength = array.length;

// PARAM: sortedArrayToBST(array, startIndex, EndIndex)
root = sortedArrayToBST(array, 0, array.length - 1);

console.log(preOrder1(root));
console.log(preOrder2(root));
console.log(preOrder3(root));

// ? Output for each: [4, 2, 1, 3, 6, 5, 7]
// preOrder (Depth-First-Search): 1 2 4 5 3
//     1
//    / \
//   2   3
//  / \
// 4   5
```

### Depth vs Breadth First Search

- **DFS**: We visit the entire next child before going into the next child
- **BFS**: We visit all the nodes at the same depth of level before visiting the nodes at the next level.

### BST Depth-First Traversal Order (Inorder, Preorder, Postorder)

D = Data, L = Left, R = right
<left> <root> <right> - Inorder Traversal (L, D, R)
<root> <left> <right> - Preorder Traversal (D, L, R)
<left> <right> <root> - Postorder Traversal (L, R, D)

- Time complexity for these algorithms is Big O(n)

* There was one function call corresponding to each node... therefore running time is proportional to the number of nodes.

- Space Complexity: o(h) (height of the tree)

  - Worse: O(n)
  - Best/Average: O(log n)

- Not a linear data structure like an array or linked list.
- It can be defined as the process of visiting each node in the tree exactly once in some order.
- The order in which the nodes are visited is what distinguishes one traversal algorithm from another.
- Can use recursion!

```javascript
function inorder(root) {
  const data = [];

  if (root === null) return;

  inorder(root.left);

  data.push(root.data);

  inorder(root.right);

  return data;
}

function preorder(root) {
  const data = [];

  if (root === null) return;

  data.push(root.data);

  preorder(root.left);
  preorder(root.right);

  return data;
}

function postorder(root) {
  const data = [];

  if (root === null) return;

  postorder(root.left);
  postorder(root.right);

  data.push(root.data);

  return data;
}
```

---

### BST Breadth-First (Level Order) Binary Tree Traversal in Depth // Pun intended

- Traversal pseudo-code (broad description):

  1. Initialization: Start by creating an empty queue. Enqueue the root of the binary tree if it is not null.
  
  2. Traversal Process:
  - While the queue is not empty:
  - Dequeue a node from the front of the queue and process (e.g., print or store) its value.
  - If the dequeued node has a left child, enqueue the left child.
  - If the dequeued node has a right child, enqueue the right child.

- Traversal psuedo-code (step-by-step description):

  1. Enqueue the root… enqueue its children… dequeue root & store its value
  2. Left child of the root is next in the queue. It enqueues its children, is dequeued and its value is handled.
  3. Right child of the root is next in the queue. It enqueues its children, is dequeued and its value is handled.
  4. The left child of the FIRST left child (step 2), enqueues its children, is dequeued and its value is handled.
  5. The right child of the FIRST left child (step 2), enqueues its children, is dequeued and its value is handled.
  6. The left child of the SECOND left child (step 4), enqueues its children, is dequeued and its value is handled.
  7. The right child of the SECOND left child (step 4), enqueues its children, is dequeued and its value is handled.

  …etc.

- _Time-complexity_ when traversing a binary tree in level order is O(n)

  - If there are 'n' nodes in a tree and in our algorithm visit to a node is reading the data in that node and enqueuing its children. The visit will take constant time O(1) and each node will be visited exactly once… O (n). So, time taken will be proportional to the number of nodes.

- _Space-complexity_ in the best case Big (Omega) is O(1)/ order of 1 (constant)… in the worse case, it is O(n) (proportional to the input)

  - We are using a queue which shrinks and grows depending on the children of the nodes. Assuming the queue is dynamic, the maxiumum amount of extra memory used depends on the maximum number of elements in the queue at any time. In some cases, extra memory will be greater, and less in others.

  - Best Case Explained, Omega O(1): If we have a tree where each node only has one child, we will have maximum of one element in the queue at any given time. One node is dequeued and one is enqueued. Therefore the amount of extra memory will not depend on the number of nodes.

  - Worst Case Explained, Big O(n): If we have a perfect binary tree where each node has 2 children (all levels are full). As the algorithm executes, at some point for each level, all the nodes for that level will be in the queue. At the deepest level of perfect binary tree, we will have `(n + 1) / 2` nodes at the deepest level:

              ⭕️
          /       \
         ⭕️         ⭕️

    / \ / \
     ⭕️ ⭕️ ⭕️ ⭕️
    / \ / \ / \ / \
    ⭕️ ⭕️⭕️ ⭕️⭕️ ⭕️⭕️ ⭕️

- Another way to look at it is that a perfect binary tree with h levels… has `2^h - 1` nodes in total where h is the height of that tree.

- Therefore the maximum number of nodes in the queue is going to be at least n/2. This tells us that the extra memory used is proportional to n… giving us Big O(n) in our "worst case."

---

## Balanced BST Methods

<!-- TODO: description of methods (complexities?) -->

### Insertion
When tasked to insert a node in a BST, there is 1 possible scenario… we insert the new node as a leaf node.

#### Pseudocode

1.  Check the value to be inserted (`let x;`) with the value of the current node (`let nodeData;`) we are in:

- If `x` is less than `nodeData`, move to the left subtree.
- Otherwise, move to the right subtree.

2. Once the leaf node is reached insert `x` to its right or left based on the relation between `x` and the leaf nodes `nodeData`.

#### Recursive Implementation

Here is what is looks like in the context of a JavaScript class, "tree", for manipulating a BST:

```javascript
class Node {
  constructor(value = null) {
    this.value = value;
    this.left = this.right = null;
  }
}

let root = new Node();

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  // Private method to handle recursive insertion
  #insertInternal(node, value) {
    // If the current node is null, create and return a new node (could be a root)
    if (node === null) {
      return new Node(value);
    }

    // Store the current node's value for comparison
    let nodeValue = node.value;

    // No duplicates allowed, return the current node if the value is the same
    if (value === nodeValue) return node;

    if (value < node.value) {
      // If the value is less, insert into the left subtree
      node.left = this.#insertInternal(node.left, value);
    } else {
      // If the value is greater, insert into the right subtree
      node.right = this.#insertInternal(node.right, value);
    }

    // Return the current node to link the tree correctly
    return node;
  }

  // Public method to insert a value
  insert(value) {
    this.root = #insertInternal(this.root, value);
  }
}

// Example usage
const newTree = new Tree();
newTree.insert(9); // Insert root node
newTree.insert(3);  // Insert left child
newTree.insert(6); // Insert right child
newTree.insert(12);  // Insert a node with value 12
```

##### Detailed Walkthrough

Let's go through the process of inserting the value `7` into the BST step by step.

**Initial Tree Structure**

```
       10
      /  \
     5   15
```

**Inserting Value `7`**

1. **Initial Call**:

   - The `insert` method is called with the value `7`.
   - It calls `#insertInternal(this.root, 7)` with the root node (`10`) and the value `7`.

2. **First Level of Recursion**:

   - The current node is `10`, and the value to be inserted is `7`.
   - Since `7` is less than `10`, the method recursively calls `#insertInternal(node.left, 7)` with the left child of `10` (which is `5`).

3. **Second Level of Recursion**:

   - The current node is `5`, and the value to be inserted is `7`.
   - Since `7` is greater than `5`, the method recursively calls `#insertInternal(node.right, 7)` with the right child of `5` (which is `null`).

4. **Base Case**:

   - The current node is `null`, so a new node with value `7` is created and returned.
   - This new node becomes the right child of the node `5`.

5. **Unwinding the Recursion**:

   - The second level of recursion now updates `5`'s right child with the new node `7` and returns the updated node `5`.
   - The first level of recursion now updates `10`'s left child with the updated node `5` and returns the updated node `10`… the root.

6. **Tree Structure After Insertion**:
   - After inserting `7`, the final tree structure is:

```
       10
      /  \
     5   15
      \
       7
```

**Summary**

- The `#insertInternal` method handles the recursive insertion process, correctly updating the left and right children of nodes as needed.
- The `insert` method provides a clean and simple API for users to insert values into the BST without needing to understand the underlying logic.
- The tree maintains its structure and properties after each insertion, preventing duplicates and correctly positioning new values.

#### Iterative Implementation

In the recursive implementation we created a private method that contained the logic for inserting a value into our binary search tree. The public method for insertion calls this method. Now that we are changing the logic, we do so in the private method… maintaining the abstracted public facing pseudo interface.

Here the fuck it is:

```javascript
function #insertInternalIterative(value) {
  // Immediately create a node with the given value
  let node = new Node(value);

  // If the root is null, set the new node as the root
  if (this.root === null) {
    this.root = node;
    return;
  }

  let prev = null;
  let temp = this.root;

  // Traverse the tree until the appropriate insertion point is reached.
  // Temp becomes null when we have reached our insertion point. The loop ends.
  while (temp !== null) {
    if (temp.value > value) {
      // The next `temp` becomes the parent nodes left value because our new nodes value is less.
      prev = temp;
      temp = temp.left;
    } else if (temp.value < key) {
      // The next `temp` becomes the parent nodes right value because our new nodes value is less.
      prev = temp;
      temp = temp.right;
    } else {
      // If the value is already in the tree, return immediately (no duplicates).
      return;
    }
  }

  // Insert the new node in the correct position via the ternary operator
  (prev.value > value) ? prev.left = node : prev.right = node;
}
```

#### Complexities
**Both Implementations**
**Time Complexity**
_ The *worst case* time complexity of insert operations is `O(h)` where `h` is the height of the BST.
_ In the worst case, we may have to travel from the root to the deepest leaf node. The height of a skewed (unbalanced) tree may become `n`.
_ The *Best case* time complexity, for a balanced BST, is `O(h)`/`O(log n)` where `h` is the height of the tree.
_ For a balanced BST, the height is logarithmic in relation to the number of nodes, i.e., `h = O(log n)`.

**Recursive Implementation**
**Auxilary Space**
_ The auxilary space complexity of insertion into a BST is `O(h)` because of the use of the call stack.
_ The amount of recursive calls is proportional to the height of the tree becuase we traverse from the root to the appopriate leaf position where the new value should be inserted. \* While it is true that the call stack will include the final call where the node is `null` (one level past the leaf), this additional call does not change the overall order of the space complexity. This is because the call where the node is `null` immediately returns a value and does not becomes another function call on the stack. This final call does not lead to further recursive calls, so it does not add additional frames to the call stack beyond this point.
_ This means in the best case, `O(log n)`… and in the worst case, `O(n)`.

**Iterative Implementation**
**Auxilary Space**
_ The auxilary space complexity of BST insertion via iteration is `O(1)`.
_ It uses a constant amount of extra space for variables (`node`, `prev`, and `temp`).

💭: Auxilary space refers to the extra space or temporary space used by an algorithm, excluding the space taken by the input. This includes memory allocated for variables, recursive call stacks, and any other temporary data structures used during the execution of the algorithm.

💭: "prev" "curr" "temp" are the only "modern" conventional abbreviations I will use in my code (with the exception other than those that were introduced in computer science and are staples… such as `idx`, `cnt` `num`);

Fuck it here's a list:

**Variables & Parameters** _(vars & params)_

- index - `idx`
- count -`cnt`
- number - `num`
- str - `string`
- ptr - `pointer`
- length - `len` // idk how I feel about this one
- maximum - `max`
- minimum - `min`
- temporary - `temp` or `tmp` // temp is better... idc what you say.
- previous - `prev`
- next - `nxt` // eh, next is literally one more letter…
- initialize - `init`

**Data Structures**

- array - `arr`
- dictionary (also called map/hashmap/lookup tables/associative arrays) - `dict`
- vector - `vec`

**Function & Method Names**

- calculate - `calc`
- configuration - `config`
- generate - `gen`
- initialize - `init`
- process - `proc`
- update - `upd`
- delete - `del`
- remove - `rm`
- chk - `check` // meh (you see how such things can be highly opinionated)

---

### Deletion
When tasked to delete a node in a BST, there are 3 possible scenarios:

1. Delete a leaf node
2. Delete a node with a single child
3. Delete a node with both children

The most difficult scenario is when the node has both children. In that case we will have to find the _inorder successor_.
For a given node, its inorder sucessor is the node with the smallest value greater than the value of the given node.
If the node has a right subtree, the inorder sucessor is the smallest node in that right subtree.
If the node does not have a right subtree, the inorder sucessor is one of its ancestors Specifically, it is the nearest ancestor for which the node is in the left subtree.

#### Pseudocode

``` javascript
function deleteNode(root, value):
    if root is null:
        return root

    // Step 1: Find the node to be deleted
    if value < root.value:
        root.left = deleteNode(root.left, value)
    else if value > root.value:
        root.right = deleteNode(root.right, value)
    else:
        // Step 2: Node to be deleted is found
        // Case 1: Node has no children (is a leaf node)
        if root.left is null and root.right is null:
            return null

        // Case 2: Node has only one child
        if root.left is null:
            return root.right
        else if root.right is null:
            return root.left

        // Case 3: Node has two children
        // Find the inorder successor (smallest value in the right subtree)
        successorValue = getMinValue(root.right)
        // Replace value of node to be deleted with the successor's value
        root.value = successorValue
        // Delete the inorder successor
        root.right = deleteNode(root.right, successorValue)

    return root

function getMinValue(node):
    current = node
    while current.left is not null:
        current = current.left
    return current.value
```

#### Recursive Implementation

```javascript
#deleteNodeInternal(node, value) {
  // Base case
  if (node === null) {
    return node;
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
    node.value = this.#getMinValInternal(node.right);

    // Delete the inorder successor
    node.right = this.#deleteNodeInternal(node.right, node.value);
  }

  return node;
}

#getMinValInternal(node) {
  let minVal = node.value;

  while (node.left !== null) {
    minVal = node.left.value;
    node = node.left;
  }

  return minVal;
}
```

##### Detailed Walkthrough (Node with both children)
Sure, let's break down the unwinding process step by step, showing the call stack at each stage during the deletion of a node with two children.

###### Example Tree

Consider the following BST:

```
       20
      /  \
     10   30
    /  \    \
   5   15   40
      / \
     12  17
```

We will delete the node with the value `10`, which has two children (`5` and `15`), and the inorder successor (`12`) also has a left child.

###### Detailed Step-by-Step Deletion Process

**Initial Tree Structure**

```
       20
      /  \
     10   30
    /  \    \
   5   15   40
      / \
     12  17
```

###### Step-by-Step Execution with Call Stack

**Initial Call**

1. **Method**: `deleteItem(10)`
2. **Call Stack**:
   - `deleteItem(10)`

**Tree State**:
```
       20
      /  \
     10   30
    /  \    \
   5   15   40
      / \
     12  17
```

**First Level of Recursion**

1. **Method**: `#deleteNodeInternal(node, 10)` with `node = 20`
2. **Comparison**: `10 < 20` (Go to the left subtree)
3. **Call Stack**:
   - `#deleteNodeInternal(20, 10)` // node.left
   - `deleteItem(10)`

**Tree State**:
```
       20
      /  \
     10   30
    /  \    \
   5   15   40
      / \
     12  17
```

**Second Level of Recursion**

1. **Method**: `#deleteNodeInternal(node, 10)` with `node = 10`
2. **Comparison**: `10 == 10`
3. **Call Stack**:
   - `#deleteNodeInternal(10, 10)` // node to delete found
   - `#deleteNodeInternal(20, 10)` // node.left
   - `deleteItem(10)`

**Tree State**:
```
       20
      /  \
     10   30
    /  \    \
   5   15   40
      / \
     12  17
```

**Finding the Inorder Successor**

1. **Method**: `#getMinValInternal(node)` with `node = 15`
2. **Traversal**: Move left to `12`
3. **Call Stack**:
   - `#getMinValInternal(15)` 
   - `#deleteNodeInternal(10, 10)` // node to delete found
   - `#deleteNodeInternal(20, 10)` // node.left
   - `deleteItem(10)`

**Tree State**:
```
       20
      /  \
     10   30
    /  \    \
   5   15   40
      / \
     12  17
```

4. **Finding Minimum Value**: The minimum value in the right subtree is `12`.

**Call Stack**:
   - `#getMinValInternal(15)`
   - `#deleteNodeInternal(10, 10)` // node to delete found
   - `#deleteNodeInternal(20, 10)` // node.left
   - `deleteItem(10)`

**Return Value**: `12`

**Copying the Inorder Successor's Value**

1. **Replace Value**: Replace the value of node `10` with `12`.
2. **Call Stack**:
   - `#deleteNodeInternal(10, 10)` // node to delete found
   - `#deleteNodeInternal(20, 10)` // node.left
   - `deleteItem(10)`

**Tree State**:
```
       20
      /  \
     12   30
    /  \    \
   5   15   40
      / \
     12  17
```

**Recursive Call to Delete the Inorder Successor**

1. **Method**: `#deleteNodeInternal(node, 12)` with `node = 15`
2. **Comparison**: `12 < 15` (Go to the left subtree)
3. **Call Stack**:
   - `#deleteNodeInternal(15, 12)` 
   - `#deleteNodeInternal(10, 10)` // node to delete found, where node.value is now `12`
   - `#deleteNodeInternal(20, 10)` // node.left
   - `deleteItem(10)`

**Tree State**:
```
       20
      /  \
     12   30
    /  \    \
   5   15   40
      / \
     12  17
```

**Third Level of Recursion**

1. **Method**: `#deleteNodeInternal(node, 12)` with `node = 12`
2. **Comparison**: `12 == 12` (Node to delete is found)
3. **Call Stack**:
   - `#deleteNodeInternal(12, 12)` // node.left from previous call = to return from this call: (15).left
   - `#deleteNodeInternal(15, 12)`
   - `#deleteNodeInternal(10, 10)` // node to delete found, where node.value is now `12`
   - `#deleteNodeInternal(20, 10)` // node.left
   - `deleteItem(10)`

**Tree State**:
```
       20
      /  \
     12   30
    /  \    \
   5   15   40
      / \
     12  17
```

**Delete the Leaf Node**

1. **Node `12`**: No children (leaf node)
2. **Return**: `null` (to node.left recursive call, where node is 15)
3. **Call Stack**:
   - `#deleteNodeInternal(15, 12)`
   - `#deleteNodeInternal(10, 10)` // node to delete found, where node.value is now `12`
   - `#deleteNodeInternal(20, 10)` // node.left
   - `deleteItem(10)`

**Tree State**:
```
       20
      /  \
     12   30
    /  \    \
   5   15   40
          \
          17
```

**Unwinding the Call Stack**

1. **Return to Third Level**:
   - The left child of node `15` is updated to `null`.
   - **Call Stack**:
     - `#deleteNodeInternal(10, 10)` (new node.value is 12 here)
     - `#deleteNodeInternal(20, 10)`
     - `deleteItem(10)`

**Tree State**:
```
       20
      /  \
     12   30
    /  \    \
   5   15   40
          \
          17
```

2. **Return to Second Level**:
   - The right child of node `12` (originally node `10`) is updated to node `15`.
   - **Call Stack**:
     - `#deleteNodeInternal(20, 10)`
     - `deleteItem(10)`

**Tree State**:
```
       20
      /  \
     12   30
    /  \    \
   5   15   40
          \
          17
```

3. **Return to First Level**:
   - The left child of node `20` is updated to node `12`.
   - **Call Stack**:
     - `deleteItem(10)`

**Final Tree State**:
```
       20
      /  \
     12   30
    /  \    \
   5   15   40
          \
          17
```

###### Summary of the Process

1. **Finding the Node to Delete**:
   - The value `10` is found in the second level of recursion.

2. **Finding the Inorder Successor**:
   - The inorder successor of `10` is `12`.

3. **Replacing Value**:
   - Replace `10` with `12`.

4. **Recursive Call to Delete the Inorder Successor**:
   - Recursively delete the node `12`.

5. **Unwinding the Call Stack**:
   - Update the tree structure to maintain BST properties by updating the pointers correctly during the return of recursive calls.

This breakdown with the call stack should help you understand the process of deleting a node with two children, particularly when the inorder successor also has children, and how the tree structure is maintained throughout the process.

#### Complexities

**Time Complexity**
`O(h)` where `h` is the height of the tree. 
  * In a balanced tree, this corresponds to `O(log n)`. 
  * In a fully skewed tree, this  corresponds to `O(n)`.

**Auxilary Space**
`O(h)` where `h` is the height of the tree. 
  * In a balanced tree, this corresponds to `O(log n)`. 
  * In a fully skewed tree, this  corresponds to `O(n)`.

💭 The first condition `if (node === null)` serves two primary purposes in the `deleteNode` method:
  1. When the initial node is null.
  2. When the value to be deleted does not have a corresponding node:
    * During the recursive traversal of the tree, if the method reaches a point where the subtree does not exist (i.e., the node is `null`), it means the value to be deleted is not present in that subtree. The condition ensures that the recursion terminates and returns `null` for that path. 

---

### Level Order 
#### Iterative (Best Practice)
##### Pseudocode
The methods parameters accept the root node and callback 

If the root node is null, return null.

Initialize a `queue` containing the root node and an empty array to store values if no callback is passed.

Create a loop that will iterate in breadth fashion that runs until the `queue` is empty.

Handle the root node first, by either applying the callback to it or passing its value to the `values` array.

If the root has a left child… push it to the queue.
If the root has a right child… push it to the queue.

The `queue` handles the rest of the nodes in breadth order from left to right.

When the loop has finished running, either `null` is returned (_callback was passed_) or the values array containing the node values in breadth order (_callback was not passed_).

Simple Mockup Demonstrating Values Array:
    8
   / \
  6   9
 / \    \
4   5   11

The loop runs:

queue: `[root]`// 8
The shifted `root` value is passed to the internal values array.
queue: `[root.left, root.right]` // 6, 9

queue: `[root.left, root.right]` // 6, 9
The shifted `root.left` value is passed to the internal values array.
queue: `[root.right, root.left.left, root.left.right]` // 9, 4, 5

queue: `[root.right, root.left.left, root.left.right]` // 9, 4, 5
The shifted `root.right` value is passed to the internal values array.
queue:  `[root.left.left, root.left.right ,root.right.right]` // 4, 5, 11

return values = [8, 6, 9, 4, 5, 11] // breadth order
##### Implementation
``` javascript
#levelOrderInternal(root, callback) {
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

    if (currentNode.left) queue.push  (currentNode.left);
    if (currentNode.right) queue.push (currentNode.right);
  }

  return callback ? null : values;
}

```

💭: "I don't believe in an interventionist God, but I know, darling, that you do. But if I did I would kneel down and ask him not to intervene when it came to you. Not to touch a hair on your head, to leave you as you are, and if he felt he had to direct you, then direct you into my arms."
- Into My Arms by Nick Cave & The Bad Seeds (song)

---

### Height

---

## BONUS NOTES:
- **Helpful in conceptualizing recursion**: `Inorder`, `preorder`, and `postorder` traversals provide concrete examples of how recursion can be effectively used to navigate and process binary trees. By studying these traversals, one can gain a solid grasp of recursion's core principles, such as breaking down problems, defining base and recursive cases, and understanding the order of execution. This knowledge is not only applicable to tree traversal but also to a wide range of recursive problem-solving scenarios.

- **Terminology - "Leaf"**: "Leaf" nodes, in reference to binary trees refer to those that don't have any children (Left and right child pointers are null).

