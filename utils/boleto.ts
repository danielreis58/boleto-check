import { add, format } from 'date-fns'
import { CustomError } from '../errors/CustomError'

const getType = (boleto: string) => {
  if (boleto.length === 47) return 'titulo'
  if (boleto.length === 48) return 'convenio'
  return 'invalid'
}

const getProduct = (boleto: string) => {
  const product = boleto.charAt(0)

  if (product === '8') {
    return 'Arrecadação'
  }

  return new CustomError('Invalid product')
}

const getSegment = (boleto: string) => {
  const segment = boleto.charAt(1)

  switch (segment) {
    case '1':
      return 'Prefeituras'

    case '2':
      return 'Saneamento'

    case '3':
      return 'Energia Elétrica e Gás'

    case '4':
      return 'Telecomunicações;'

    case '5':
      return 'Órgãos Governamentais'

    case '6':
      return 'Empresas'

    case '7':
      return 'Multas de trânsito'

    case '9':
      return 'Uso exclusivo do banco'

    default:
      throw new CustomError('Invalid segment')
  }
}

export const validateConvenio = (boleto: string) => {
  const segment = getSegment(boleto)
  const generalCheckDigitStr = boleto.charAt(3)
  const generalCheckDigitInt = parseInt(generalCheckDigitStr)

  const barCode =
    boleto.substring(0, 11) +
    boleto.substring(12, 23) +
    boleto.substring(24, 35) +
    boleto.substring(36, 47)

  const amountStr = barCode.substring(5, 15)
  const amountInt = parseInt(amountStr)

  const amount = amountInt / 100

  const dueStr = barCode.substring(24, 32)

  const year = dueStr.substring(0, 4)
  const yearInt = parseInt(year)

  const month = dueStr.substring(4, 6)
  const monthInt = parseInt(month)

  const day = dueStr.substring(6, 8)
  const dayInt = parseInt(day)

  let expirationDate = null

  if (monthInt >= 1 && monthInt <= 12 && dayInt >= 1 && dayInt <= 31) {
    expirationDate = format(
      new Date(yearInt, monthInt - 1, dayInt, 0, 0, 0),
      'yyyy-MM-dd'
    )
  }

  return {
    barCode,
    amount,
    expirationDate,
    generalCheckDigit: generalCheckDigitInt,
    segment
  }
}

export const validateTitulo = (boleto: string) => {
  const bankStr = boleto.substring(0, 3)
  const bankInt = parseInt(bankStr)

  const currencyStr = boleto.charAt(3)
  const currencyInt = parseInt(currencyStr)

  const generalCheckDigitStr = boleto.charAt(32)
  const generalCheckDigitInt = parseInt(generalCheckDigitStr)

  const dueStr = boleto.substring(33, 37)
  const dueInt = parseInt(dueStr)

  const amountStr = boleto.substring(37, 47)
  const amountInt = parseInt(amountStr)

  if (dueInt === 0) {
    throw new CustomError('No expiration date')
  }

  const amount = amountInt / 100

  const expirationDate = format(
    add(new Date(1997, 9, 7, 0, 0, 0), {
      days: dueInt
    }),
    'yyyy-MM-dd'
  )
  const barCode =
    boleto.substring(0, 4) +
    generalCheckDigitStr +
    boleto.substring(33, 47) +
    boleto.substring(4, 9) +
    boleto.substring(10, 20) +
    boleto.substring(21, 31)

  return {
    //TODO:
    barCode,
    amount,
    expirationDate,
    generalCheckDigit: generalCheckDigitInt
  }
}

export const validateBoleto = (boleto: string) => {
  const type = getType(boleto)
  switch (type) {
    case 'titulo':
      return validateTitulo(boleto)

    case 'convenio':
      return validateConvenio(boleto)

    default:
      throw new CustomError('Invalid boleto type')
  }
}
