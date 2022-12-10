import connectionDB from "../database/database.js";
import chalk from "chalk";

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
    console.log(chalk.green("controller: postGame concluded!"));
    return res.status(201).send({ message: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getCustomers(req, res) {
  const cpfQuery = Number(req.query.cpf);
  const selectAllQuery = "SELECT * FROM customers";
  try {
    if (cpfQuery) {
      const costumers = await connectionDB.query(`
      ${selectAllQuery} 
      WHERE 
        cpf 
      LIKE
        '${cpfQuery}%'
      ;`);
      if (costumers.rowCount) {
        console.log(
          chalk.green("controller: getCustomers with query concluded!")
        );
      } else {
        console.log(
          chalk.yellow("controller: getCostumers with query returned empty!")
        );
      }
      return res.status(200).send(costumers.rows);
    } else {
      const costumers = await connectionDB.query(`${selectAllQuery};`);
      console.log(chalk.green("controller: getCustomers concluded!"));
      return res.status(200).send(costumers.rows);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getCustomerById(req, res) {
  const id = req.params.id;
  try {
    const customer = await connectionDB.query(
      `
    SELECT
      *
    FROM
      customers
    WHERE
      id = $1
    ;`,
      [id]
    );
    if (customer.rowCount) {
      console.log(chalk.green("controller: getCustomerById concluded!"));
      res.status(200).send(customer.rows[0]);
    } else {
      console.log(chalk.red("controller: getCustomerById failed!"));
      res.status(404).send({ message: "Usuário não encontrado!" });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function putCustomerById(req, res) {
  const id = req.params.id;
  const costumerObject = res.locals.validatedCostumer;
  const { name, phone, cpf, birthday } = costumerObject;
  try {
    // await connectionDB.query(
    //   `
    //     UPDATE
    //         costumers
    //     SET
    //         name=$1,
    //         phone=$2,
    //         cpf=$3,
    //         birthday=$4
    //     WHERE
    //         id=$5
    //     ;`,
    //   [name, phone, cpf, birthday, id]
    // );
    console.log(chalk.green("controller: putCustomerById concluded!"));
    res.status(200).send({ message: "Dados do usuário atualizados!" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
