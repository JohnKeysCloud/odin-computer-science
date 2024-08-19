## Event Propagation

When an event occurs in the DOM, it goes through three phases:

1. **Capturing Phase**: The event starts from the root of the DOM tree and moves down to the target element.
2. **Target Phase**: The event reaches the target element.
3. **Bubbling Phase**: The event bubbles up from the target element back to the root.

### `useCapture` Argument

- **`true`**: The event listener is attached to the capturing phase. The listener will be invoked as the event travels down the DOM tree from the root to the target element.
  
- **`false`** (default): The event listener is attached to the bubbling phase. The listener will be invoked as the event bubbles up from the target element to the root.

### When Events Take Place

- If `useCapture` is `true`, the event listener will handle the event **before** it reaches the target element during the capturing phase.
- If `useCapture` is `false`, the event listener will handle the event **after** it reaches the target element during the bubbling phase.

### Example

#### HTML Structure

```html
<body>
  <form name="bmi">
    <button type="submit">Submit</button>
  </form>
</body>
```

#### Event Listeners

Let's add event listeners to the body, form, and button:

```javascript
document.body.addEventListener('click', () => console.log('Body listener (capture)'), true);
document.body.addEventListener('click', () => console.log('Body listener (bubble)'), false);

const form = document.querySelector('form[name=bmi]');
form.addEventListener('click', () => console.log('Form listener (capture)'), true);
form.addEventListener('click', () => console.log('Form listener (bubble)'), false);

const button = form.querySelector('button');
button.addEventListener('click', () => console.log('Button listener (capture)'), true);
button.addEventListener('click', () => console.log('Button listener (bubble)'), false);
```

When you click the button, the output will be:

```
Body listener (capture)   // Capturing phase: from root to target
Form listener (capture)
Button listener (capture)
Button listener (bubble)  // Bubbling phase: from target back to root
Form listener (bubble)
Body listener (bubble)
```


### Practical Scenarios for `useCapture: true`

1. **Preventing Event Handling on Child Elements**:
   If you want to prevent child elements from handling an event, you can stop the event during the capturing phase.

```javascript
    document.body.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevents event from reaching child elements
    }, true);
```

2. **Event Delegation**:
   When implementing event delegation, you might want to handle the event as it travels down the DOM tree to ensure the parent element can intercept it before any child elements do.

```javascript
   document.querySelector('.parent').addEventListener('click', (event) => {
     // Handle the event during capturing phase
   }, true);
```

   See: ![Event Delegation](./supplement-event-delegation.md)

   

3. **Modifying Event Properties**:
   If you need to modify properties of the event object before any other event listeners get a chance to process it, handling the event during the capturing phase can be beneficial.

```javascript
   document.addEventListener('click', (event) => {
     event.customProperty = 'customValue'; // Modify the event object
   }, true);
```

4. **Specific Use Cases in Libraries**:
   Some libraries or frameworks might require capturing phase event handling to properly manage their internal event flow and ensure certain actions occur before others.

5. **Global Event Handlers**:
   For global event handlers that need to catch events early in the propagation process, capturing phase handling can ensure they run before any element-specific handlers.

### Example

Consider a scenario where you have a nested structure and you want to ensure that a certain action happens before any nested element can handle the click event:

```html
<body>
  <div class="outer">
    <div class="inner">
      Click me
    </div>
  </div>
</body>
```

```javascript
document.body.addEventListener('click', (event) => {
  console.log('Body capturing');
}, true);

document.querySelector('.outer').addEventListener('click', (event) => {
  console.log('Outer capturing');
}, true);

document.querySelector('.inner').addEventListener('click', (event) => {
  console.log('Inner capturing');
}, true);

document.querySelector('.inner').addEventListener('click', (event) => {
  console.log('Inner bubbling');
}, false);

document.querySelector('.outer').addEventListener('click', (event) => {
  console.log('Outer bubbling');
}, false);

document.body.addEventListener('click', (event) => {
  console.log('Body bubbling');
}, false);
```

When you click on the "inner" div, the output will be:

```
Body capturing
Outer capturing
Inner capturing
Inner bubbling
Outer bubbling
Body bubbling
```

### Summary

- **Attaching Event Listener**: The `useCapture` argument specifies whether the event listener is attached for the capturing phase or the bubbling phase.
- **Invoking Event Listener**: The `useCapture` argument also determines when the event listener is invoked during event propagation:
  - **Capturing Phase (`true`)**: The listener is invoked as the event travels down from the root to the target element.
  - **Bubbling Phase (`false`)**: The listener is invoked as the event travels up from the target element to the root.

In most cases, the default bubbling phase (`false`) is used because it allows the event to be handled after it has reached its target element. The capturing phase (`true`) is useful in specific scenarios where you need to handle the event before it reaches the target element.

Using `useCapture: true` is beneficial when:

- You need to intercept an event before it reaches its target.
- You want to prevent certain elements from handling the event.
- You need to modify the event object early in the event propagation process.
- Certain libraries or frameworks require it for their event management.
- Implementing specific patterns like event delegation or global event handling.

In general, `useCapture: true` is less commonly used than the default bubbling phase (`useCapture: false`), but it is crucial in specific scenarios where early intervention in the event propagation process is necessary.