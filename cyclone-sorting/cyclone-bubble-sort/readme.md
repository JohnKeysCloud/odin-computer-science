# 💭 Loop Logic of Bubble Sort Algorithm
- The outer, `i`, loop will run once (n) for each element in the array.
- For the first outer loop iteration, the inner loop, `j`, will run one less time than the length of the array.
- For each consecutive outer loop iteration, the inner loop will run one less time (n - 1) than it did in the previous outer loop iteration.
- By the end of each inner loop pass, the largest unsorted element "bubbles up" towards the end of the array to its sorted position in the array.

# 💭 Walkthrough of Bubble Sort Using `arrayOne`
**Array:** `let arrayOne = [23, 43, 12, 56, 35];`
- **Outer loop will run 5 times (from index 0 to 4)**

## First Outer Loop (i = 0)
- **Inner loop runs 4 times (5 - 0 - 1 = 4)**

  ### First Inner Loop (j = 0)
  - 23 is not greater than 43
  - No action
  - **Before:** `[23, 43, 12, 56, 35]`
  - **After:** `[23, 43, 12, 56, 35]`

  ### Second Inner Loop (j = 1)
  - 43 is greater than 12
  - Swap values and set flag to true.
  - **Before:** `[23, 43, 12, 56, 35]`
  - **After:** `[23, 12, 43, 56, 35]`

  ### Third Inner Loop (j = 2)
  - 43 is not greater than 56
  - No action
  - **Before:** `[23, 12, 43, 56, 35]`
  - **After:** `[23, 12, 43, 56, 35]`

  ### Fourth Inner Loop (j = 3)
  - 56 is greater than 35
  - Swap values and set flag to true.
  - **Before:** `[23, 12, 43, 56, 35]`
  - **After:** `[23, 12, 43, 35, 56]`

- **First outer loop cycle is complete.**
- **The array's largest value has bubbled up to the end of the array.**
- **Flag is true. Proceed to the next outer loop iteration where the flag is reset to false.**

## Second Outer Loop (i = 1)
- **Inner loop runs 3 times (5 - 1 - 1 = 3)**
- **(One less time than the previous outer loop iteration because the largest value is at the end of the array and requires no further processing).**

  ### First Inner Loop (j = 0)
  - 23 is greater than 12
  - Swap values and set the flag to true.
  - **Before:** `[23, 12, 43, 35, 56]`
  - **After:** `[12, 23, 43, 35, 56]`

  ### Second Inner Loop (j = 1)
  - 23 is not greater than 43
  - No action
  - **Before:** `[12, 23, 43, 35, 56]`
  - **After:** `[12, 23, 43, 35, 56]`

  ### Third Inner Loop (j = 2)
  - 43 is greater than 35
  - Swap values and set the flag to true.
  - **Before:** `[12, 23, 43, 35, 56]`
  - **After:** `[12, 23, 35, 43, 56]`

- **Second outer loop cycle is complete.**
- **The array's largest value has bubbled up to the end of the array.**
- **Flag is true. Proceed to the next outer loop iteration where the flag is reset to false.**

## Third Outer Loop (i = 2)
- **Inner loop runs 2 times (5 - 2 - 1 = 2)**

  ### First Inner Loop (j = 0)
  - 12 is not greater than 23
  - No action
  - **Before:** `[12, 23, 43, 35, 56]`
  - **After:** `[12, 23, 35, 43, 56]`
  
  ### Second Inner Loop (j = 1)
  - 23 is not greater than 35
  - No action
  - **Before:** `[12, 23, 43, 35, 56]`
  - **After:** `[12, 23, 35, 43, 56]`

- **Third outer loop cycle is complete.**
- **The array remains unchanged because it is already sorted.**
- **Flag is false. The array is sorted, so it is returned.**
