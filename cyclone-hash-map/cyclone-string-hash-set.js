class CycloneHashSet {
  constructor(capacity, loadFactor, name) {
    this.buckets = new Array(capacity).fill(null).map(() => []);
    this.loadFactor = loadFactor;
    this.numberOfKeys = 0;
    this.name = name;
    this.setSize = capacity;
  }

  /**
   * Returns `true` if all buckets are empty, else `false`.
   * @private
   * @returns {Boolean} The size of the set.
   */
  _checkIfAllBucketsEmpty() {
    if (this.buckets.every((bucket) => !bucket.length)) {
      return true;
    }
    return false;
  }

  /**
   * Ensures that the index is within bounds of the set when mapping keys to buckets.
   * @private
   * @param {Number} index - The potential index of the bucket being modified.
   * @throws {Error} Will throw an error if index is out of bounds.
   */
  _checkIndex(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Index out of bounds');
    }
  }

  /**
   * Generates hash code and returns it.
   * @private
   * @param {String} key - generates hash code based on key.
   * @returns {Number} Hash code for bucket mapping.
   */
  _hash(key) {
    let hashCode = 0;
    
    for (let i = 0; i < key.length; i++) {
      hashCode = (hashCode << 5) - hashCode + key.charCodeAt(i);

      /*
        ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
        │ // ? `hashCode << 5 === hashCode * 2 ** 5`;                                                                         │
        │ // ? Therefore, subtracting `hashCode` means we are essentially multiplying `hashCode` by 31.                       │
        │ // ? Using bitwise operators are more efficient than arithmetic operators.                                           │
        └─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
      */
    }

    return hashCode;
  }

  /**
   * Maps passed key to corresponding bucket.
   * @private
   * @param {String} key - generates hash code based on key.
   * @returns {Number} Bucket index that corresponds to the key.
   */
  _getBucketsIndex(key) {
    const keyHashCode = this._hash(key);
    const bucketIndex = keyHashCode & (this.setSize - 1); // ? bitwise modulo method

    this._checkIndex(bucketIndex);

    return bucketIndex;

    /*
      ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
      │     // 💭 Another, More Common Solution (…but not limited to):                                                      │
      │     // 💭 `h(k) % 2^p === h(k) & (2^p - 1)`                                                                         │
      │     // * This shows that modulo operation with powers of two can equivalently be performed by a bitwise AND with    │
      │     // * `2^p - 1`, which simplifies calculations and improves efficiency in certain environments.                    │
      │     // * const index = keyHashCode % this.size;                                                                     │  
      │     // * vs.                                                                                                        │  
      │     // * const indexWhereSizeIs2ToThePowerOfN = keyHashCode & (this.size - 1);                                      │
      │                                                                                                                     │
      │     // ? The `&` bitwise operator compares the binary representations of the operands                               │
      │     // ? and sets each bit to 1 if and only if both corresponding bits are 1.                                       │
      │                                                                                                                     │
      │     // ? If our bucket size is `2^n`, then the number's binary representation is a 1 followed by `n` zeros.         │
      │     // ? For example, 16 is represented as 10000 in binary. Let's use that…                                         │
      │                                                                                                                     │
      │     // ? Subtracting one from that, we get 15. This subtraction flips the most significant bit (the leftmost 1)       │
      │     // ? to 0 and all the bits to the right of it to 1, due to a binary borrow that affects all bits                │
      │     // ? from the most significant bit down to the least significant bit. This results in 1111 (which is 15 in        │
      │     // ? decimal), effectively the highest possible index within our bucket array.                                  │
      │                                                                                                                     │
      │     // ? Comparing this number to our hash code using the `&` bitwise operator… regardless of the hash number,      │
      │     // ? only the 4 least significant bits (of the hash code) are used to determine the index of the bucket to       │
      │     // ? insert our key-value pair.                                                                                 │
      └─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
    */
  }

  /**
   * Dynamically grows set based on load factor and capacity.
   * @private
   */
  _growSet() {
    const clearNumberOfKeys = () => {
      this.numberOfKeys = 0;
    }

    const oldKeys = this.keys;

    this.setSize *= 2;
    this.buckets = new Array(this.setSize).fill(null).map(() => []);

    clearNumberOfKeys();

    oldKeys.forEach(key => {
      this.add(key);
    });
  }

  // > --------------------------------------------------------------
  // > Public Methods
  /**
   * Sets value for given key. Returns if key already exists. Grows set if load factor is reached.
   * @public
   * @param {String} key - key of entry
   * @returns {Boolean} `true` if set has entry for passed `key`, else, `false`.
   */
  add(key) {
    const bucketIndex = this._getBucketsIndex(key);
    const matchedBucket = this.buckets[bucketIndex];

    for (let existingKey of matchedBucket) {
      if (existingKey === key) {
        return false; // Key already exists, no addition performed
      }
    }

    if (this.currentLoadFactor >= this.loadFactor) this._growSet();

    matchedBucket.push(key);
    this.numberOfKeys++;
    return true; // Key added successfully
  }

  /**
   * Clears all keys in all buckets, while retaining current set size
   * @public
   * @returns {any}
   */
  clear() {
    this.buckets.forEach((bucket) => bucket.length = 0);
    this.numberOfKeys = 0;
  }

  /**
   * Checks buckets to see if set has key for passed value.
   * @public
   * @param {String} key - key of entry
   * @returns {Boolean} `true` if set has keys for passed value, else, `false`.
   */
  has(key) {
    const bucketIndex = this._getBucketsIndex(key);
    const matchedBucket = this.buckets[bucketIndex];

    for (let entry of matchedBucket) {
      const currentKey = entry;

      if (currentKey === key) {
        return true;
      }
    }  

    return false;
  }

  /**
   * Removes key from set.
   * @public
   * @param {String} key - key of entry
   * @returns {Boolean} `true` if map has entry for passed `key`, else, `false`.
   */
  remove(key) {
    const bucketIndex = this._getBucketsIndex(key);
    const matchedBucket = this.buckets[bucketIndex];

    for (let i = 0; i < matchedBucket.length; i++) {
      const currentKey = matchedBucket[i];
      
      if (currentKey === key) {
        matchedBucket.splice(i, 1);
        this.numberOfKeys--;
        return true;
      }
    }

    return false;
  }
  
  // > --------------------------------------------------------------
  // > Getters

  get currentLoadFactor() {
    return this.numberOfKeys / this.setSize;
  }

  get keys() {
    if (this._checkIfAllBucketsEmpty()) return [];

    let keys = [];

    for (let i = 0; i < this.buckets.length; i++) {
      const currentBucket = this.buckets[i];
      
      if (!currentBucket.length) continue;

      currentBucket.forEach((entry) => {
        keys.push(entry);
      });
    }

    return keys;
  }

  get length() {
    return this.numberOfKeys;
  }
  
  get size() {
    return this.setSize;
  }
}

const hashSet = new CycloneHashSet('Setty', 16, 0.70);