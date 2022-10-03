import connection from "../database.js";

async function getCustomers (req, res) {
  const { cpf } = req.query;
  console.log(cpf);
  if(cpf) {
    try {
      let prepareString = `${cpf}%`
      const customersCpfFiltered = await connection.query(`SELECT * FROM customers WHERE cpf LIKE $1;`, [prepareString])
      res.send(customersCpfFiltered.rows)
    } catch (error) {
      console.log(error)
      return res.sendStatus(500)
    }
  }else{
    const customersList = await connection.query('SELECT * FROM customers;')
    res.send(customersList.rows)
  }
}

async function getCustomersById (req, res) {
  const { id } = req.params;

  const customersFilteredId = await connection.query(`SELECT * FROM customers WHERE id = $1;`, [id])
  if(!customersFilteredId.rows[0]) return res.sendStatus(404)
  res.send(customersFilteredId.rows[0])
}

async function createCustomer (req, res) {
  const { name, phone, cpf, birthday } = req.body;
  try {
    await connection.query('INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);', [name, phone, cpf, birthday]);
    res.sendStatus(201)
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

export {
  getCustomers,
  createCustomer,
  getCustomersById
}