import { convertCurrency } from "../convertPrice/convert.service.js";

export async function convertController(req, res) {
  try {

    const { from, to, amount } = req.query;

    if (!from || !to || !amount) {
      return res.status(400).json({
        error: "from, to and amount are required",
      });
    }

    const numericAmount = Number(amount);

    if (Number.isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({
        error: "amount must be a positive number",
      });
    }

    const data = await convertCurrency({
      from: from.toUpperCase(),
      to: to.toUpperCase(),
      amount: numericAmount,
    });

    res.json(data);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
}
