import chalk from "chalk";
import connectionDB from "../database/database.js";
import dayjs from "dayjs";

export async function getRentals(req, res) {}

export async function postRental(req, res) {
  const rentalObject = res.locals.rentalExistingGame;
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
