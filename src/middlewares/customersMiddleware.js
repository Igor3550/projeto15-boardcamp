import joi from 'joi';
import connection from '../database.js';

const customerSchema = joi.object({
  name: joi.string().required(),
  phone: joi.string().max(11).min(10).required(),
  cpf: joi.string().max(11).min(11).required(),
  birthday: joi.string().required()
})

async function customerMiddleware (req, res, next) {
  const customerData = req.body;

  const verification = customerSchema.validate(customerData)
  if(verification.error){
    console.log(verification.error.details)
    return res.status(400).send(verification.error.details[0].message)
  }

  const dateVerify = new Date(customerData.birthday).getDate()
  if(isNaN(dateVerify)) return res.status(400).send({message:"Birthday must be a valid date!"})

  if(isNaN(customerData.phone)) return res.status(400).send({message:"Phone must be a valid number!"})
  if(isNaN(customerData.cpf)) return res.status(400).send({message:"CPF must be a valid CPF!"})

  const cpfInUse = await connection.query('SELECT * FROM customers WHERE cpf = $1;', [customerData.cpf]);
  if(cpfInUse.rows[0]) return res.status(409).send({message:"CPF already exists!"})

  next();
}

export {
  customerMiddleware
}