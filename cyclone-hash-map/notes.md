# Hash Maps/Tables
***

## Introduction
Structures based on hash tables:
- Object literals in JavaScript - `{}`
- `Set` in JavaScript
- `Map` in JavaScript

But how do they work internally? How can we save key value pairs and later retrieve them?
Here is where we dive into the world of hash maps.

## What is a Hash Map?
A hash map takes in a key value pair, produces a hash code, and stores the key value pair in a bucket.

### What is a hash code?
- Firstly we neeed to understnad what it means to "hash a value".
- Hashing involves taking an input in and generating a corresponding output.
- A hash function should be a pure function (…a function that given the same input, will always return the same output).
- Hashing the same input should always return the same hash code, and there should be no random generation component.

For example, this hashing function takes a name and gives us the first letter of that name:
```javascript
function hash(name) {
  return name.charAt(0);
}
```

#### Difference between hashing and ciphering (encryption): **REVERSIBILITY**
- Hashing is a one-way process.
- Using the example above, you can make a hash code from a name, but you cannot take a hash code and get the name back.
- If you have a name "Kashvi", we can hash it to "K". But it's impossible to reverse it from "K" back to its original form. You cannot know if its "Kashvi" or "Katia" or "Karen".
- 💡 Hashing is very good for security. Given a psssword, you can save the hash of that password rather than the passwords plain text. If someone steals your hashes, they cannot know the original passwords since they are unable to reverse the hash back to the password.

#### Use cases

##### Example 1: Directories
Take the following where the single letters are the hash codes (as well as names of directories):

C:
  carlos.txt
  carla.txt
B:
  bryan.txt
  bob.txt
  beatrice.txt
  bella.txt
  benjamin.txt
  bianca.txt

If we get a new name with the name "Carlos", we can run our has function to find out which folder to place them in:
`hash('Carlos -> 'C')`
So we put "Carlos" in the "C" directory.
---

💭 But what if our school is populated with many people whose names share the same first letter "C"?
We would have a directory labeled "C" that holds too many names while other directories could be empty.
To eliminate this duplication and better separate our students, we need to rework our hash function:
```javascript
function hash(name, surname) {
  return name.charAt(0) + surname.charAt(0);
}
```

This will spread our students among more directories and eliminate many duplicate hash codes from being generated.
---

💭 We still have a problem here. What if we have a common combination of first letters in student' names? Then we will still have an imbalance in the size of the directories. We need to make it easier to find the person we're looking for:
```javascript
function stringToNumber(string) {
  let hashCode = 0;
  
  for (let i = 0; i < string.length; i++) {
    // ? sums up the character code of each character in the string
    hashCode += string.charCodeAt(i);
  }

  return hashCode;
}

function hash(name, surname) {
  return stringToNumber(name) + stringToNumber(surname);
}
```

Here, we not only consider the first letters… instead, we take the entire name and convert it into numbers.
---

💭 You might be thinking… wouldn't it be better to save the whole name as a hash code? That is true.
This would make it unique for each name, but in the context of hash maps, we need the hash code to be a `number`.
This number will serve as the index to the _bucket_ that will store the key value pair.

### What is a bucket?
Buckets are storages that we need to store our elements. 
Simply put, a bucket is an _array_ that can hold multiple key value pairs.
When we hash a key, we get a number that will be the index of the bucket where we will store the key value pair.

For a specific key, we decide which bucket to use for storage through our hash function.
The hash function returns a mumber that serves as the index of the array at which we store this specific key value pair.

Let's say we wanted to store a person's full name as a key "Fred" with a value of "Smith":
1. Pass "Fred" into the hash function to get the hash code `385`.
2. Find the bucket at index `385`.
3. Store the key value pair in that bucket. In this case, the key would be "Fred" and the value would be "Smith".

(This is an oversimplified explanation of how a hash map works)

Now, if we wanted to get a value using a key:
1. Put each entry inside a bucket as a `Node` item, which holds both the key and the value.
2. To retrieve the value, we hash the key and calculate its bucket number.
3. If the bucket is not empty, then we go to that bucket.
4. Now we compare if the node's key is the same key that was used for the retrieval.
5. If it is, then we can return the node's value. Otherwise, we return `null`.

