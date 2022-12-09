import connectionDB from "../database/database.js";

export async function postCustomer(req, res) {
  const costumerObject = req.body;
  res.status(201).send(costumerObject);
}
