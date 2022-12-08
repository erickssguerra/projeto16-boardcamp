import connectionDB from "../database/database.js";

export async function existingCategory(req, res, next) {
  const name = res.locals.validatedCategory;
  try {
    const existingCategory = await connectionDB.query(
      "SELECT * FROM categories WHERE name = $1;",
      [name]
    );
    if (existingCategory.rowCount) {
      return res.status(409).send({messsage: "Categoria já cadastrada!"});
    } else {
      console.log("Success: name allowed to be registered!")
      res.locals.nonExistentCategory = name;
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
  next();
}
