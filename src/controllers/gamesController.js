import connection from "../database.js";

async function getGames (req, res) {
  const gamesList = await connection.query('SELECT * FROM games;')
  res.send(gamesList.rows);
}

async function createGame (req, res) {
  const { name, pricePerDay, image, stockTotal, categoryId } = req.body
}

export {
  getGames
}