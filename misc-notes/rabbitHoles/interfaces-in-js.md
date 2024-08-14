# Interfaces in JavaScript

Since JavaScript doesn't have built-in support for interfaces as in some other languages like TypeScript or Java, developers often use other patterns to achieve similar functionality. Here are some common approaches:

### 1. **Duck Typing**
JavaScript uses duck typing, which means that if an object has the necessary methods and properties, it's considered to satisfy an interface. This is the simplest and most flexible way to implement interface-like behavior.

```javascript
function makePayment(processor, amount) {
  if (typeof processor.processPayment !== 'function') {
    throw new Error('Processor must implement processPayment method');
  }
  processor.processPayment(amount);
}

const paypalProcessor = {
  processPayment(amount) {
    console.log(`Processing ${amount} through PayPal`);
  }
};

makePayment(paypalProcessor, 100);
```

### 2. **Object Literals**
You can define an interface as an object literal that holds the required method signatures. This doesn’t enforce anything at runtime but can serve as a contract that other developers follow.

```javascript
const PaymentProcessorInterface = {
  processPayment: function(amount) {}
};

const stripeProcessor = {
  processPayment(amount) {
    console.log(`Processing ${amount} through Stripe`);
  }
};

// Optionally, you can create a function to enforce the "interface"
function enforceInterface(obj, interface) {
  for (let key in interface) {
    if (typeof obj[key] !== 'function') {
      throw new Error(`Object does not implement the ${key} method`);
    }
  }
}

enforceInterface(stripeProcessor, PaymentProcessorInterface);
stripeProcessor.processPayment(100);
```

### 3. **Mixins**
Mixins allow you to add methods from one object to another. They can be used to implement shared behavior among objects, akin to implementing an interface.

```javascript
const PaymentProcessorMixin = {
  processPayment(amount) {
    throw new Error('Must implement processPayment');
  }
};

function applyMixin(target, mixin) {
  Object.assign(target, mixin);
}

const bitcoinProcessor = {};
applyMixin(bitcoinProcessor, PaymentProcessorMixin);

bitcoinProcessor.processPayment = function(amount) {
  console.log(`Processing ${amount} through Bitcoin`);
};

bitcoinProcessor.processPayment(100);
```

### 4. **Protocols (via Symbols)**
A more advanced approach is to use Symbols to define "protocols" that objects must implement.

```javascript
const PaymentProtocol = Symbol('PaymentProtocol');

const paymentProcessor = {
  [PaymentProtocol]: true,
  processPayment(amount) {
    console.log(`Processing ${amount} through some processor`);
  }
};

function processPaymentIfValid(obj, amount) {
  if (!obj[PaymentProtocol]) {
    throw new Error('Object does not implement PaymentProtocol');
  }
  obj.processPayment(amount);
}

processPaymentIfValid(paymentProcessor, 100);
```

### 5. **TypeScript Interfaces (when using TypeScript)**
If you're using TypeScript, you can use the `interface` keyword to define explicit interfaces.

```typescript
interface PaymentProcessor {
  processPayment(amount: number): void;
}

class StripeProcessor implements PaymentProcessor {
  processPayment(amount: number) {
    console.log(`Processing ${amount} through Stripe`);
  }
}

const processor: PaymentProcessor = new StripeProcessor();
processor.processPayment(100);
```

### 6. **Functional Interfaces**
You can enforce an interface through higher-order functions by requiring specific methods to be passed as arguments.

```javascript
function createPaymentProcessor({ processPayment }) {
  return {
    processPayment
  };
}

const squareProcessor = createPaymentProcessor({
  processPayment: (amount) => {
    console.log(`Processing ${amount} through Square`);
  }
});

squareProcessor.processPayment(100);
```

### Summary
- **Duck Typing**: Assume objects have the necessary methods.
- **Object Literals**: Define a contract as an object literal.
- **Mixins**: Apply shared behavior to objects.
- **Protocols (Symbols)**: Use symbols to define protocols.
- **TypeScript Interfaces**: Use the `interface` keyword in TypeScript to define a contract that classes must follow. TypeScript enforces this contract at compile-time. 
  - **Missing Method Implementation**: If a class claims to implement an interface but does not provide an implementation for a required method (e.g., `processPayment`), TypeScript will generate a compile-time error, stating that the method is missing in the class.
  - **Using a Non-Implementing Class/Object**: If an object or class instance that does not implement the required interface is assigned to a variable typed with that interface, TypeScript will generate a compile-time error. This error will indicate that the required method (e.g., `processPayment`) does not exist in the non-implementing class or object.
- **Functional Interfaces**: Pass methods as parameters to enforce behavior.

Each of these methods has its use cases, and the choice depends on your specific needs and the level of enforcement you want to achieve.