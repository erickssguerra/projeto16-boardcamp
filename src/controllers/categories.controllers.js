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
  const offset = Number(req.query.offset);
  const limit = Number(req.query.limit);
  const getQuery = `SELECT * from categories`;
  try {
    if (offset && !limit) {
      const categories = await connectionDB.query(
        `
      ${getQuery} OFFSET $1`,
        [offset]
      );
      console.log(
        chalk.green("controller: getCategories with query 'offset' concluded!")
      );
      res.status(200).send(categories.rows);
    } else if (!offset && limit) {
      const categories = await connectionDB.query(
        `
      ${getQuery} LIMIT $1`,
        [limit]
      );
      console.log(
        chalk.green("controller: getCategories with query 'limit' concluded!")
      );
      res.status(200).send(categories.rows);
    } else if (offset && limit) {
      const categories = await connectionDB.query(
        `
      ${getQuery} OFFSET $1 LIMIT $2`,
        [offset, limit]
      );

      console.log(
        chalk.green(
          "controller: getCategories with queries 'offset' and 'limit' concluded!"
        )
      );
      res.status(200).send(categories.rows);
    } else {
      const categories = await connectionDB.query(`${getQuery};`);
      console.log(
        chalk.green("controller: getCategories without queries concluded!")
      );
      res.status(200).send(categories.rows);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
