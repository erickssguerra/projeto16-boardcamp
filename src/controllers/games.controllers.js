import chalk from "chalk";
import connectionDB from "../database/database.js";

export async function getGames(req, res) {
  const nameQuery = req.query.name?.trim();
  try {
    if (nameQuery) {
      const games = await connectionDB.query(
        `
        SELECT 
          games.*, categories.name AS "categoryName"
        FROM 
          games 
        JOIN
          categories
        ON
          games."categoryId" = categories.id
        WHERE
          (games.name) 
        ILIKE CONCAT
          (CAST($1 AS TEXT),'%')
        ;`,
        [nameQuery]
      );
      if (games.rowCount) {
        console.log(chalk.green("controller: getGames with query concluded!"));
      } else {
        console.log(
          chalk.yellow("controller: getGames with query returned empty!")
        );
      }
      return res.status(200).send(games.rows);
    } else {
      const games = await connectionDB.query(
        `
        SELECT 
          games.*, categories.name AS "categoryName" 
        FROM 
          games
        JOIN
          categories
        ON
          games."categoryId" = categories.id
        ;`
      );
      console.log(chalk.green("controller: getGames concluded!"));
      return res.status(200).send(games.rows);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function postGame(req, res) {
  const gameObject = res.locals.validatedGameObject;
  const { name, image, stockTotal, categoryId, pricePerDay } = gameObject;
  try {
    await connectionDB.query(
      `INSERT INTO games 
        (name, image, "stockTotal", "categoryId", "pricePerDay") 
      VALUES 
        ($1, $2, $3, $4, $5);`,
      [name, image, stockTotal, categoryId, pricePerDay]
    );
    console.log(chalk.green("controller: postGame concluded!"));
    return res.status(201).send({ message: "Jogo cadastrado com sucesso!" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
