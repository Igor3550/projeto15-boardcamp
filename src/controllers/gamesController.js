import connection from "../database.js";

async function getGames (req, res) {
  const gamesList = await connection.query('SELECT * FROM games;')
  res.send(gamesList.rows);
}

async function createGame (req, res) {
  const gameData = req.body
  console.log(gameData)
  try {
    await connection.query('INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);', [
      gameData.name,
      gameData.image,
      gameData.stockTotal,
      gameData.categoryId,
      gameData.pricePerDay
    ]);
    res.sendStatus(201);
  } catch (error) {
    console.log(error)
    return res.status(500);
  }
}

export {
  getGames,
  createGame
}