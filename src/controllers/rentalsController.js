import connection from "../database.js";
import dayjs from 'dayjs';

async function getRentals (req, res) {
  const rentalsList = await connection.query(`SELECT rentals.*, customers.name AS "customerName", games.name AS "gameName", games."categoryId", categories.name AS "categoryName" FROM rentals JOIN customers ON customers.id = rentals."customerId" JOIN games ON games.id = rentals."gameId" JOIN categories ON categories.id = games."categoryId";`);
  const listWithCust = rentalsList.rows.map((rental) => {
    const {
      id,
      customerId,
      gameId,
      rentDate,
      daysRented,
      returnDate,
      originalPrice,
      delayFee,
      customerName,
      gameName,
      categoryId,
      categoryName
    } = rental;

    return ({
      id,
      customerId,
      gameId,
      rentDate,
      daysRented,
      returnDate,
      originalPrice,
      delayFee,
      customer: {
        id: customerId,
        name: customerName
      },
      game: {
        id:gameId,
        name: gameName,
        categoryId,
        categoryName
      }
    })
  })

  res.send(listWithCust)
}

async function createRental (req, res) {
  const { customerId, gameId, daysRented } = req.body
  const rentDate = dayjs().format('YYYY-MM-DD');
  const gameInfo = res.locals.gameInfo;

  try {

    const originalPrice = parseInt(gameInfo.pricePerDay)*parseInt(daysRented)
    
    const rental = [
      customerId,
      gameId,
      rentDate,
      daysRented,
      originalPrice,
    ]

    await connection.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1,$2,$3,$4,null,$5,null)`, rental)

    res.sendStatus(201)
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }

}

async function returnRental (req, res) {
  const rentalExists = res.locals.rentalExists;
  const nowDate = dayjs().format('YYYY-MM-DD');
  const rentalDate = dayjs(rentalExists.rentDate).format('YYYY-MM-DD');

  try {
    const game = await connection.query('SELECT * FROM games WHERE id = $1;', [rentalExists.gameId]);
    
    let qntDays = (dayjs(nowDate) - dayjs(rentalDate)) / (1000 * 60 * 60 * 24) 
    let delay = 0
    if(parseInt(qntDays) > parseInt(rentalDate.daysRented)){
      delay = qntDays - rentalDate.daysRented
    }
    let delayFee = delay * parseInt(game.rows[0].pricePerDay);

    await connection.query('UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3;', [nowDate, delayFee, rentalExists.id]);

    res.sendStatus(200)

  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

async function deleteRental (req, res) {
  const rentalId = req.params.id;
  try {
    const rental = await connection.query('SELECT * FROM rentals WHERE id = $1;', [rentalId]);
    if(!rental.rows[0]) return res.sendStatus(404);
    if(!rental.rows[0].returnDate) return res.sendStatus(400);
    
    await connection.query('DELETE FROM rentals WHERE id = $1;', [rentalId])

    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

export {
  createRental,
  getRentals,
  returnRental,
  deleteRental
}