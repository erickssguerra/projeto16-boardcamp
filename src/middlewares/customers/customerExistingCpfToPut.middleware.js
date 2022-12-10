import chalk from "chalk";
import connectionDB from "../../database/database.js";

export async function existingCpfToPut(req, res, next) {
  const costumerObject = res.locals.schemaValidatedCustomer;
  const { cpf } = costumerObject;
  const id = req.params.id;
  try {
    const existingCpf = await connectionDB.query(
      `
        SELECT
            *
        FROM
            customers
        WHERE
            cpf = $1 
        AND 
            id <> $2
        ;`,
      [cpf, id]
    );
    if (existingCpf.rowCount) {
      console.log(chalk.red("middleware: existingCpfToPut blocked!"));
      return res.status(409).send({ message: "Cpf já cadastrado!" });
    }
    console.log(chalk.yellow("middleware: existingCpfToPut passed..."));
    res.locals.validatedCostumer = costumerObject;
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  next();
}
