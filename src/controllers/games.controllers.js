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
        ILIKE 
          '${nameQuery}%'
        ;`
      );
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
    console.log("controller: postGame passed!");
    return res.status(201).send({ message: "Jogo cadastrado com sucesso!" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