💭 Why are we comparing the keys if we already found the index of that bucket? _Remember_, a hash code is just the location. **Different keys might generate the same hash code** (i.e., differnt names that when converted to character code, add up to the same number).
This is called a _collision_ (see below).
We need to make sure the key is the same by comparing both keys that are inside the bucket,
This is it, making this will result in a hash table with `has`, `set` and `get`.

What if we found the hash code, but also the key value is the same as what we already have in the bucket?
We check if it's the same item by comparing the keys, then we overwrite the value with our new value. 
This is how we can only have unique values inside a **Set**.

A **Set** is similar to a hash map but the key difference (pun intended) is that a **Set** will have nodes with only keys and no values.

#### Insertion order is node maintained
- A hash map does not guarantee insertion order when you iterate over it.
- The translation of hash codes indexes does not follow a linear progression from the first to the last index.
- It is unpredictable, irrespective of the order in which items are inserted.
- That means if you are to retrieve the array of keys and values to iterate over them, then they will not be in order of when you inserted them. 

- Some libraries implement hash tables with insertion order in mind such as JavaScript's own `Map`.
- An unordered hash table. Example: if we insert the values "Mao", "Zach", "Xari" in this order, we may get back ["Zach", "Mao", "Xari"] when we iterate over the hash map.

💭 If iterating over a hash map frequently is your goal, then this data structure is not the right choice for the job. A simple array would be better.

#### Collisions
A collision occurs when two different keys generate the exact same hash code.
Because they have the same hash code, they will land in the same bucket. 

For example, hashing the name "Sara" and the name "raSa" will generate the same hash code.
This is because the letters in both names are the same, just arranged differently. 

We can rework our `stringToNumber` function so that it can give us unique hash codes that depend on where the letters appear in the name using an algorithm:
```javascript
function stringToNumber(string) {
  let hashCode = 0;

  const primeNumber = 31;
  for (let i = 0; i < string.length; i++) {
    hashCode = primeNumber * hashCode + string.charCodeAt(i);
  }

  return hashCode;
}
```

With this new function we get different hash codes for the names "Sarah" and "raSa".
This is because even if both names have the same letters, some of the letters appear in different locations. 
The hash code started to change because we are multiplying the old hash with every new iteration and then adding the letter code. 

> 💡 Notice the usage of a prime number. We could have chosen any number we wanted, but prime numbers are preferable. Multiplying by a prime number will reduce the likelihood of hash codes being evenly divisible by the bucket length, which helps minimize the occurence of collisions. 

Explanation: If we have a bucket length of 10, then we want to avoid hash codes that are multiples of 10. Multiplying by a prime number helps us avoid this.
If the hash tables size is also a prime number, the combination minimizes the chance that different keys with similar structures end up in the same bucket.

- Efficiency with Multiplication: Multiplying by 31 is efficient since it can be rewritten as a bit shift and subtraction (`31 = 32 - 1 `), which processors can handle very quickly:
```javascript
hashCode = (hashCode << 5) - hashCode + string.charCodeAt(i);

// `hashCode << 5 === hashCode * 2 ** 5`; therefore, subtracting `hashCode` means we are essentially multiplying `hashCode` by 31. Using bitwise operators are more efficient than arithmetic operators.
```

🚀 Bit Shifting:
- The binary number representation of '5' is `101`.

**Left Shifts** _(multiplying by powers of 2)_ 
* `5 << 1`: this shifts the bits one position to the left, adding a zero at the end.
  - **Original**: `101`
  - **Shift left by 1**: `1010` (which is `10` in decimal system)
  - **Effect**: This is equivalent to multiplying 5 by 2… yielding `10`.

* `5 << 2`: this shifts the bits two positions to the left, adding two zeros at the end.
  - **Original**: `101`
  - **Shift left by 2**: `10100` (which is `20` in decimal system)
  - **Effect**: This is equivalent to multiplying 5  by 4… yielding `20`.

