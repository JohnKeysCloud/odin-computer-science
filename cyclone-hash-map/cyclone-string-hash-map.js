/**
 * Class representing a hash map designed to handle strings.
 */
class CycloneHashMap {
  constructor(capacity, loadFactor, name) {
    this.buckets = new Array(capacity).fill(null).map(() => []);
    this.loadFactor = loadFactor
    this.mapSize = capacity;
    this.name = name;
    this.numEntries = 0;
    
    /*
      ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
      │     // * Why not to use `this.buckets = new Array(capacity).fill([])`;                                               │
      │     // ? ⬆️ fills the array with references to the same array object.                                                │
      │                                                                                                                     │
      │     // ? This would mean that any modification to one of the array elements will be reflected across                  │
      │     // ? all elements because they all reference the saem object.                                                   │
      │                                                                                                                     │
      │     // ? For Example:                                                                                               │
      │                                                                                                                     │
      │     // ? Create an array with 3 elements, each supposedly an independent array                                      │
      │     // ? let arrayOfArrays = new Array(3).fill([]);                                                                  │
      │                                                                                                                     │
      │     // ? Add an item to the first array                                                                              │
      │     // ? arrayOfArrays[0].push("I'm in every array!");                                                              │
      │                                                                                                                     │
      │     // ? console.log(arrayOfArrays);                                                                                │
      │     // ? Output: [ [ "I'm in every array!" ], [ "I'm in every array!" ], [ "I'm in every array!" ] ]                │
      └─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
    */
  }

  // > --------------------------------------------------------------
  // > Private Methods

  /**
   * Returns `true` if all buckets are empty, else `false`.
   * @private
   * @returns {Boolean} The size of the list.
   */
  _checkIfAllBucketsEmpty() {
    if (this.buckets.every((bucket) => !bucket.length)) {
      console.log(`All buckets are empty in hash map: ${this.name}`);
      return true;
    }
    return false;
  }
  
  /**
   * Ensures that the index is within bounds of the map when mapping keys to buckets.
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
  _getBucketIndex(key) {
    const keyHashCode = this._hash(key);
    const goldenRatioConjugate = (Math.sqrt(5) - 1) / 2;
    const bucketIndex = Math.floor(this.size * (keyHashCode * goldenRatioConjugate % 1)); // ? multiplicative method

    this._checkIndex(bucketIndex);

    return bucketIndex;

    /*
      ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
      │     // 💭 Another, More Common Solution (…but not limited to):                                                      │
      │     // 💭 `h(k) % 2^p === h(k) & (2^p - 1)`                                                                         │
      │     // * This shows that modulo operation with powers of two can equivalently be performed by a bitwise AND with    │
      │     // * `2^p - 1`, which simplifies calculations and improves efficiency in certain environments.                    │
      │     // * const index = keyHashCode % this.size;                                                                     │  
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
   * Retrieves all keys or values.
   * @param {String} entryPart - "keys" or "values".
   * @returns {Array} Contains all keys or all values.
   */
  _getEntryParts(entryPart) {
    if (this._checkIfAllBucketsEmpty()) return [];

    if (entryPart !== 'keys' && entryPart !== 'values')
      throw new Error(`_getEntryParts only accepts "key" & "value" as arguments. You entered: ${entryPart}`);

    const indexOfEntryPart = (entryPart === 'keys') ? 0 : 1;

    let data = [];

    for (let i = 0; i < this.buckets.length; i++) {
      const currentBucket = this.buckets[i];
      if (!currentBucket.length) continue;

      currentBucket.forEach(entry => {
        data.push(entry[indexOfEntryPart]);
      });
    }
    return data;
  }

  /**
   * Dynamically grows map based on load factor and capacity.
   * @private
   */
  _growMap() {
    const clearEntriesNum = () => {
      this.numEntries = 0;
    }

    const oldEntries = this.buckets.entries;

    this.mapSize *= 2;
    this.buckets = new Array(this.mapSize).fill(null).map(() => []);

    clearEntriesNum();

    oldEntries.forEach(entry => {
      const [key, value] = entry;
      this.set(key, value);
    });
  }

