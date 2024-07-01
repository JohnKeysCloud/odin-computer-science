# Checksum
A checksum is a value that is computed from a data set to detect errors or verify data integrity.
It is typically used in digital data to ensure that the data has not ebeen altered or corrupted.
The checksum is calculated using a specific algorithm, such as CRC (Cyclic Redundancy Check), MD5, or SHA (Secure Hash Algorithm), and it produces a fixed-size string of characaters that uniquely represents the data set.

## How it works:
  1. **Calculation** - a checksum algorithm processes the original data and produces a check sum value.
  2. **Transition/Storage** - the checksum value is stored or transmitted along with the data.
  3. **Verification** - when the data is retreived or received, the same checksum algorithm is used to calculate a new checksum from the recieved data.
  4. **Comparison** - the new checksum is compared with the original checksum. If they match, the data is considered intact. If they don not match, the data may have been altered or corrupted.

## Example Use Cases:
  * **Data transmission** - ensuring data integrity during transmission over networks.
  * **File Storage** - verifying the integrity after download or storage.
  * **Version Control** - identifying changes in file content in version control systems like Git.

## Example:
If you have a file with the content "Hello, world!" and you calculate its checksum using a simple algorithm, you might get a checksum value like `fc3ff98e8c6a0d3087d515c0473f8677`. If even a single character in the file changes, the checksum will change significantly, alerting you to the modification.

In the context of Git, each commit has a unique SHA-1 hash, which acts as a checksum to ensure the integrity and uniqueness of the commit's contents.