**Right Shifts**  _(dividing by powers of 2)_  
* `5 >> 1`: this shifts the bits one position to the right, removing the last digit.
  - **Original**: `101`
  - **Shift right by 1**: `10` (which is `2` in decimal system)
  - **Effect**: This is equivalent to dividing 5 by 2… yielding `2`.

* `5 >> 2`: this shifts the bits two positions to the right, removing the last two digits.
  - **Original**: `101`
  - **Shift right by 2**: `1` (which is `1` in decimal system)
  - **Effect**: This is equivalent to dividing 5 by 4… yielding `1`.

💭 Notice how during the shift right when we divided 5 by 2, it yielded 2. Bit shifts work differently because they operate on integers.
When performing a right shift on an integer in binary thats odd, the result is always rounded down to the nearest integer. The fractional part is truncated.
This is built into the shifting operators in most programming languages.

---function to avoid the collision, it is still possible to have collisions. 
There's always a possibility for collisions. 
Since we have a finite number of buckets, there is no way to eliminate collisions entirely.
Lets try to minimize them.

##### Dealing with collisions
Up until now, our hash map is a one-dimensional data structure.
What if each Node inside the bucket can store more than one value?
Enter: **Linked Lists**

Now, each bucket will be a linked list. When inserting into a bucket, if it's empty, we insert the head of a linked list. If a head exists in a bucket, we follow that linked list to add to the end of it. 

### Growth of a hash table
Let's talk about the growth of our buckets.
We don't have infinite memory, so we can't have an infinite number of buckets.
We need to start somewhere, but starting too big is also a waste of memoery if we're only going to have a hash map with a single value in it.
So, to deal with this issue, we should start with a small array for our buckets.
We'll use an array size of `16` for example.

💡 Most programming languages start with the default size of `16` because it's a power of 2, which helps with some techniques for performance that require bit manipulation for indexes. 

How are we going to insert into those buckets when our hash function generates big numbers like `20353924`?
We can make use of the modulo operator '%'… given any number modulo by 16 we will get a number between 0 and 15.

💭 General rule for the modulo operator is that the result of `A % N` is always between `0` and `N - 1 (inclusive)` 
This is because the modulo operator returns the remainder of the division of `A` by `N`.
For example:
`10 % 3` will return `1` because `10` divided by `3` is `3` with a remainder of `1`. 
`10 % 10` will return `0` because `10` divided by `10` is `1` with a remainder of `0`. 
`10 % 11` will return `10` because `10` divided by `11` is `0` with a remainder of `10`.

For example, if we are to find the bucket where the value "Manon" will land, then we do the following:

Manon placed in bucket 3.
|Manon|Hash Function|1091|1091 % 16|3 (Bucket)|
(See [16 Element Bucket](./assets/16-element-bucket.png))

As we continue to add nodes into our buckets, collisions get more and more likely. 
Eventually however, there will be more nodes than there are buckets, which guarantees a collision.

Remember… we don't want collisions.
In a perfect world, each bucket will either have 0 or 1 node only, so we grow our buckets to have more chance that our nodes will spread and not stack up in the same buckets.
To grow our buckets, we create a new buckets list that is double the size of the old buckets lists, then we copy all nodes over to the new buckets.

#### When do we know when to grow our buckets?
To deal with this, our hash map class needs to keep track of two new fields. 
1. **capacity** - the number of buckets we have.
  Keeping track of this will let us know if our map has reached a certan thereshold aka _laod factor_.


2. **loadFactor** - the ratio of the number of nodes to the number of buckets.
  This is a number that we can assign our hash map to at the start. 
  It's the factor that will determine whne it is a good time to grow our buckets.
  For example, a load factor of `0.75` means our hash map will need to grow its buckets when the capacity is `75%` full.
  Setting it too low will consume too much memory by having too many empty buckets, while setting it too high will allow our buckets to have many collisions before we grow them.
  Hash map implementations across various languages use a load factor between `0.75` and `1`.
---

### Computation complexity
A hash map is very efficient in its insertion, retrieval and removal operations.
This is because we use array indexes to do these operations.
A hash map has an average case complexity of O(1) for all these operations:
- **Insertion**: O(1) - constant time
- **Retrieval**: O(1) - constant time
- **Deletion**: O(1) - constant time

