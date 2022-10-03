import joi from 'joi';
import connection from '../database.js';

const rentalSchema = joi.object({
  customerId: joi.number().required(),
  gameId: joi.number().required(),
  daysRented: joi.number().required()
})

async function createRentalMiddleware (req, res, next) {
  const rentalData = req.body;

  try {
    const verification = rentalSchema.validate(rentalData);
    if(verification.error) {
      const msg = verification.error.details[0].message
      return res.status(400).send(msg);
    }

    if(rentalData.daysRented < 1) return res.sendStatus(400);

    const gameInfo = await connection.query('SELECT * FROM games WHERE id = $1;', [rentalData.gameId]);
    if(!gameInfo.rows[0]) return res.sendStatus(400);

    const customerInfo = await connection.query('SELECT * FROM customers WHERE id = $1;', [rentalData.customerId]);
    if(!customerInfo.rows[0]) return res.sendStatus(400);

    res.locals.gameInfo = gameInfo.rows[0];
    next()
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
}

async function finishRentalMiddleware (req, res, next) {
  const rentalId = req.params.id

  try {
    const rentalExists = await connection.query('SELECT * FROM rentals WHERE id = $1;', [rentalId])
    if(!rentalExists.rows[0]) return res.sendStatus(404);

    if(rentalExists.rows[0].returnDate) return res.sendStatus(400);

    res.locals.rentalExists = rentalExists.rows[0];
    next();
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

export {
  createRentalMiddleware,
  finishRentalMiddleware
}