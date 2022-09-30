import joi from 'joi';
import connection from '../database.js';

const gameSchema = joi.object({
  name: joi.string().required(),
  image: joi.string(),
  stockTotal: joi.number().required(),
  categoryId: joi.number().required(),
  pricePerDay: joi.number().required()
})

async function gamesMiddleware (req, res, next) {
  const gameData = req.body;
  const verification = gameSchema.validate(gameData)

  if(verification.error){
    const message = verification.error.details[0].message
    return res.status(400).send(message);
  }

  if(gameData.stockTotal <= 0 || gameData.pricePerDay <= 0) return res.status(400);
  
  const categoryIdExists = await connection.query('SELECT name FROM categories WHERE id = $1;', [categoryId]);

  
}