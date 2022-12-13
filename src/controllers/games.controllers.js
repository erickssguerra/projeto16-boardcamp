import chalk from "chalk";
import connectionDB from "../database/database.js";

export async function getGames(req, res) {
  const nameQuery = req.query.name?.trim();
  const offset = Number(req.query.offset);
  const limit = Number(req.query.limit);
  const getQuery = `
      SELECT 
        games.*, categories.name AS "categoryName"
      FROM games 
      JOIN categories
      ON games."categoryId" = categories.id
      `;
  const getNameQuery = `
      WHERE 
        (games.name) 
      ILIKE CONCAT
      (CAST($1 AS TEXT),'%')
      `;
  try {
    if (!nameQuery && !offset && !limit) {
      const games = await connectionDB.query(`${getQuery};`);
      console.log(chalk.green("controller: getGames with no queries concluded!"));
      res.status(200).send(games.rows);
    } else if (nameQuery && !offset && !limit) {
      const games = await connectionDB.query(`${getQuery} ${getNameQuery};`, [nameQuery]);
      console.log(chalk.green("controller: getGames with query 'name' concluded!"));
      res.status(200).send(games.rows);

    } else if (nameQuery && offset && !limit) {
      const games = await connectionDB.query(`${getQuery} ${getNameQuery} OFFSET $2;`,
        [nameQuery, offset]);
      console.log(chalk.green("controller: getGames with queries 'name' and 'offset' concluded!"));
      res.status(200).send(games.rows);

    } else if (nameQuery && offset && limit) {
      const games = await connectionDB.query(`${getQuery} ${getNameQuery} OFFSET $2 LIMIT $3;`,
        [nameQuery, offset, limit]);
      console.log(chalk.green("controller: getGames with queries 'name', 'offset' and 'limit' concluded!"));
      res.status(200).send(games.rows);

    } else if (nameQuery && !offset && limit) {
      const games = await connectionDB.query(`${getQuery} ${getNameQuery} LIMIT $2;`,
      [nameQuery, limit]);
      console.log(chalk.green("controller: getGames with queries 'name' and 'limit' concluded!"));
      res.status(200).send(games.rows);

    } else if (!nameQuery && offset && limit) {
      const games = await connectionDB.query(`${getQuery} OFFSET $1 LIMIT $2;`,
        [offset, limit]);
      console.log(chalk.green("controller: getGames with queries 'offset' and 'limit' concluded!"));
      res.status(200).send(games.rows);

    } else if (!nameQuery && !offset && limit) {
      const games = await connectionDB.query(`${getQuery} LIMIT $1;`, [limit]);
      console.log(chalk.green("controller: getGames with query 'limit' concluded!"));
      res.status(200).send(games.rows);

    } else if (!nameQuery && offset && !limit) {
      const games = await connectionDB.query(`${getQuery} OFFSET $1;`, [offset]);
      console.log(chalk.green("controller: getGames with query 'offset' concluded!"));
      res.status(200).send(games.rows);
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
