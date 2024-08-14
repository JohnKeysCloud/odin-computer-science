import { orderTotal } from './vat.js';

describe('orderTotal', () => {
  let order;

  // Mocks the global `fetch` function once before all tests run.
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  // Initializes the `order` object before each test to ensure a fresh instance is used.
  // This avoids potential side effects between tests.
  // (i.e., if one test modified the object, it would remain modified in other tests.)
  beforeEach(() => {
    order = {
      country: 'DE',
      items: [
        { price: 10, quantity: 2 },
        { price: 5, quantity: 3 }
      ]
    };
  });

  // Clears the mock state after each test to prevent interference between tests.
  afterEach(() => {
    fetch.mockClear();
  });

  // Since the test function is asynchronous, Jest waits for all the `await` statements to complete before the test. If it weren't asynchronous, Jest might finish running the test before the asynchronous code inside `orderTotal` (or any other awaited function) has a chance to complete, leading to false positives or negatives in test results
  test('fetch is called with the correct URL', async () => {
    // Jest method used to simulate the resolution of a promise
    fetch.mockResolvedValueOnce({
      // Since the test function uses `await` to wait for asynchronous operations to complete,
      // we need to ensure that the mocked `fetch` returns a resolved promise with a specific value.
      // `mockReturnValue`, returns a fixed value immediately which isn't suitable for promises.
      // This means it won't mimic the asynchronous behavior of `fetch`.
      // `mockResolvedValueOnce` ensures that when the `orderTotal` awaits the promise returned by `fetch`,
      // it receives the correct data. We also await the response.json(), hence the prmomise 

      json: () => Promise.resolve({ rates: { standard: { value: 20 } } })
    });

    // Waits for the `orderTotal` function to complete its execution, including all asynchronous operations like the `fetch` call.
    await orderTotal(order);

    // Because `fetch` is mocked with `mockResolvedValueOnce`, when the `orderTotal`function calls `fetch`, it immediately resolves with the mock data without any real network delay.
    expect(fetch).toHaveBeenCalledWith('https://vatapi.com/v1/country-code-check?code=DE');
  });

  test('orderTotal returns the correct total with VAT', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ rates: { standard: { value: 20 } } })
    });

    const total = await orderTotal(order);
    expect(total).toBe(42); // 2*10 + 3*5 = 35 + 20% VAT = 42
  });

  test('orderTotal handles fetch error gracefully', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    const total = await orderTotal(order);
    expect(total).toBe(35); // 2*10 + 3*5 = 35
  });
});