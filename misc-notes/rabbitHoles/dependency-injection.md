## DI Containers vs. DI Parameters

### 1. Dependency Injection Using a Container

Let's use a simple dependency injection container in JavaScript without any external libraries.

```javascript
// Dependency Injection Container
class DIContainer {
  constructor() {
    this.services = {};
  }

  register(name, dependency) {
    this.services[name] = dependency;
  }

  resolve(name) {
    return this.services[name];
  }
}

// Services
class Logger {
  log(message) {
    console.log(message);
  }
}

class UserService {
  constructor(logger) {
    this.logger = logger;
  }

  createUser(name) {
    this.logger.log(`User ${name} created`);
  }
}

// Setup the DI Container
const container = new DIContainer();
container.register('logger', new Logger());
container.register('userService', new UserService(container.resolve('logger')));

// Resolve and use the service
const userService = container.resolve('userService');
userService.createUser('Alice'); // Output: User Alice created
```

**Explanation:**
- The `DIContainer` manages the registration and resolution of services.
- `UserService` depends on `Logger`, which is injected by the container when creating `UserService`.
- This approach decouples the creation and wiring of dependencies from the business logic.

### 2. Dependency Injection via Parameters

Here’s the same example but using direct parameter injection:

```javascript
// Services
class Logger {
  log(message) {
    console.log(message);
  }
}

class UserService {
  constructor(logger) {
    this.logger = logger;
  }

  createUser(name) {
    this.logger.log(`User ${name} created`);
  }
}

// Create instances manually
const logger = new Logger();
const userService = new UserService(logger);

// Use the service
userService.createUser('Bob'); // Output: User Bob created
```

**Explanation:**
- `Logger` and `UserService` are created manually and dependencies are injected directly through the constructor.
- This approach is simpler and more explicit, suitable for smaller applications or scenarios where you don’t need the flexibility of a DI container.

### Summary of Differences:
- **DI Container**:
  - Encapsulates the management of dependencies, useful in larger applications.
  - Allows for easy reconfiguration and testing by swapping out dependencies.
- **Parameter Injection**:
  - More straightforward and explicit, best for smaller apps or when you want full control over dependency injection.
  - Easier to understand and set up in simple scenarios.

Both methods achieve the same goal: decoupling the components of your application to make them more modular and testable.