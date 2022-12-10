import connectionDB from "../database/database.js";

export async function postCustomer(req, res) {
  const costumerObject = res.locals.validatedCustomer;
  res.status(201).send(costumerObject);
}
