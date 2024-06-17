const knightMoves = [
  [-1, 2],
  [1, 2],
  [-2, 1],
  [2, 1],
  [-2, -1],
  [2, -1],
  [-1, -2],
  [1, -2],
];

function isPositionValid(x, y) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

function getValidMoves(position) {
  const [x, y] = position;

  if (!isPositionValid(x, y)) return [];

  const validMoves = new Set(); // * {1}

  for (const [dx, dy] of knightMoves) { // * (2)
    const newX = x + dx;
    const newY = y + dy;

    if (isPositionValid(newX, newY)) {
      validMoves.add(`${newX},${newY}`); // * {3}
    }
  }

  return Array.from(validMoves).map(position => position.split(',').map(Number));
}

function moveKnight(startingPosition, endingPosition) {
  const queue = [[startingPosition, [startingPosition]]]; // position and path
  const visitedPositions = new Set([startingPosition.toString()]); // * {4}
  
  while (queue.length) {
    const [currentPosition, path] = queue.shift();    
    const validMoves = getValidMoves(currentPosition);
    
    for (const position of validMoves) {
      if (visitedPositions.has(position.toString())) continue;

      if (position[0] === endingPosition[0] && position[1] === endingPosition[1]) {
        console.log([...path, position]);
        return;
      }

      visitedPositions.add(position.toString());
      queue.push([position, [...path, position]]);
    }
  }
}

moveKnight([3, 3], [5, 6]);

// 💭 --------------------------------------------------------------
// 💭 {1}

// ? Array Pros:
  // * 1. Order Preservation - Keeps elements in the order they were added.
  // * 2. Simpler Syntax - Easy to use and understand.
  // * 3. Native Support - Wide range of built-in methods for array manipulation.
// ? Array Cons:
  // * 1. Duplicates - Allows duplicate entries.
  // * 2. O(n) Lookup Time - Takes `linear` time.

// ? Set Pros:
  // * 1. No Duplicates - Automatically prevents duplicate entries.
  // * 2. O(1) Lookup Time - Checking if an element exists takes `constant` time.
  // * 3. Efficient Membership Checks: Fast and efficient
// ? Set Cons:
  // * 1. No order - Does not preserve the order of elements.
  // * 2. Conversion Overhead - May need to convert between sets and arrays.
  // * 3. Limited native methods - Fewer built-in methods compared to arrays.

// * Given the Knight's Travails problem, using a set for validMoves is beneficial for avoiding duplicate positions and ensuring efficient membership checks. However, if handling the conversion is cumbersome and duplicates are not a concern, using an array is simpler.

// 💭 --------------------------------------------------------------
// 💭 {2}

// ? Delta (`d`) is a common notation for indicating a change or difference in a value: 
  // * - `dx` represents the change in the x-coordinate of the knights position.
  // * - `dy` represents the change in the y-coordinates of the knights position.

// 💭 --------------------------------------------------------------
// 💭 {3} 

// ? Sets and Arrays:
  // * - Sets can only store unique values (via a `sets` inherent collision preventative measures).
  // * - When using complex data types like arrays (e.g., `[x, y]` for positions), sets treat different arrays with the same contents as unique because each array is a different object reference.
  // * - Converting `position` arrays to strings ensures uniqueness based on their values rather than object reference. Two strings with identical content will always equal one another (e.g, [3,3] vs. '3,3').

// 💭 --------------------------------------------------------------
// 💭 {4}

// ? The purpose of the set in our function is to ensure we don't run our loop for positions we have already visited.
// ? For example:
  // * If we start at position [3, 3], `validMoves` will contain up to 8 positions (all possible knight moves from [3, 3]).
  // * The starting position is added to the `visitedPositions` set to mark the position as already visited.
  // * When processing one of the potential next positions, generating `validMoves` will include positions we've already visited, including our previous position (since moving the knight back is a valid move).
  // * However, because the starting position (and any other previously visited position) is in the `visitedPositions` set, the `continue` directive skips processing for that position, preventing its re-addition to the queue.

// 💭 --------------------------------------------------------------
// 💭 BFS (Breadth-First Search)

// ? How BFS Operates:
  // * 1. Initialize Queue: Start with a queue containing the starting position and move count (initially zero).
  // * 2. Explore Level by Level: Dequeue a position, explore all possible knight moves, and enqueue valid moves.
  // * 3. Track Moves: For each valid move, if it’s the target position, return the number of moves. If not, add it to the queue and mark it as visited.
  // * 4. Repeat: Continue until you reach the target position or exhaust all possible moves.

// ? Pros of BFS:
  // * - Shortest Path Guaranteed: BFS ensures that the first time you reach the target position, it's through the shortest path.
  // * - Systematic Exploration: Explores all positions at the current depth before moving to the next level, ensuring comprehensive coverage.

// ? Cons of BFS:
  // * - Higher Memory Usage: Requires storing all positions at the current depth level, which can use a lot of memory.
  // * - Slower for Deep Trees: Can be slower if the solution is deep in the tree, as it explores all shallower nodes first.
  
// 💭 --------------------------------------------------------------
// 💭 DFS (Depth-First Search):

// ? How DFS Operates:
  // * 1. Initialize Stack: Start with a stack containing the starting position.
  // * 2. Explore Deeply: Pop a position from the stack, explore all possible knight moves, and push valid moves onto the stack.
  // * 3. Track Moves: For each valid move, if it’s the target position, return the path. If not, continue exploring deeply.
  // * 4. Backtrack: If no valid moves are left, backtrack by popping from the stack and explore other paths.

// ? Pros of DFS:
  // * - Lower Memory Usage: Typically uses less memory as it only needs to store the current path.
  // * - Finds Path Quickly in Deep Trees: Can be faster if the target position is located deep in the tree.

// ? Cons of DFS:
  // * - Not Guaranteed Shortest Path: DFS might find a path quickly, but it may not be the shortest.
  // * - Potentially Longer Paths: May explore longer, irrelevant paths before finding the target.

// ? Summary
  // * - BFS: Better for finding the shortest path but uses more memory.
  // * - DFS: More memory-efficient and can be faster for deep solutions but might not find the shortest path.

  // 💭 --------------------------------------------------------------