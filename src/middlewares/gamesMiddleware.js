import joi from 'joi';
import connection from '../database.js';

const gameSchema = joi.object({
  name: joi.string().required(),
  image: joi.string().required(),
  stockTotal: joi.number().required(),
  categoryId: joi.number().required(),
  pricePerDay: joi.number().required()
})

async function gamesMiddleware (req, res, next) {
  const gameData = req.body;
  const verification = gameSchema.validate(gameData)
  let httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

  if(verification.error){
    const message = verification.error.details[0].message
    return res.status(400).send(message);
  }

  if(!httpRegex.test(gameData.image)) return res.status(400).send({message:"Image must be a valid https link!"})
  
  if(gameData.stockTotal < 1) return res.status(400).send({message:"stockTotal must be > 0!"});
  if(gameData.pricePerDay < 1) return res.status(400).send({message:"pricePerDay must be > 0!"});
  
  const categoryIdExists = await connection.query('SELECT name FROM categories WHERE id = $1;', [gameData.categoryId]);
  if(!categoryIdExists.rows[0]) return res.status(400).send({message:"Category not exists!"})

  const nameExists = await connection.query('SELECT * FROM games WHERE name = $1', [gameData.name])
  if(nameExists.rows[0]) return res.status(400).send({message:"Name already exists!"})

  next();
}

export {
  gamesMiddleware
}