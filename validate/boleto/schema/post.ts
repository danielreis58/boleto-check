import Joi from 'joi'

const validate = Joi.object({
  banco: Joi.string().required(),
  data_emissao: Joi.date().required(),
  data_vencimento: Joi.date().required(),
  valor: Joi.number().required(),
  nosso_numero: Joi.string().required(),
  numero_documento: Joi.string().required(),
  cedente: Joi.string().required(),
  cedente_cnpj: Joi.string().required(),
  agencia: Joi.string().required(),
  codigo_cedente: Joi.string().required(),
  carteira: Joi.string().required()
})

export default validate
