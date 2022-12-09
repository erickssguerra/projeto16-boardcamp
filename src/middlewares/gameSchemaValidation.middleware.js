import { gameSchema } from "../schemas/game.schema.js";

export async function gameSchemaValidation(req, res, next) {
  const body = req.body;
  const { name, image, stockTotal, categoryId, pricePerDay } = body;
  const { error } = gameSchema.validate(body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }
  console.log("Sucess: game schema validated!");
  res.locals.validatedGame = body;
  next();
}
