import connectionDB from "../../database/database.js";
import chalk from "chalk";

export async function existingCpf(req, res, next) {
  const costumerObject = res.locals.schemaValidatedCustomer;
  const { cpf } = costumerObject;
  try {
    const existingCpf = await connectionDB.query(
      `SELECT * FROM customers WHERE cpf = $1`,
      [cpf]
    );
    if (existingCpf.rowCount) {
      console.log(chalk.red("middleware: existingCpf blocked!"))
      return res.status(409).send({ message: "CPF já cadastrado!" });
    } else {
      console.log(chalk.yellow("middleware: exisgintCpf passed..."));
      res.locals.validatedCostumer = costumerObject;
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  next();
}
