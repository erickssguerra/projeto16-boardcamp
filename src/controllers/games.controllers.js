import connectionDB from "../database/database.js";

export async function getGames(req, res) {
  try {
    const games = await connectionDB.query("SELECT * FROM games;");
    res.status(200).send(games.rows);
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
