import connection from "../database.js";

async function getGames (req, res) {
  const gamesList = await connection.query('SELECT * FROM games;')
  res.send(gamesList.rows);
}

async function createGame (req, res) {
  const gameData = req.body
  console.log(gameData)
  res.send(gameData);
}

export {
  getGames,
  createGame
}