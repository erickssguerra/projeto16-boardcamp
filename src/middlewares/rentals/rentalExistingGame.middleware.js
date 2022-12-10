import connectionDB from "../../database/database.js";
import chalk from "chalk";

export async function existingGame(req, res, next) {
  const rentalObject = res.locals.rentalExistingCustomer;
  try {
    const existingGame = await connectionDB.query(
      `
    SELECT * FROM games WHERE id=$1
    ;`,
      [rentalObject.gameId]
    );
    if (existingGame.rowCount) {
      console.log(chalk.yellow("middleware: existingGame passed..."));
      res.locals.rentalExistingGame = rentalObject;
    } else {
      console.log(chalk.red("middleware: existingGame blocked!"));
      return res.status(400).send({ message: "Jogo não cadastrado!" });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  next();
}
