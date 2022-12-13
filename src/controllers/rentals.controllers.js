import chalk from "chalk";
import connectionDB from "../database/database.js";
import dayjs from "dayjs";

export async function getRentals(req, res) {
  const { gameId, customerId } = req.query;
  const rentalQuery = `
    SELECT
        rentals.*, 
        JSON_BUILD_OBJECT
            ('id',customers.id, 
            'name', customers.name) 
                AS customer,
        JSON_BUILD_OBJECT
            ('id',games.id,
            'name', games.name,
            'categoryId', games."categoryId",
            'categoryName', categories.name)
                AS game
    FROM
        rentals
    JOIN customers ON customers.id = "customerId"
    JOIN games ON games.id = "gameId"
    JOIN categories ON categories.id = games."categoryId"
    `;
  try {
    if (!gameId && !customerId) {
      const rentalObject = await connectionDB.query(`${rentalQuery};`);
      console.log(
        chalk.green("controller: getRentals without queries concluded!")
      );
      res.status(200).send(rentalObject.rows);
    } else if (!customerId && gameId) {
      const rentalObject = await connectionDB.query(
        `${rentalQuery} WHERE "gameId" = $1;`,
        [gameId]
      );
      console.log(
        chalk.green("controller: getRentals with query gameId concluded!")
      );
      res.status(200).send(rentalObject.rows);
    } else if (customerId && !gameId) {
      const rentalObject = await connectionDB.query(
        `${rentalQuery} WHERE "customerId" = $1;`,
        [customerId]
      );
      console.log(
        chalk.green("controller: getRentals with query customerId concluded!")
      );
      res.status(200).send(rentalObject.rows);
    } else if (customerId && gameId) {
      const rentalObject = await connectionDB.query(
        `${rentalQuery}
            WHERE
                "customerId" = $1 AND 
                "gameId" = $2
            ;`,
        [customerId, gameId]
      );
      console.log(
        chalk.green(
          "controller: getRentals with queries customerId and gameId concluded!"
        )
      );
      res.status(200).send(rentalObject.rows);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function postRental(req, res) {
  const rentalObject = res.locals.gameAvailableToRent;
  const pricePerDay = res.locals.pricePerDayGame;
  const { customerId, gameId, daysRented } = rentalObject;
  const rentDate = dayjs().format("YYYY-MM-DD");
  const returnDate = null;
  const delayFee = null;
  const originalPrice = pricePerDay * daysRented;
  try {
    await connectionDB.query(
      `
    INSERT INTO rentals
        ("customerId", "gameId", "rentDate",
        "daysRented", "returnDate", "originalPrice",
        "delayFee")
    VALUES
        ($1, $2, $3, $4, $5, $6, $7)
    ;`,
      [
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayFee,
      ]
    );
    console.log(chalk.green("controller: postRental concluded!"));
    res.status(201).send({ message: "Aluguel cadastrado com sucesso!" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function deleteRentalById(req, res) {
  const id = res.locals.returnDateVerifiedId;
  try {
    await connectionDB.query(`DELETE FROM rentals WHERE id = $1;`, [id]);
    console.log(chalk.green("controller: deleteRentalById concluded!"));
    res.status(200).send({ message: "Aluguel apagado com sucesso!" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function postReturnRental(req, res) {
  const { id, rentDate, daysRented, originalPrice } =
    res.locals.validatedRentalObject;
  const returnDate = dayjs().format("YYYY-MM-DD");
  const now = new Date(returnDate);

  const past = new Date(rentDate);
  const diff = Math.abs(now.getTime() - past.getTime());
  const realDaysRented = Math.ceil(diff / (1000 * 60 * 60 * 24));
  const pricePerDay = originalPrice / daysRented;
  let delayFee = null;
  if (realDaysRented > daysRented) {
    delayFee = (realDaysRented - daysRented) * pricePerDay;
  }
  try {
    await connectionDB.query(
      `
    UPDATE 
        rentals
    SET
        "returnDate" =$1,
        "delayFee" =$2
    WHERE
        id=$3
    ;`,
      [returnDate, delayFee, id]
    );
    console.log(chalk.green("controller: postReturnRental concluded!"));
    res.status(200).send({ message: "Aluguel finalizado com sucesso!" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getRentalsMetrics(req, res) {
  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);
  const getQuery = `
  SELECT 
    SUM("originalPrice") AS "revenue", 
    COUNT(id) AS "rentals", 
    AVG("originalPrice") AS "average" 
  FROM 
    rentals
  `;
  try {
    if (startDate == "Invalid Date" && endDate == "Invalid Date") {
      const metrics = await connectionDB.query(`${getQuery};`);
      console.log(
        chalk.green("controller: getRentalMetrics with no queries concluded!")
      );
      res.status(200).send(metrics.rows[0]);
    } else if (startDate != "Invalid Date" && endDate == "Invalid Date") {
      const metrics = await connectionDB.query(
        `${getQuery} WHERE "rentDate" >= $1;`,
        [startDate.toISOString()]
      );
      console.log(
        chalk.green(
          "controller: getRentalMetrics with query 'startDate' concluded!"
        )
      );
      res.status(200).send(metrics.rows[0]);
    } else if (startDate != "Invalid Date" && endDate != "Invalid Date") {
      const metrics = await connectionDB.query(
        `${getQuery} WHERE "rentDate" >= $1 AND "rentDate" <= $2;`,
        [startDate.toISOString(), endDate.toISOString()]
      );
      console.log(
        chalk.green(
          "controller: getRentalMetrics with queries 'startDate' and 'endDate' concluded!"
        )
      );
      res.status(200).send(metrics.rows[0]);
    } else if (startDate == "Invalid Date" && endDate != "Invalid Date") {
      const metrics = await connectionDB.query(
        `
      ${getQuery} WHERE "rentDate" <= $1;`,
        [endDate.toISOString()]
      );

      console.log(
        chalk.green(
          "controller: getRentalMetrics with query 'endDate' concluded!"
        )
      );
      res.status(200).send(metrics.rows[0]);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
