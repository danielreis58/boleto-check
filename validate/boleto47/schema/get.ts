import Joi from 'joi'

const validate = Joi.object({
  boletoDigits: Joi.string()
    .length(47)
    .pattern(/^[0-9]+$/, 'only numbers')
    .required()
})

export default validate
