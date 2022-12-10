import connectionDB from "../../database/database.js";
import chalk from "chalk";

export async function existingCategory(req, res, next) {
  const name = res.locals.validatedCategory;
  try {
    const existingCategory = await connectionDB.query(
      "SELECT * FROM categories WHERE name = $1;",
      [name]
    );
    if (existingCategory.rowCount) {
      console.log(chalk.red("middleware: existingCategory blocked!"));
      return res.status(409).send({ messsage: "Categoria já cadastrada!" });
    } else {
      console.log(chalk.yellow("middleware: existingCategory passed..."));
      res.locals.nonExistentCategory = name;
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
  next();
}
