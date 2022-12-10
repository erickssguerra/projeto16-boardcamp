import connectionDB from "../database/database.js";
import chalk from "chalk";

export async function postCategory(req, res) {
  const name = res.locals.nonExistentCategory;
  try {
    const result = await connectionDB.query(
      "INSERT INTO categories (name) VALUES ($1);",
      [name]
    );
    console.log(chalk.green("controller: postCategory concluded!"));
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getCategories(req, res) {
  try {
    const categories = await connectionDB.query("SELECT * FROM categories;");
    console.log(chalk.green("controller: getCategories concluded!"));
    res.status(200).send(categories.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