Assuming we have a good hash function written. 
The worst case of those operations would be O(n) and that happens when we have all our data hashes to the same exact bucket.
The complexity itself surfaces because of the linked list, and O(n) is because we have to traverse the linked list to insert yet again another node into the same bucket, which happens specifically because of collisions.

The growth of our hash map has the complexity of O(n) because we have to copy all the nodes over to the new buckets.
---

## Most Common Methods for Mapping Keys to Buckets

### Division Method
The division method is the simplest way to map keys to buckets.
It involves taking the key and dividing it by the number of buckets, then taking the remainder.
This remainder is the index of the bucket where the key will be stored.

For example, if we have a hash function that generates the hash code `1091` and we have `16` buckets, then we do the following:
`1091 % 16 = 3`
So the key will be stored in bucket `3`.

When using the division method, it is important to choose a prime number for the number of buckets.
Another way to say number of buckets is the _size of the hash table_.
This helps reduce the likelihood of collisions and ensures that the keys are evenly distributed among the buckets.
If it is the power of a number, it will increase the likelihood of collisions.

If its a power of 2, lets say 16, then the hash code will be even and the remainder will be even as well. This will result in all the keys that are even to be stored in the same bucket.
This is why we use prime numbers, because they are less likely to have common factors with the hash code.

A hash table size of `16` is a common choice because it is a power of 2, which makes it easy to calculate the remainder using bitwise operations, and it is not a multiple of 2, which helps reduce the likelihood of collisions; however, it is not a prime number, which can increase the likelihood of collisions. 

16 is 2^4, so the remainder of a number divided by 16 is the last 4 bits of the number. This makes it easy to calculate the remainder using bitwise operations.

#### To use powers of 2 or not?
- **Yes**: It is easier to calculate the remainder using bitwise operations.
- **No**: It increases the likelihood of collisions because the remainder will be even for even numbers and odd for odd numbers.

1. **Why powers of 2 are used:**
- **Efficiency/Simplicity**: Calculating the remainder of a number divided by a power of 2 is very efficient using bitwise operations.
  * When the hash table size, `m` is a power of 2, the modulo operation required to determine the index in the hash table (commonly `h(k) = k % m`) can be replaced with a bitwise AND operation.
  More specifically, `h(k) % 2^p` can be replaced with `h(k) & (2^p - 1)`.
  _Bitwise operations are generally faster than arithmetic operations_.
  For example:
  **m = 16 = 10000** (in binary)
  **m - 1 = 15 = 01111** (in binary) // 15 is the largest number that can be represented with 4 bits
  (4 consecutive 1s)

- **Performance**: Bitwise operations are faster than division operations on most processors.
  * Using a power of 2 simplifies the calculation of the index where an element should be stored or searched for within the hash table. This simplification can lead to performance improvements, especially in low-level implementations where every CPU cycle counts. 

### Multiplicative Method Bucket Mapping
The multiplication method is a more sophisticated way to map keys to buckets.
It involves multiplying the key by a constant `A` and then taking the fractional part of the product.
This fractional part is then multiplied by the number of buckets, and the integer part of the product is the index of the bucket where the key will be stored.

#### Formulas

The **Standard** multiplicative method of bucket mapping is defined by the formula:

`h(k) = ⌊ m ( k ⋅ (s/2^w) ) ⌋`

Where:
- `h(k)` is the hash value of the key `k`.
- `m` is the size of the hash table.
- `k` is the key to be hashed.
- `s` is a _constant_ scaling factor in the range `0 < s < 2^w`.
- `w` is the number of bits in the word size of the computer.

The **Fractional** multiplicative method of bucket mapping is defined by the formula:

`h(k) = floor (m * (k * c mod 1))`

Where:
- `h(k)` is the hash value of the key `k`.
- `m` is the size of the hash table.
- `c` is a constant value in the range `0 < c < 1` (scaling factor).
- `mod 1` means taking the fractional part of the product (represented by `___ % 1`).

