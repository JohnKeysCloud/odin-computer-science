## Consumable Packages
If we are creating a module for consumption written with ESM, we best provide a legacy version, CJS.

This is what our setup might look like.

### Project Structure

```
my-library/
├── dist/
│   ├── index.cjs.js
│   ├── index.esm.js
├── package.json
```

### Module Files

#### dist/index.cjs.js (CommonJS Version)
```js
// dist/index.cjs.js
const greet = (name) => {
  return `Hello, ${name}! (from CommonJS)`;
};

module.exports = { greet };
```

#### dist/index.esm.js (ESM Version)
```js
// dist/index.esm.js
export const greet = (name) => {
  return `Hello, ${name}! (from ES Module)`;
};
```

### package.json

Here's how the `package.json` file would look:

```json
{
  "name": "my-library",
  "version": "1.0.0",
  "main": "dist/index.cjs.js",
  "module": "dist/index.esm.js",
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.cjs.js"
    }
  }
}
```

### Explanation

- **main**: Points to the CommonJS version of the module.
- **module**: Points to the ES Module version of the module.
- **exports**: Defines how the module should be resolved based on the environment:
  - **import**: Points to the ES Module version, used by tools that support ES Modules.
  - **require**: Points to the CommonJS version, used by Node.js or other CommonJS environments.

### Usage

Consumers of your library can import it as follows:

#### Using ES Modules
```js
import { greet } from 'my-library';

console.log(greet('World')); // Output: Hello, World! (from ES Module)
```

#### Using CommonJS
```js
const { greet } = require('my-library');

console.log(greet('World')); // Output: Hello, World! (from CommonJS)
```

By setting up your module this way, you ensure that it can be correctly consumed in both ES Module and CommonJS environments, leveraging the `exports` field for precise control over module resolution.