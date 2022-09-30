import connection from '../database.js';

async function categoriesMiddleware (req, res, next) {
  const { name } = req.body;
  if(!name) return res.sendStatus(400);
  const existentCategory = await connection.query('SELECT * FROM categories WHERE name = $1;', [name]);
  if(existentCategory.rows[0]) return res.sendStatus(409);
  
  next()
}

export {
  categoriesMiddleware
}