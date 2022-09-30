import connection from "../database.js";

async function getCategories (req, res) {
  const categoriesList = await connection.query('SELECT * FROM categories;');

  res.send(categoriesList.rows);
}

async function createCategory (req, res) {
  const { name } = req.body;
  try {
    await connection.query('INSERT INTO categories (name) VALUES ($1);', [name]);
    res.sendStatus(201);
  }catch(error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

export {
  getCategories,
  createCategory
}