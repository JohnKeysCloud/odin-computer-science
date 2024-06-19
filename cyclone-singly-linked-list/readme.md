# Cyclone Linked List Class in JavaScript

## Overview
The `CycloneLinkedList` class provides a comprehensive implementation of a singly linked list in JavaScript. This class includes methods for standard linked list operations such as adding, removing, and querying nodes by their positions or values. Additionally, it maintains references to both the head and tail of the list, optimizing certain operations like appending nodes.

## Features
* Dynamic Size Adjustment: Automatically adjusts its size with each operations.
* Tail Reference Maintenence: Optimizes the appending of new nodes.
* Comprehensive Methods: Supports a wide range of operations including prepend, append, insert, delete & more.

## Installation
To use the `CycloneLinkedList` class in your project, simply include the `cyclone-linked-list.js` file in your project directory and import it into your script:

```javascript
import CycloneLinkedList from '.path/to/cyclone-linked-list.js';
```

## Usage

### Creating a CycloneLinkedList
To create a new instance of the `CycloneLinkedList` class, simply call the constructor with a name (required) for the list:

```javascript
const myList = new CycloneLinkedList('myList');
```

### Methods

#### appendNode(data)
Add a new node to the end of the list:

```javascript
myList.append(42);
```

#### prependNode(data)
Add a new node to the beginning of the list:

```javascript
myList.prepend('💭');
```

#### insertNodeAt(index)
Insert a new node at a specific index in the list:

```javascript
myList.insertNodeAt('🌊', 3); // Inserts '🌊' at index 3
```

#### removeNodeAt(index)
Remove a node at a specific index in the list:

```javascript
myList.removeNodeAt(3);
```

#### removeNodeByData(data) 
Remove the first node with a specific data value:

```javascript
myList.removeNodeByData(42);
```

#### getNodeAtIndex(index)
Retrieve the node at a specific index in the list:

```javascript
const node = myList.getNodeAtIndex(0); // Retrieves the `head` node
```

#### getNodeIndex(data)
Retrieve the index of the first node with a specific data value:

```javascript
const index = myList.getNodeIndex('💭');
```

#### getSize()
Retrieve the current size of the list:

```javascript
const size = myList.getSize();
```

#### getHead()
Retrieve the head node of the list:

```javascript
const head = myList.getHead();
```

#### getTail()
Retrieve the tail node of the list:

```javascript
const tail = myList.getTail();
```

#### contains(data)
Check if the list contains a node with a specific data value:

```javascript
const hasData = myList.contains('💭');
```

#### containsNode(data) 
Check if the list contains a specific node:

```javascript
const hasNode = myList.containsNode('💭');
```

#### pop() 
Removes the last node from the list and returns its data:

```javascript
const removedNodeData = myList.pop();
```

#### toString()
Returns a string representation of the list in the format:
'( value ) -> ( value ) -> ( value ) -> null'

```javascript
const listString = myList.toString();
```

### Complexity
The `CycloneLinkedList` class provides the following time complexity for its methods:

| Method                | Time Complexity |
|-----------------------|-----------------|
| appendNode(data)      | O(1)            |
| prependNode(data)     | O(1)            |
| insertNodeAt(index)   | O(n)            |
| removeNodeAt(index)   | O(n)            |
| removeNodeByData(data)| O(n)            |
| getNodeAtIndex(index) | O(n)            |
| getNodeIndex(data)    | O(n)            |
| getSize()             | O(1)            |
| getHead()             | O(1)            |
| getTail()             | O(1)            |
| contains(data)        | O(n)            |
| containsNode(data)    | O(n)            |
| pop()                 | O(n)            |
| toString()            | O(n)            |


## Contributing
Contributions to the `CycloneLinkedList` class are welcome! If you have any suggestions, improvements, or bug fixes, please submit a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details.