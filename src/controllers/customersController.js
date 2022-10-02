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
  console.log(req.body)
  res.sendStatus(201)
}

export {
  getCustomers,
  createCustomer,
  getCustomersById
}