# npm (no capitals) - a short story

NPM is a package manager - a gigantic repository of plugins, libraries, and other tools, which provides us with a command-line tool we can use to install these tools (that we call "packages") in our applications. We will then have all oru installed packages' code locally, which we can import into our own files. We can even publish our own code to npm!

It does _not_ stand for "Node Package Manager". Google it. Chat GPT it. Whatever.

When changing the display of an HTML element from a `display` of `none` to a `display` of anything else, creating compliant (accessibility wise) animations for the transition was a bit tedious. So I created a package that simplified this process and included as many "best practices" as I could think of to solve this problem for front end developers who just wanted to be able to animate in-and-out elements in peace. 

Here is a package I created for that: ![display-stuff-ui](https://www.npmjs.com/package/display-stuff-ui).

Not 3 months later, CSS acquired the ability to animate in and out from a `display` of `none` natively. 

So that's great! -_- … Yay tech!

## `package.json` Scripts

An npm script is a convenient way to bundle common shell commands like a set of built-in and custom scripts for your project. They are typically commands or a string of terminal commands that help automate repetitive tasks.

In short, npm scripts are terminal commands that perform a set of actions.

### When you run an npm script

… Number one on its checklist is to check the package.json file to see if you have defined a value for that script. If a value matching the script tag is found, it then checks for two other versions of the same script, that is _"pre"_ and _"post"_ versions.

The creation of _"pre"_ and _"post"_scripts is easy. They are defined in the scripts section of the `package.json` with a matching name and adding "pre" or "post" to the beginning of them.

For example:

``` json
{
  "scripts": {
    "pretest": "echo 'Setting up before tests...'",
    "test": "echo 'Running tests...'",
    "posttest": "echo 'Cleaning up after tests...'"
  }
}
```

Running `npm test` will result in `pretest` running, followed by `test`, and lastly, `posttest`.

Writing such scripts can help automate and streamline your development process, ensuring that necessary tasks are performed at the correct stages of your workflow.

### Running Multiple Scripts in Parallel

1. Use `process.argv`: access command-line arguments within scripts.
  - `process.argv` ia an array in Node.js that contains the command-line arguments passed when running a script. The first two elements are always `node` and the script name, and any additional arguments are stored in subsequent elements. 

  Example:
``` javascript
  // my-script.js
  console.log(process.argv);
```

  If you run the script with `node my-script.js arg1 arg2`, the output would be as follows: `['node', 'my-script.js', 'arg1', 'arg2']`

  This means `process.argv[2]` will be `'arg1'` and `process.argv[3]` will be `'arg2'`. You can use these arguments within your script for various purposes, like conditional logic or passing data.

2. Run with Arguments: `npm run my-custom-script arg1 arg2`

  For Example:

  **The Script.**
```javascript
  // greet.js 

  // Extract the arguments from process.argv
  const args = process.argv.slice(2); // Removes the first two elements ('node' and 'script name')

  const name = args[0]; // First argument: name
  const age = args[1];  // Second argument: age

  // Check if both arguments are provided
  if (name && age) {
    console.log(`Hello, ${name}! You are ${age} years old.`);
  } else {
    console.log('Please provide both a name and age.');
  }
```

  **The Call:** 
```bash
  node greet.js John 30
```

  **The Output** 
  (If arguments are missing, the output will reflect this in its message)
```bash
  Hello, John! You are 30 years old.
```

3. Utilize npm-run-all: install the npm-run-all package: `npm install npm-run-all --save-dev`

4. Define a combined script:
``` json
  { 
    "parallel-tasks": "npm-run-all --parallel script1 script2" 
  } 
```

## Best Practices for Writing Package JSON Scripts

* **Keep it simple:** Break down complex tasks into smaller scripts.
* **Meaningful names:** Use descriptive names so the scripts purpose is understood.
* **Avoid hard-coding:** Store paths and values in environment variables.
* **Use dependencies:** Let npm handle installation instead of scripts.
* **Modularize scripts:** Extract reusable logic into separate functions.
* **Handle Errors:** Exit gracefully on failures for clear feedback.
* **Document it:** Add comments explaining what each script does.
* **Pre/post scripts:** Utilize them for setup/cleanup before/after main scripts.
* **Test scripts:** Ensure they behave as expected in different scenarios.
* **Review and refine:** Regularly maintain and improve you scripts.

## `package.json` vs `package.lock.json`

A `package.json` file contains the metadata about the project and the functional dependencies required by the application.

`package.lock.json` is created for locking the dependency with the version installed. It will install the precise latest version of that package in your application and save it in `package.json`.

### **`package.json`**
- **Purpose:** 
  - Lists your project’s direct dependencies (and some metadata like name, version, scripts, etc.).
  - Specifies version ranges for the dependencies (e.g., `"^1.2.3"` or `"~1.2.3"`), allowing some flexibility in which versions are installed.
  
- **Version Ranges:**
  - `"^1.2.3"`: Allows updates to any version `1.x.x` where `x` is the latest, but not a major version bump (`2.0.0`).
  - `"~1.2.3"`: Allows updates to the latest `1.2.x` version, but not `1.3.x`.
  - `"1.2.3"`: Locks exactly to version `1.2.3`.

### **`package-lock.json`**
- **Purpose:**
  - Ensures that your project installs the exact same versions of every dependency (and sub-dependency) across different environments.
  - Provides a detailed and complete dependency tree, including the exact versions of dependencies (and their dependencies) that were installed during the last `npm install`.

- **Locked Versions:**
  - Even if `package.json` specifies version ranges, the `package-lock.json` will lock in the exact versions that were actually installed.
  - It lists the resolved versions of all dependencies, including nested dependencies, ensuring consistent installs across different environments.

### **Why Both Are Necessary:**

1. **Flexibility vs. Consistency:**
   - **`package.json`** allows for flexibility in installing the latest compatible versions within the specified range.
   - **`package-lock.json`** ensures that once a version has been resolved (and installed), it remains consistent across all environments and installations. This prevents "works on my machine" issues.

2. **Reproducibility:**
   - **Without `package-lock.json`:** Two developers might get slightly different versions of dependencies even if they have the same `package.json`. This can lead to subtle bugs or inconsistencies between environments.
   - **With `package-lock.json`:** Both developers (or CI systems) will get exactly the same dependency versions, leading to more predictable and reproducible builds.

3. **Performance:**
   - **`package-lock.json`** speeds up the `npm install` process because npm doesn’t need to resolve versions for dependencies every time. It simply uses the already-resolved versions from the lock file.

4. **Security:**
   - Having a lock file helps in auditing dependencies for security vulnerabilities since the exact versions are known and locked down.

### **Example:**
- If `package.json` has `"lodash": "^4.17.0"`:
  - On one machine, it might resolve to `4.17.10`.
  - On another, it might resolve to `4.17.20` if a newer patch version was published after the first install.
- With a `package-lock.json`, both machines will install the exact same version (e.g., `4.17.10`), ensuring consistency.

### **In Summary:**
- **`package.json`** defines the general structure and version ranges of your dependencies.
- **`package-lock.json`** ensures that every installation of your project gets the exact same versions of dependencies, which is crucial for consistency, reproducibility, and stability across different environments.

## Production

In _development_ we want strong source mapping and a localhost server with live reloading or hot module replacement. 

In _production_ our goals shift to a focus on minified bundles, lighter weight source maps, and optimized assets to improve load time. 

With this logical separation at hand, we typically recommend writing **separate Webpack configurations** for each environment. Also, keep in mind that we don't want to repeat ourselves (DRY). So when we are separating the production and development specific bits out, it is best to maintain a "common" configuration. 

In order to merge these configurations together, we'll use a utility called `webpack-merge`. With the "common" configuration in place we won't have to duplicate code within the environment-specific configurations.