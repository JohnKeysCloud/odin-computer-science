async function orderTotal(order) {
  let vat = 0;

  try {
    const response = await fetch(`https://vatapi.com/v1/country-code-check?code=${order.country}`);
    const data = await response.json();
    vat = data.rates.standard.value / 100;
    // ⬆️  Assuming the VAT API returns the VAT rate as a percentage
  } catch (error) {
    console.error(`Failed to fetch VAT information: ${error}`);
  }

  const total = order.items.reduce((accumulator, current) =>
    accumulator + (current.price * (current.quantity || 1)), 0);

  return total + (total * vat);
}

export { orderTotal };
