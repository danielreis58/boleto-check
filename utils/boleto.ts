import { add, format } from 'date-fns'
import { CustomError } from '../errors/CustomError'
export const validateConvenio = (boleto: string) => {
  const response = false

  return response
}

export const validateTitulo = (boleto: string) => {
  const bancoString = boleto.substring(0, 3)

  const moedaString = boleto.substring(3, 4)

  const dvGeralString = boleto.substring(32, 33)

  const vencimentoString = boleto.substring(33, 37)
  const vencimentoInt = parseInt(vencimentoString)

  const valorString = boleto.substring(37, 47)
  const valorInt = parseInt(valorString)

  if (vencimentoInt === 0) {
    throw new CustomError('No expiration date')
  }

  const amount = valorInt / 100

  const expirationDate = format(
    add(new Date(1997, 9, 7, 0, 0, 0), {
      days: parseInt(vencimentoString)
    }),
    'yyyy-MM-dd'
  )
  //TODO:
  console.log(
    JSON.stringify(
      {
        codigoBanco: bancoString,
        codigoMoeda: moedaString,
        dvGeral: dvGeralString,
        fatorVencimento: vencimentoString,
        valorString,
        amount,
        expirationDate
      },
      null,
      2
    )
  )
  return {
    //TODO:
    barCode: '21299758700000020000001121100012100447561740',
    amount,
    expirationDate
  }
}

export const validateBoleto = (boleto: string) => {
  let response = false

  response = validateConvenio(boleto) || validateTitulo(boleto)

  return response
}
