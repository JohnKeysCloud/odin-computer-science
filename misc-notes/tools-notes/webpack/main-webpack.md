# Webpack - Intermediate

## Bundling

With bundling the same concepts of entry points and dependency graphs apply: we provide the bundler with an entry point. It then builds a dependency graph from that file, combines all relevant files together, and then outputs a single file with all the necessary code included.

During this process we can do a whole bunch of other stuff, such as minifying our code (in a nutshell,removing all unnecessary characters from the source code without changing its functionality), image optimizations, or even "tree shaking" (which, in shell containing nuts, describes the removal of dead code. Code not used by our programs).

### Import file extensions

Normally, with ESM, we need to specify file extensions when we import from other files (e.g. "./greeting.js"). With Webpack and many other bundlers, some file extensions like .js are optional, as Webpack will automatically check extensionless file paths for .js files by default (e.g. "./greeting").

This is a feature of Webpack, not ESM.

In this lesson, examples with imports will always include the file extension where appropriate to be explicit.

I personally, also vouch for always including the extensions as Webpack won't be around forever and it's best to rely on the fundamentals in such scenarios. 

## Basic Webpack Configuration

``` javascript
// webpack.config.js in CommonJS syntax
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // empties out dist each time we run Webpack to bundle (keeps dist clean)
  },
};
```

## Webpack Configuration for CSS

``` bash
npm install --save-dev style-loader css-loader
```

`css-loader` will read any CSS files we import in a JavaScript file and store the result in a string. `style-loader` then takes that string and actually adds the JavaScript code that will apply those styles to the page. Therefore, we need both.

With these loaders in place, we can create our CSS files in our `src` folder, write our styles, and `import` them as a _side effect import_ since said loaders will handle everything for us. A side effect import runs the module's global code, but doesn't actually import any values. 

### 💡 Loader order in Webpack Configurations
Notice how we put css-loader at the end of the array. We must set this order and not the reverse.

Webpack will run the loaders starting at the end, so we want it to read the CSS file into a string with css-loader first, then use style-loader to inject the JavaScript that applies the CSS in that string to the page. It wouldn’t work the same the other way round.

## Loading Images with Webpack
💭 I'm leaning more toward the use of Content Delivery Networks to manage and serve assets like images, CSS, and JavaScript files. As they improve performance and scalability of web applications by distributing content across multiple serves worldwide, which helps in reducing latency and load times. I suppose a hybrid approach makes the most sense where critical assets (like essential JS and CSS files) are bundled via Webpack, while larger or less frequently used assets (like images, videos, or fonts) are served via a CDN. This gives us the best of both worlds: efficient asset management during development and optimized delivery in production.

If we have any local image file we want to include within our website, they require a little extra configuration since they're not JavaScript files.

There are three different ways  you could be dealing with local image files:

1. **Image files used in our CSS inside url()**
  - `css-loader` handles this for us so there's nothing extra to do for image paths in CSS.

2. **Image files we reference in our HTML template, e.g. as the `src` of an `<img>`**
  - We need to install and tell Webpack to use something called `html-loader`, which will detect image file paths in our HTML template and load the right image files for us. Without this, `./odin.png` would just be a bit of text that will no longer reference the correct file one we run Webpack to build into `dist`:

``` bash
  npm install --save-dev html-loader
```
``` javascript
  // webpack.config.js
  // Add this to the `module.rules` array
  {
    test: /\.html$/i,
    loader: "html-loader",
  }
```

3. **Images we use in our JavaScript, where we will need to import the files**

  - If we need to use a local image file in our JavaScript (such as when manipulating the DOM to create or edit `img` elements and set their `src` attribute), we need to import the images into our JavaScript module. Since images aren't JavaScript, we need to tell Webpack that these files will be assets by adding an `asset/resource` rule. No need to install anything here. Just add the following object to the `modules.rules` array within `webpack.config.js`:

``` javascript
  // webpack.config.js
  {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  }
```
  Of course, you can always edit the regex in the `test` property to remove any file extensions you don't need or add any that you do. 

  Then, in whatever JavaScript module we want to use that image in, we just have to default import it:

