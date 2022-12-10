import connectionDB from "../../database/database.js";
import chalk from "chalk";

export async function gameAvailability(req, res, next) {
  const rentalObject = res.locals.rentalExistingGame;
  const { gameId } = rentalObject;
  try {
    const gameObject = await connectionDB.query(
      `
    SELECT 
        "stockTotal"
    FROM
        games
    WHERE
        id=$1    
    ;`,
      [gameId]
    );
    const stockTotal = gameObject.rows[0].stockTotal;
    const rentedGames = await connectionDB.query(
      `
    SELECT
        *
    FROM
        rentals
    WHERE
        "gameId" = $1
    ;`,
      [gameId]
    );
    const amountOfRentedGames = rentedGames.rowCount;
    if (stockTotal > amountOfRentedGames) {
      console.log(chalk.yellow("middleware: gameAvailability passed..."));
      res.locals.gameAvailableToRent = rentalObject;
    } else {
      console.log(chalk.red("middleware: gameAvailability blocked!"));
      return res
        .status(400)
        .send({ message: "Não há mais disponível no stock!" });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  next();
}
