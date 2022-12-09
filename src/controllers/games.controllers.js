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
