import Joi from 'joi'

const validate = Joi.object({
  boletoNumber: Joi.string()
    .length(48)
    .pattern(/^[0-9]+$/, 'only numbers')
    .required()
})

export default validate
