## Pubsub

Let's explore a simple example of using the **Publish/Subscribe (Pub/Sub)** pattern to decouple I/O from views and program logic.

### **Scenario: User Click Event in a Web Application**

Imagine a scenario where you have a web application, and when a user clicks a button, data is fetched from an API, and the UI updates based on the fetched data.

### **Without Pub/Sub: Direct Coupling**
```javascript
// UI Button Click Handler
document.getElementById('fetchDataBtn').addEventListener('click', async () => {
  const data = await fetchDataFromAPI();
  updateUI(data);
});

// Function to fetch data from API
async function fetchDataFromAPI() {
  const response = await fetch('https://api.example.com/data');
  return response.json();
}

// Function to update the UI
function updateUI(data) {
  document.getElementById('dataContainer').textContent = JSON.stringify(data);
}
```

**Problems**:
- The button click event directly triggers the data fetching and UI update.
- The logic is tightly coupled; changes in one part (e.g., changing the data source or UI) require changes throughout.

### **With Pub/Sub: Decoupling Using Events**
In the Pub/Sub model, we decouple the logic by using events. The button click triggers an event, and separate parts of the application subscribe to handle the event.

#### **1. Setting Up the Pub/Sub System**
```javascript
// Simple Pub/Sub System
const pubSub = {
  events: {},
  subscribe: function(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  },
  publish: function(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
};
```

#### **2. Subscribing to Events**
```javascript
// Subscribe to 'dataFetched' event to update the UI
pubSub.subscribe('dataFetched', (data) => {
  updateUI(data);
});
```

#### **3. Publishing Events**
```javascript
// UI Button Click Handler
document.getElementById('fetchDataBtn').addEventListener('click', async () => {
  const data = await fetchDataFromAPI();
  pubSub.publish('dataFetched', data);  // Emit the 'dataFetched' event
});
```

#### **4. Reusable Functions**
```javascript
// Function to fetch data from API
async function fetchDataFromAPI() {
  const response = await fetch('https://api.example.com/data');
  return response.json();
}

// Function to update the UI
function updateUI(data) {
  document.getElementById('dataContainer').textContent = JSON.stringify(data);
}
```

### **Explanation**:
1. **Pub/Sub System**: 
   - We created a simple Pub/Sub system where functions can subscribe to events and be notified when those events are published.
   
2. **Decoupling**:
   - Instead of directly updating the UI inside the click handler, the handler fetches the data and publishes a `dataFetched` event.
   - The UI update logic is moved into a separate function that subscribes to the `dataFetched` event.

3. **Flexibility**:
   - The data fetching logic, UI update logic, and event handling are all decoupled.
   - This makes the code more maintainable, as changes to one part (like fetching data from a different API) do not require changes to the other parts.

### **In Summary**:
Using the Pub/Sub pattern allows you to decouple the interaction between different parts of your application. Events are emitted to signal that something has happened, and other parts of the app can react to these events without needing to know the specifics of what triggered them. This leads to more modular, maintainable code.