import connectionDB from "../../database/database.js";

export async function existingCpf(req, res, next) {
  const costumerObject = res.locals.validatedCustomer;
  const { cpf } = costumerObject;
  try {
    const existingCpf = await connectionDB.query(
      `SELECT * FROM customers WHERE cpf = $1`,
      [cpf]
    );
    if (existingCpf.rowCount) {
      return res.status(409).send({ message: "CPF já cadastrado!" });
    } else {
      console.log("middleware: exisgintCpf passed!");
      res.locals.nonExistingCpf = costumerObject;
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  next();
}
