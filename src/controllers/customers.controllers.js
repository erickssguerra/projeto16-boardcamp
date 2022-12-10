import connectionDB from "../database/database.js";

export async function postCustomer(req, res) {
  const costumerObject = res.locals.validatedCostumer;
  res.status(201).send(costumerObject);
}
