import { add, compareAsc, format } from 'date-fns'
import { CustomError } from '../errors/CustomError'

type boletoType = 'convenio' | 'titulo'

const getType = (boleto: string) => {
  if (boleto.length === 47) {
    return 'titulo'
  }
  if (boleto.length === 48) {
    return 'convenio'
  }
  return 'invalid'
}

const getBarCode = (boleto: string, type: boletoType) => {
  switch (type) {
    case 'convenio':
      return (
        boleto.substring(0, 11) +
        boleto.substring(12, 23) +
        boleto.substring(24, 35) +
        boleto.substring(36, 47)
      )
    case 'titulo':
      return (
        boleto.substring(0, 4) +
        boleto.charAt(32) +
        boleto.substring(33, 47) +
        boleto.substring(4, 9) +
        boleto.substring(10, 20) +
        boleto.substring(21, 31)
      )
    default:
      throw new CustomError('Invalid boleto type')
  }
}

const getAmount = (boleto: string, type: boletoType) => {
  switch (type) {
    case 'convenio': {
      const amountStr = boleto.substring(5, 11) + boleto.substring(12, 16)
      const amountInt = parseInt(amountStr)

      const amount = amountInt / 100
      return amount
    }
    case 'titulo': {
      const amountStr = boleto.substring(37, 47)
      const amountInt = parseInt(amountStr)

      const amount = amountInt / 100
      return amount
    }
    default:
      throw new CustomError('Invalid boleto type')
  }
}

const getExpirationDate = (boleto: string, type: boletoType) => {
  switch (type) {
    case 'convenio': {
      const dueStr = boleto.substring(26, 34)

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

      return expirationDate
    }
    case 'titulo': {
      const dueStr = boleto.substring(33, 37)
      const dueInt = parseInt(dueStr)

      let expirationDate = null

      if (dueInt !== 0) {
        const now = new Date()
        const referDate = new Date(1997, 9, 7, 0, 0, 0)
        console.log('referDate', referDate)
        const referDate2 = add(referDate, { days: 10000 })
        console.log('referDate2', referDate2)
        const referDate3 = add(referDate2, { days: 10000 })
        console.log('referDate3', referDate3)

        if (compareAsc(now, add(referDate, { days: 9999 }))) {
        }
        expirationDate = format(
          add(referDate, {
            days: dueInt
          }),
          'yyyy-MM-dd'
        )
      }

      return expirationDate
    }
    default:
      throw new CustomError('Invalid boleto type')
  }
}

export const validateConvenio = (boleto: string) => {
  const barCode = getBarCode(boleto, 'convenio')

  const amount = getAmount(boleto, 'convenio')

  const expirationDate = getExpirationDate(boleto, 'convenio')

  return {
    barCode,
    amount,
    expirationDate
  }
}

export const validateTitulo = (boleto: string) => {
  const barCode = getBarCode(boleto, 'titulo')

  const amount = getAmount(boleto, 'titulo')

  const expirationDate = getExpirationDate(boleto, 'titulo')

  return {
    barCode,
    amount,
    expirationDate
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
