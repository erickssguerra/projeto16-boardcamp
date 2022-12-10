import connectionDB from "../database/database.js";

export async function postCustomer(req, res) {
  const costumerObject = res.locals.validatedCostumer;
  const { name, phone, cpf, birthday } = costumerObject;
  try {
    await connectionDB.query(
      `
    INSERT INTO customers 
      (name, phone, cpf, birthday) 
    VALUES
      ($1, $2, $3, $4)
    ;`,
      [name, phone, cpf, birthday]
    );
    console.log("controller: postGame passed!");
    return res.status(201).send({ message: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getCustomers(req, res) {
  try {
    const costumers = await connectionDB.query(`
        SELECT 
          *
        FROM
          customers
        ;`);
    return res.status(200).send(costumers.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
