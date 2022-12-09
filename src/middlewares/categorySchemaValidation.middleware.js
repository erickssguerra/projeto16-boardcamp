import { categoriesSchema } from "../schemas/category.schema.js";

export async function categorySchemaValidation(req, res, next) {
  const { name } = req.body;
  const { error } = categoriesSchema.validate({ name }, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }
  console.log("Success: category name validated!");
  res.locals.validatedCategory = name;
  next();
}