  // > --------------------------------------------------------------
  // > Public Methods

  /**
   * Clears all entries in all buckets, while retaining current map size
   * @public
   * @returns {any}
   */
  clear() {
    this.buckets.forEach(bucket => bucket.length = 0);
    this.numEntries = 0;  // ? Reset the count of entries
    console.log(`Hash map: "${this.name}" has been cleared`);
  }

  /**
   * Retrieves the value associated with the given key in the hash map.
   * Returns null if the key does not exist in the hash map.
   * @public
   * @param {String} key - The key of the entry to retrieve.
   * @returns {String|null} The value associated with the key, or null if key not found.
   */
  get(key) {
    const bucketIndex = this._getBucketIndex(key);
    const matchedBucket = this.buckets[bucketIndex];

    for (let entry of matchedBucket) {
      const currentKey = entry[0];

      if (currentKey === key) {
        const entryValue = entry[1];

        return entryValue;
      }
    }

    return null;
  }

  /**
   * Checks buckets to see if map has an entry for passed `key`.
   * @public
   * @param {String} key - key of entry
   * @returns {Boolean} `true` if map has entry for passed `key`, else, `false`.
   */
  has(key) {
    const bucketIndex = this._getBucketIndex(key);
    const matchedBucket = this.buckets[bucketIndex];

    for (let entry of matchedBucket) {
      const currentKey = entry[0];

      if (currentKey === key) {
        return true;
      }
    }

    return false;
  }

  /**
   * Removes entry from map.
   * @public
   * @param {String} key - key of entry
   * @returns {Boolean} `true` if map has entry for passed `key`, else, `false`.
   */
  remove(key) {
    const bucketIndex = this._getBucketIndex(key);
    const matchedBucket = this.buckets[bucketIndex];

    for (let i = 0; i < matchedBucket.length; i++) {
      const currentKey = matchedBucket[i][0];

      if (currentKey === key) {

        // ? splice(start, numOfElementsToRemoveFromStart, ...itemsToAdd)
        matchedBucket.splice(i, 1);

        // ? Decrement number of entries.
        this.numEntries--;
        return true;
      }
    }

    return false;
  }

  /**
   * Sets value for given key. Overrides value if one exists. Grows map if load factor is reached.
   * @public
   * @param {String} key - key of entry
   * @returns {Boolean} `true` if map has entry for passed `key`, else, `false`.
   */
  set(key, value) {
    const overrideKeyValue = (currentBucket, newValue) => {
      for (let i = 0; i < currentBucket.length; i++) {
        if (currentBucket[i][0] === key) {
          currentBucket[i][1] = newValue;

          return true;
        }
      }
    };

    if (this.currentLoadFactor >= this.loadFactor) this._growMap();
  
    const bucketIndex = this._getBucketIndex(key);
    const matchedBucket = this.buckets[bucketIndex];

    // ? Override key value if key exists and return
    if (overrideKeyValue(matchedBucket, value)) return;

    // ? If the key does not exist, add a new key-value pair
    const entry = [key, value];
    matchedBucket.push(entry);

    this.numEntries++
  }

  // > --------------------------------------------------------------
  // > Getters

  get currentLoadFactor() {
    return this.numEntries / this.mapSize;
  }

  get entries() {
    if (this._checkIfAllBucketsEmpty()) return [];

    let entries = [];

    for (let i = 0; i < this.buckets.length; i++) {
      const currentBucket = this.buckets[i];

      if (!currentBucket.length) continue;

      currentBucket.forEach(entry => {
        entries.push(entry);
      });
    }
    return entries;
  }

  get keys() {
    return this._getEntryParts('keys');
  }

  get length() {
    return this.numEntries;
  }

  get size() {
    return this.mapSize;
  }

  get values() {
    return this._getEntryParts('values');
  }
}

const hashMap = new CycloneHashMap('Mappy', 16, 0.70);