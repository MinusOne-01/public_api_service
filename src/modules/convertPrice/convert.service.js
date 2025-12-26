const RATES = {
  INR_USD: 0.01,
  USD_INR: 100,
};

// dummy operation
export async function convertCurrency({ from, to, amount }) {

  const key = `${from}_${to}`;
  const rate = RATES[key];

  if (!rate) {
    throw new Error("Unsupported currency pair");
  }

  console.log("Service done!");

  return {
    from,
    to,
    amount,
    rate,
    result: amount * rate,
  };
}
