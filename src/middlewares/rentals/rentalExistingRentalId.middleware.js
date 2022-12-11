import connectionDB from "../../database/database.js";
import chalk from "chalk";

export async function existingRentalId(req, res, next) {
  const { id } = req.params;
  try {
    const existingRentalId = await connectionDB.query(
      `
    SELECT * FROM rentals WHERE id=$1
    ;`,
      [id]
    );
    if (existingRentalId.rowCount) {
      console.log(chalk.yellow("middleware: existingRentalId passed..."));
      res.locals.existingRentalId = id;
    } else {
      console.log(chalk.red("middleware: existingRentalId blocked!"));
      return res.status(400).send({ message: "Aluguel não cadastrado!" });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  next();
}
