<!--
! Basic Concepts
* A recursive function is a function that calls itself within its definition.
* An execution context is added to the procedural call stack when dealing with recursive functions.
* The execution context is removed from the procedural call stack when the base case is reached.
* The call stack is a data structure that tracks function calls in a program...
* The call stack is a last-in, first-out (LIFO) data structure.
* When a function is called, an execution context is PUSHED to the call stack.
* When a function returns, the execution context is POPPED from the call stack.
-->

<!--
!TCO (Tail Call Optimization)
* TCO is a feature of some programming languages that allows a recursive function to call itself without growing the call stack. The old call is replaced with the new call.
-->

<!--
! Logarithmic Depth 
* For example: the quicksort algorithm can be implemented that it never requires
* more than log base 2 of n nested recursive calls to sort n items.
? If we have 1024 items to sort, log base 2 of 1024 is 10, meaning that, at most, 10 levels of recursion are needed.

* A depth of log base 2 of n is considered to be logarithmic, which is the best case scenario.

! Space complexity
* The depth of recursion directly impacts the algorithms space complexity, specifically
* the maximum height of the call stack.
* The space complexity of a recursive function is proportional to the maximum depth of the call stack.
* In this scenario, the space complexity is O(log n)... and we would say that the space complexity is logarithmic.
-->

<!-- 
! Memoization
* For some recursive algorithms, the same subproblems are solved multiple times.
* Memoization is a technique that stores the results of expensive function calls and returns the cached result when the same inputs occur again.
* Memoization is a common optimization technique for recursive algorithms.

? Memoization example (Fibonacci sequence)

function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n];
  
  if (n <= 2) return 1;
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
 -->
