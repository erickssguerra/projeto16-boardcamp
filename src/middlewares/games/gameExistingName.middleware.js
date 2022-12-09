import connectionDB from "../../database/database.js";

export async function existingName(req, res, next) {
  const gameObject = res.locals.existentCategoryValidated;
  try {
    const existingName = await connectionDB.query(
      "SELECT * FROM games WHERE name=$1;",
      [gameObject.name]
    );
    if (!existingName.rowCount) {
        console.log("middleware: existingName passed!")
      res.locals.validatedGameObject = gameObject;
    } else {
      return res.status(409).send({ message: "Jogo já registrado!" });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  next();
}
