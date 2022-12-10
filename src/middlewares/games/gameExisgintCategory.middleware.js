import connectionDB from "../../database/database.js";
import chalk from "chalk";

export async function existingCategory(req, res, next) {
  const gameObject = res.locals.validatedGame;
  try {
    const existingCategory = await connectionDB.query(
      "SELECT * FROM categories WHERE id = $1;",
      [gameObject.categoryId]
    );
    if (existingCategory.rowCount) {
      console.log(chalk.yellow("middleware: existingCategory passed..."));
      res.locals.existentCategoryValidated = gameObject;
    } else {
      console.log(chalk.red("middleware: existingCategory blocked!"));
      return res.status(400).send({ message: "Categoria não cadastrada!" });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  next();
}