#### Pseudo Code of multiplicative method
1. Multiply the hash code by a constant `c` (e.g., `0.6180339887`) in the range `0 < c < 1`. _Elegant choice for `c` is the Golden Ratio Conjugate, ϕ_.
2. Take the fractional part of the product.
3. Multiply the fractional part by the number of buckets/table size.
4. Take the integer part of the product.
So the key will be stored in bucket `3`.

#### Example of  multiplicative method
- If we have a hash function that generates the hash code `1091` and we have `16` buckets, then we do the following:
1. Multiply the hash code by a constant `A` (e.g., `0.6180339887`).
2. Take the fractional part of the product (e.g., `0.6180339887 * 1091 = 674.5`).
3. Multiply the fractional part by the number of buckets (e.g., `674.5 * 16 = 10792`).
4. Take the integer part of the product (e.g., `10792 % 16 = 0`).
So the key will be stored in bucket `0`.

##### Differences between the multiplicative methods
1. **Implementation Focus**: 
  * The _standard_ method focuses on ensuring that operations are efficient and fit well within the constraints of typical machine architectures, using integer arithmetic and bit manipulations.
  * The _fractional_ method focuses on generating a more random distribution of hash values by incorporating the fractional part of the product, which can help reduce clustering and improve the overall performance of the hash function.
2. **Peformance and Collision**:
  * The _standard_ method is generally faster and more efficient due to its use of integer arithmetic and bitwise operations, which are typically faster than floating-point arithmetic.
  * The _fractional_ method can provide better distribution of hash values and reduce the likelihood of collisions, especially when the scaling factor `c` is carefully chosen to avoid clustering… such as the golden ratio conjugate ( more below). However, it may be slower due to the use of floating-point arithmetic.
3. **Usage Scenarios**:
  * The _standard_ method is commonly used in low-level implementations where performance is critical and the focus is on efficiency and simplicity… where machine word/register size and bit manipulation are important considerations.
  * The _fractional_ method is often used in applications where a more random distribution of hash values is desired to reduce clustering and improve the overall performance of the hash function.

In short, where uniform key distribution takes precedence over computational efficiency, the fractional method is preferred. Otherwise, the standard method is more suitable.

##### More info
- The constant √5 - 1 / 2 is a common choice for the constant `A` because it is irrational and has good properties for hashing. It is known as the _Golden Ratio Conjugate_, ϕ.
It cannot be expressed as a simple fraction and its decimal representation is non-repeating and non-terminating. This makes it a good choice for hashing because it helps distribute the keys more evenly among the buckets.
💭 It also stems from solving the quadratic equation `x^2 - x - 1 = 0`

- An advantage of the multiplication method is that the value of _m is not critical_, meaning that the hash function will distribute the data relatively uniformly across the hash table regardless of the specific size of the table. This characteristic is advantageous because it provides flexibility in choosing the table size, which can be adjusted based on space and performance requirements without significantly affecting the distribution quality of the hash function. 

- We typically choose it to be a power of 2 (m = 2^p for some integer p). When `m` is a power of 2, the modulo operation required in many hash functions can be optimized to a simple bit manipulation operation, which is more efficient than a division operation. 

---

## Advanced Methods for Mapping Keys to Buckets

### Mid-Square Method
The mid-square method is a more complex way to map keys to buckets.
It involves squaring the key, taking the middle digits of the square, and then taking the remainder when dividing by the number of buckets.
This remainder is the index of the bucket where the key will be stored.

For example, if we have a hash function that generates the hash code `1091` and we have `16` buckets, then we do the following:
1. Square the hash code (e.g., `1091 * 1091 = 1189081`).
2. Take the middle digits of the square (e.g., `890`).
3. Take the remainder when dividing by the number of buckets (e.g., `890 % 16 = 2`).
So the key will be stored in bucket `2`.

### Folding Method
The folding method is a more flexible way to map keys to buckets.
It involves dividing the key into equal-sized parts, folding the parts together, and then taking the remainder when dividing by the number of buckets.
This remainder is the index of the bucket where the key will be stored.

