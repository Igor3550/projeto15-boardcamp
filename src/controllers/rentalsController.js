import connection from "../database.js";
import dayjs from 'dayjs';

async function getRentals (req, res) {
  const rentalsList = await connection.query(`SELECT rentals.*, customers.name AS "customerName", games.name AS "gameName", games."categoryId", categories.name AS "categoryName" FROM rentals JOIN customers ON customers.id = rentals."customerId" JOIN games ON games.id = rentals."gameId" JOIN categories ON categories.id = games."categoryId";`);
  const listWithCust = rentalsList.rows.map((rental) => {
    console.log(rental)
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
  console.log(listWithCust)
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

    res.send({m:"200 msm"})
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }

}

export {
  createRental,
  getRentals
}