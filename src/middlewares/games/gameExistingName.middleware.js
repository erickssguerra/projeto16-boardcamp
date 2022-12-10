import connectionDB from "../../database/database.js";
import chalk from "chalk";

export async function existingName(req, res, next) {
  const gameObject = res.locals.existentCategoryValidated;
  try {
    const existingName = await connectionDB.query(
      "SELECT * FROM games WHERE name=$1;",
      [gameObject.name]
    );
    if (!existingName.rowCount) {
      console.log(chalk.yellow("middleware: existingName passed..."));
      res.locals.validatedGameObject = gameObject;
    } else {
      console.log(chalk.red("middleware: existingName blocked!"));
      return res.status(409).send({ message: "Jogo já registrado!" });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  next();
}
