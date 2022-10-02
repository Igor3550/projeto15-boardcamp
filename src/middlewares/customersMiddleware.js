import joi from 'joi';

const customerSchema = joi.object({
  name: joi.string().required(),
  phone: joi.string().max(11).min(10).required(),
  cpf: joi.string().max(11).min(11).required(),
  birthday: joi.string().required()
})

function customerMiddleware (req, res, next) {
  const customerData = req.body;

  const verification = customerSchema.validate(customerData)
  if(verification.error){
    console.log(verification.error.details[0])
    return res.status(400).send(verification.error.details[0].message)
  }
  const dateVerify = new Date(customerData.birthday).getDate()
  if(isNaN(dateVerify)) return res.status(400).send({message:"Birthday must be a valid date!"})

  if(isNaN(customerData.phone)) return res.status(400).send({message:"Phone must be a valid number!"})
  if(isNaN(customerData.cpf)) return res.status(400).send({message:"CPF must be a valid CPF!"})

  next();
}

export {
  customerMiddleware
}