For example, if we have a hash function that generates the hash code `1091` and we have `16` buckets, then we do the following:
1. Divide the hash code into equal-sized parts (e.g., `10`, `91`).
2. Fold the parts together (e.g., `10 + 91 = 101`).
3. Take the remainder when dividing by the number of buckets (e.g., `101 % 16 = 5`).
So the key will be stored in bucket `5`.

### Radix Transformation Method
The radix transformation method is a more advanced way to map keys to buckets.
It involves converting the key to a different base, taking the remainder when dividing by the number of buckets, and then converting back to the original base.
This remainder is the index of the bucket where the key will be stored.

For example, if we have a hash function that generates the hash code `1091` and we have `16` buckets, then we do the following:
1. Convert the hash code to a different base (e.g., `1091` in base `10` is `1000100011` in base `2`).
2. Take the remainder when dividing by the number of buckets (e.g., `1000100011 % 16 = 3`).
3. Convert back to the original base (e.g., `3` in base `10` is `3`).
So the key will be stored in bucket `3`.

### Digit Analysis Method
The digit analysis method is a more mathematical way to map keys to buckets.
It involves analyzing the digits of the key, performing mathematical operations on the digits, and then taking the remainder when dividing by the number of buckets.
This remainder is the index of the bucket where the key will be stored.

For example, if we have a hash function that generates the hash code `1091` and we have `16` buckets, then we do the following:
1. Analyze the digits of the hash code (e.g., `1`, `0`, `9`, `1`).
2. Perform mathematical operations on the digits (e.g., `1 + 0 + 9 + 1 = 11`).
3. Take the remainder when dividing by the number of buckets (e.g., `11 % 16 = 11`).
So the key will be stored in bucket `11`.

### Universal Hashing Method
The universal hashing method is a more random way to map keys to buckets.
It involves selecting a random hash function from a family of hash functions, applying the hash function to the key, and then taking the remainder when dividing by the number of buckets.
This remainder is the index of the bucket where the key will be stored.

For example, if we have a hash function that generates the hash code `1091` and we have `16` buckets, then we do the following:
1. Select a random hash function from a family of hash functions.
2. Apply the hash function to the key (e.g., `hashFunction(1091)`).
3. Take the remainder when dividing by the number of buckets (e.g., `hashFunction(1091) % 16`).
So the key will be stored in the bucket determined by the random hash function.

### Perfect Hashing Method
The perfect hashing method is a more specialized way to map keys to buckets.
It involves creating a hash function that guarantees no collisions for a specific set of keys.
This hash function is then used to map the keys to buckets without any collisions.

For example, if we have a hash function that generates the hash code `1091` and we have `16` buckets, then we do the following:
1. Create a perfect hash function that guarantees no collisions for the keys in the set.
2. Apply the perfect hash function to the key (e.g., `perfectHashFunction(1091)`).
3. Take the remainder when dividing by the number of buckets (e.g., `perfectHashFunction(1091) % 16`).
So the key will be stored in the bucket determined by the perfect hash function.

---

### Summary
1. What does it mean to hash?
  To hash means to take an input and generate a corresponding output. It is a one-way process (a pure function) that produces a _hash code_ from an input value.

2. What are buckets?
  Buckets are essentially arrays that store key-value pairs in a hash map. Each bucket is indexed by a hash code, which is generated from the key.

3. What is a collision?
  Collisions occur when different keys generate the same hash code, leading to a bucket that already contains a key-value pair.

4. When is it a good time to grow our table?
  If we are keeping track of the _capacity_ (the total number of buckets we have) and _load factor_ (which uses the capcity to determine when to grow the table), then we can grow our table when the load factor exceeds a certain threshold (e.g., 0.75 or, when our hash table has reached 75% capacity). This is the most common way to grow our table… preventing the number of nodes from exceeding the number of buckets.

### Conclusion
There are many methods for mapping keys to buckets in a hash map.
Each method has its own advantages and disadvantages, and the best method to use depends on the specific requirements of the application.
Some methods are more efficient than others, some are more random than others, and some guarantee no collisions for specific sets of keys.
By understanding the different methods for mapping keys to buckets, you can choose the best method for your hash map implementation.