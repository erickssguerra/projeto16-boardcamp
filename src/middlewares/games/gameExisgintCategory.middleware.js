import connectionDB from "../../database/database.js";

export async function existingCategory(req, res, next) {
  const gameObject = res.locals.validatedGame;
  try {
    const existingCategory = await connectionDB.query(
      "SELECT * FROM categories WHERE id = $1;",
      [gameObject.categoryId]
    );
    if (existingCategory.rowCount) {
        console.log("middleware: existingCategory passed!")
      res.locals.existentCategoryValidated = gameObject;
    } else {
      return res.status(400).send({ message: "Categoria não cadastrada!" });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  next();
}
