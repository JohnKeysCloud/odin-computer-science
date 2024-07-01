# Memory  

## Hierachy Design

1. **CPU Registers**
… are small, high-speed memory units located in the CPU. They are used to store the most frequently used data and instructions. They often have the fastest access time and the smallest storage capacity typically ranging from 16 to 64 bits.

---

2. **Cache Memory**
… is a small, fast memory unit located close to the CPU. It stores frequently used data and instructions that have been recently accessed from the main memory. Cache memory is designed to minimize the time it takes to access data by providing the CPU with quick access to frequently used data.

---

3. **Main Memory**
… also known as RAM (Random Access Memory), is the primary memory of a computer system. It has larger storage capcity than cache memory, but it is slower. Main memory is used to store data and instructions that are currently in use by the CPU.

**Types of Main Memory** :

- _Static RAM (SRAM)_: stores the binary information in flip flops and information remains valid until power is supplied. It has faster access time and is used in implementing cache memory.
  - _Flip-flops_ in this context are basic memory circuits that can store one bit of binary data... 0 or 1. They are called flip-flops because they can "flip" to a high state (1) or "flop" to a low state (0). These circuits are fundamental building blocks in digital systems and are used extensively in memory devices, among other applications.

- _Dynamic RAM_: stores the binary information as a charge on the capcitor. It requires refreshing circuitry to maintain  the charge on the capcitors after a few milliseconds. It contains more memory cells per unit area as compared to SRAM.

---

4. **Secondary Storage**
… such as hard disk drives (HDD) and solid-state-drives (SSD), is a non-volatile memory unit that has a larger storage capacity than main memory. It is used to store data and instructions that are not currently in use by the CPU. Secondary storage has the slowest access time and is typically the least expensive type of memory in the memory hiearchy.

read more: https://www.geeksforgeeks.org/difference-between-hard-disk-drive-hdd-and-solid-state-drive-ssd/ 

---

5. **Magnetic Disks**
… are simply circular plates that are fabricated with either a metal, plastic or magnetized material. The magnetic disks work at a high speed inside the computer and these are frequently used.

---

6. **Magnetic Tape**
… is simply a megnetic recording device that is covered with a plastic film. It is generally used for the backup of data. In ths case of a magnetic tape, the access time for a computer is a kuttle slower and therefore, it requires some amount of time for accessing the strip.

---

### Primary Memory (#3)

Primary storage or memory is also known as the main memory, which is the part of the computer that stores current data, programs, and instructions. 

It is stored in the motherboard… which allows the data to and from primary storage to be read and written at a very good pace.

It is a segment of computer memory that can be accessed directly by the processor.
In a hierachy of memory, access time to primary memory is quicker than access time to secondary memory… but slower than cache memory.

---

## Characteristics of Memory Hierarchy

* Capacity: it is the global volume of information the memory can store. As we move from top to bottom in the Hierarchy, the capcity increases.

* Access time: it is the time interval between the read/write request and the availability of the data. As we move from top to bottom in the Hierarchy, the acces time increases.

* Performance: Earlier when the computer system was designed without a Memory Hierarchy design, the speed gap increased between the CPU registers and Main Memory due to a large difference in access time. This results in lower performance of the system and thus, enhancement was required. This enhancement was made in the form of Memory Hierarchy design. One of the most significant ways to increase system performance is minimizing how far down the memory hierarchy one has to go to manipulate data.

* Cost per bit: as we move from bottom to top in the Hierarchy, the cost per bit increases i.e. internal memory is costlier than external memory.

---

## Advantages of Memory Hierarchy

* It helps in removing some destruction, and managing the memory in a better way.
* It helps in spreading the data all over the computer ssytem.
* It saves the consumer's price and time.

---

## Word/Register Size
* **Word Size**: the number of bits that can be transferred to and from memory in one operation… or "the system processes data and addresses memory locations using this number of bits at a time."
  - 32-bit systems: 4 bytes
  - 64-bit systems: 8 bytes

### "Key fits into a single word"
In the context of data structures or algorithms, a "key" is often a piece of data used in operations like searching, sorting, or hashing. 
Saying that a key "fits into a single word" means that the key can be stored or processed in a single machine word/register (e.g., 32 bits or 64 bits).

The "word" of a machine/processor/CPU determines several important aspects:

 * _Data Handling_: How much data the CPU can handle at one time.
 * _Memory Addressing_: How much memory the CPU can address directly. For example, a 32-bit CPU can directly address up to 4 GB of memory. 4gb is the theoretical limit of a 32-bit system.
  - Each bit in a binary system can represent two states (0 or 1). With 32 bits, you can represent 2^32 different states/numbers, which is equal to 4,294,967,296 distinct values… which when expressed in bytes (since each byte is the basic addressable memory unit in most systems), equals 4 gigabytes. Hence, a 32-bit system can directly address 4 GB of memory where "directly addressable" means that the CPU can access any part of this memory range using a single, direct memory addresss without needing aditional tricks or methods to reach more memory. This addressing limitation is a hardware limitation and is not related to the operating system or software. As the demand for processing more data and using larger memory sizes increased, 64-bit systems were introduced. A 64-bit system can theoretically address up to 18.4 million terabytes of memory, or 16 exabytes. This is a huge increase compared to the 4 GB limit of 32-bit systems and has allowed for much larger memory sizes in modern computers.

- If a key fits into a single word, the time complexity of a hash table operation is O(1).
- If a key does not fit into a single word, the time complexity of a hash table operation is O(n).

💭 Bit Conversion:
  - 1 bit = 0.125 bytes
  - 1 byte = 8 bits
  - 1 kilobyte (KB) = 1024 bytes
  - 1 megabyte (MB) = 1024 KB
  - 1 gigabyte (GB) = 1024 MB
  - 1 terabyte (TB) = 1024 GB
  - 1 petabyte (PB) = 1024 TB
  - 1 exabyte (EB) = 1024 PB
  - 1 zettabyte (ZB) = 1024 EB
  - 1 yottabyte (YB) = 1024 ZB
  
If a machine has a 32-bit word size, it can transfer 32 bits at a time. This means that the machine can transfer 4 bytes at a time. If a machine has a 64-bit word size, it can transfer 64 bits at a time. This means that the machine can transfer 8 bytes at a time.