``` javascript
  import odinImage from "./odin.png";
   
  const image = document.createElement("img");
  image.src = odinImage;
   
  document.body.appendChild(image);
```

  We have to import it so that the `odinImage` variable contains the correct file path, even when we bundle into `dist`. If we just wrote `image.src = './odin.png';`. then the "file path" would just be a plain string. When we bundle into `dist`, Webpack will not magically recognize that this string in our JavaScript references a file and so will not include it in the bundle. 

  When we import it and set the correct `asset/resource` rule, Webpack will recognize the import, include the image file when we bundle, and also make sure that the imported variable contains the correct file path at the end.

### Webpack Configured for the Various Asset Injections

``` javascript
// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
```

When images are included in bundling, the output image file in `dist` has a different file name (it will likely be some jumble of numbers and letters). By default. Webpack gives your bundled image files a new name by hashing their contents. You do not need to know how this works, nor do you need to dig into the details of why, nor how to change it. You just need to be aware that this is expected behavior (_it's to do with preventing issues with the browser cache and matching file names_). Do a deep dive if you want, I'm a professional scuba diver at this point.

#### 💡 You only need to configure what you need

You may not need everything we've mentioned. If your project doesn't have images with local file path sources in your HTML template, you do not need `html-loader` set up. If you aren't using any local images in your JavaScript, you won't need the image `asset/resource` rule set up.

Similarly, in the future, you may end up working with things that need a special loader or plugin, such as custom fonts or preprocessors. You can always use Google or reference Webpacks documentation for instructions on what you'd need when that time comes.

### Webpack dev server

``` bash
npm install --save-dev webpack-dev-server
```

It works by bundling your code behind the scenes (as if we ran `npx webpack`, but without saving the files to `dist`), and it does this every time you save a file that's used in the bundle. We can also use something called a **source map** so that any error messages reference files and lines from our development code and not the jumbled mess inside our single bundled `.js` file.

### Webpack Configuration Templating

Each time you set up a new project with Webpack, you may have to look at what you configured before to copy and paste the configuration you want to reuse. You may have also noticed that whenever you create a new repository on GitHub, there is an option near the top for a _Repository template_.


### Source Mapping

- **`inline-source-map` {1}** (Development Configuration):
  - Embeds the entire source map as a data URL in the bundled file.
  - Faster rebuilds and easier debugging since everything is in one place.
  - Ideal for development as it keeps everything together, but increases the bundle size.

- **`source-map` {2}** (Production Configuration):
  - Generates external `.map` files that map the minified code back to the original source code.
  - Keeps production bundle size smaller by separating the source map.
  - Slower to generate, but better for debugging production issues without exposing source code directly in the bundle.

Using `inline-source-map` in development provides quick and easy access to source maps, while `source-map` in production offers a balance between keeping the bundle small and enabling post-deployment debugging.

---

**{1}**
When you use `inline-source-map`, the source map is embedded directly into the output file (e.g., the JavaScript bundle) as a **data URL**. Here’s what that means:

- **Source Map**: A file that maps the minified or transpiled code back to the original source code, enabling developers to debug their code in the browser using the original source code.

- **Data URL**: A URL that contains the data within the URL itself, rather than pointing to an external file. For example, instead of linking to a separate file, the data is included directly in the URL.

- **Embedded Source Map**: In the context of `inline-source-map`, the entire source map is converted to a base-64-encoded string and included directly in the bundled JavaScript file. This string is placed in a special comment at the end of the file, like so:

```javascript
  //# sourceMappingURL=data:application/json;base64,eyJ2ZX...
```

- **Effect**: This allows the browser to access the source map directly from the bundled file, making it easy to debug without needing to fetch a separate `.map` file. However, it increases the size of the bundled file since the source map is embedded within it.

**{2}**
With the `source-map` option, the source maps are stored as separate `.map` files in the output directory specified in your Webpack configuration, typically the `dist` folder.

A `.map` file is a JSON file that contains mappings between the minified/compiled code and the original source code. Here's a simplified example:

```json
{
  "version": 3,
  "file": "bundle.js",
  "sources": ["webpack:///src/index.js", "webpack:///src/utils.js"],
  "names": ["myFunction", "myVar"],
  "mappings": "AAAA,MAAM,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC",
  "sourceRoot": ""
}
```

- **`version`**: The version of the source map format.
- **`file`**: The name of the bundled file.
- **`sources`**: The original source files.
- **`names`**: The variable and function names.
- **`mappings`**: Encoded information that maps positions in the minified code to the original code.

When debugging in the browser's developer tools, if source maps are enabled and available:

- The browser automatically loads the `.map` files when you open the developer tools.
- Instead of seeing minified code, you'll see the original source code in the Sources tab of the developer tools.
- Errors will appear as if they occurred in the original source code, with correct line numbers and context.

When source maps are correctly configured and loaded, the debugging experience is very similar regardless of whether you use `source-map` (standalone files) or `inline-source-map` (embedded). The main difference lies in how and where the source map data is stored and retrieved. 

- **`source-map`**: Errors and stack traces refer to the original source code using the standalone `.map` files.
- **`inline-source-map`**: The source map is part of the bundled JavaScript file, but the debugging experience is otherwise identical. 

Both allow you to debug the original code with accurate line numbers and source code references.

### Production Mode in Configuration

When the `mode` in our Webpack configuration file is set to `production`, `TerserPlugin` is loaded. It also enables tree shaking among other things.

**`TerserPlugin`:**
When the mode is set to "production" in Webpack, `TerserPlugin` is automatically enabled as part of the optimization process. It _minifies_ the JavaScript code by:

1. **Removing unnecessary whitespace, comments, and code**: This reduces the size of the JavaScript files.
2. **Merging and simplifying code**: It combines similar code blocks and removes redundant code, improving performance.
3. **Renaming variables and functions**: It shortens variable and function names to reduce file size further.

Overall, `TerserPlugin` optimizes the JavaScript output, making it smaller and more efficient for production use.

**Tree Shaking**
Tree Shaking is the process of eliminating unused or dead code from the final bundle. It analyzes the dependency graph of the modules to determine which parts of the code are actually used and removes the rest. This results in smaller and more efficient bundles by excluding unnecessary code.

#### Other Things in `production`
1. **Tree Shaking**: Unused code is removed from the final bundle. This is a result of the `sideEffects` flag in your `package.json` and the use of `import` and `export` statements.

2. **Code Splitting**: Webpack optimizes code splitting, which can improve loading times by splitting your code into smaller chunks that can be loaded on demand.

3. **Module Concatenation**: `ModuleConcatenationPlugin` (also known as scope hoisting) is enabled, which combines modules to reduce the overhead of module loading and improves execution speed.

4. **Optimized Build Performance**: Various optimizations are performed to improve build performance, such as caching and parallel processing.

5. **Environment Variables**: `process.env.NODE_ENV` is set to `'production'`, which can be used by libraries (like React) to enable production-specific optimizations (e.g., removing development-only warnings).

6. **Production Defaults**: Webpack uses production-specific defaults for configuration settings, such as disabling detailed debugging features and enabling optimizations that are not suitable for development.

In summary, setting `mode` to `'production'` configures Webpack to produce a highly optimized, efficient build with reduced file sizes and improved runtime performance.

### Development Mode in Configuration
When you set `mode` to `'development'` in Webpack, it configures Webpack to optimize for the development experience rather than production. Here's a concise list of what `development` mode does:

1. **Source Maps**: It enables detailed source maps (usually `inline-source-map`), making it easier to debug by mapping the bundled code back to the original source code.

2. **Unminified Code**: The code is not minified, preserving readability and making debugging easier.

3. **Hot Module Replacement (HMR)**: It enables HMR for live reloading, allowing changes to be applied without a full page reload.

4. **No Tree Shaking**: It does not perform tree shaking, meaning all code, including unused code, is included in the bundle. This helps in debugging but increases the bundle size.

5. **Verbose Logging**: Development mode often provides more detailed logging and error messages to aid in debugging.

6. **Development Defaults**: Webpack uses development-specific defaults for configuration settings, such as optimizing for build speed and not enabling optimizations that might impact debugging.

7. **No Code Minification**: It does not use minification plugins like `TerserPlugin`, keeping the code readable and making it easier to trace errors.

8. **Environment Variables**: `process.env.NODE_ENV` is set to `'development'`, which can be used by libraries to enable development-specific features (e.g., verbose logging, warnings).

In summary, setting `mode` to `'development'` configures Webpack to produce a build optimized for development, focusing on fast builds, detailed debugging, and live reloading, rather than optimized code size and performance.