import { add, compareAsc, format } from 'date-fns'
import { CustomError } from '../errors/CustomError'

const calcMod11 = (field: string) => {
  const sequence = [4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

  let sum = 0

  for (let i = 0; i < field.length; i++) {
    sum += parseInt(field[i]) * sequence[i]
  }

  const mod11 = sum % 11

  let dv

  if (mod11 === 0 || mod11 === 1) {
    dv = 0
  } else if (mod11 === 10) {
    dv = 1
  } else {
    dv = 11 - mod11
  }

  return dv
}

const calcMod10 = (field: string) => {
  let sum = 0
  let mult = 2

  for (let i = field.length - 1; i >= 0; i--) {
    const num = parseInt(field.charAt(i))

    let s

    s = mult * num

    if (s > 9) {
      s = s.toString()
      s = parseInt(s.charAt(0)) + parseInt(s.charAt(1))
    }

    sum += s

    mult = mult === 2 ? 1 : 2
  }

  const mod10 = sum % 10

  let dv

  if (mod10 === 0) {
    dv = 0
  } else {
    dv = 10 - mod10
  }

  return dv
}

const getReferDate = (refer?: Date): Date => {
  const now = new Date()
  now.setUTCHours(0, 0, 0, 0)

  const referDate = refer || new Date(1997, 9, 7, 0, 0, 0)
  const nextReferDate = add(referDate, { days: 10000 })

  if (compareAsc(now, nextReferDate) >= 0) {
    return getReferDate(nextReferDate)
  } else {
    return referDate
  }
}

const getType = (boleto: string) => {
  if (boleto.length === 47) {
    return 'titulo'
  }
  if (boleto.length === 48) {
    return 'convenio'
  }
  return 'invalid'
}

const convenioGetIdentifier = (boleto: string) => {
  const id = boleto.charAt(2)

  switch (id) {
    case '6':
      return {
        mod: 10,
        effective: true
      }
    case '7':
      return {
        mod: 10,
        effective: false
      }
    case '8':
      return {
        mod: 11,
        effective: true
      }
    case '9':
      return {
        mod: 11,
        effective: false
      }
    default:
      throw new CustomError('Invalid boleto', ['identifier'])
  }
}

const convenioValidateDV = (boleto: string) => {
  let boletoCk = ''

  const identifier = convenioGetIdentifier(boleto)

  if (identifier.mod === 10) {
    boletoCk =
      boleto.substring(0, 11) +
      calcMod10(boleto.substring(0, 11)) +
      boleto.substring(12, 23) +
      calcMod10(boleto.substring(12, 23)) +
      boleto.substring(24, 35) +
      calcMod10(boleto.substring(24, 35)) +
      boleto.substring(36, 47) +
      calcMod10(boleto.substring(36, 47))
  } else {
    boletoCk =
      boleto.substring(0, 11) +
      calcMod11(boleto.substring(0, 11)) +
      boleto.substring(12, 23) +
      calcMod11(boleto.substring(12, 23)) +
      boleto.substring(24, 35) +
      calcMod11(boleto.substring(24, 35)) +
      boleto.substring(36, 47) +
      calcMod11(boleto.substring(36, 47))
  }

  console.log('boletoRc', boleto)
  console.log('boletoCk', boletoCk)

  if (boletoCk === boleto) {
    return true
  }

  throw new CustomError('Invalid boleto', ['dv'])
}

const tituloValidateDV = (boleto: string) => {
  const boletoCk =
    boleto.substring(0, 9) +
    calcMod10(boleto.substring(0, 9)) +
    boleto.substring(10, 20) +
    calcMod10(boleto.substring(10, 20)) +
    boleto.substring(21, 31) +
    calcMod10(boleto.substring(21, 31)) +
    boleto.substring(32, 47)

  console.log('boletoCk', boletoCk)

  if (boletoCk === boleto) {
    return true
  }
  throw new CustomError('Invalid boleto', ['dv'])
}

const convenioGetBarcode = (boleto: string) =>
  boleto.substring(0, 11) +
  boleto.substring(12, 23) +
  boleto.substring(24, 35) +
  boleto.substring(36, 47)

const tituloGetBarcode = (boleto: string) =>
  boleto.substring(0, 4) +
  boleto.charAt(32) +
  boleto.substring(33, 47) +
  boleto.substring(4, 9) +
  boleto.substring(10, 20) +
  boleto.substring(21, 31)

const convenioGetAmount = (boleto: string) => {
  const amountStr = boleto.substring(5, 11) + boleto.substring(12, 16)
  const amountInt = parseInt(amountStr)

  const amount = amountInt / 100
  return amount
}

const tituloGetAmount = (boleto: string) => {
  const amountStr = boleto.substring(37, 47)
  const amountInt = parseInt(amountStr)

  const amount = amountInt / 100
  return amount
}

const convenioGetExpDate = (boleto: string) => {
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

const tituloGetExpDate = (boleto: string) => {
  const dueStr = boleto.substring(33, 37)
  const dueInt = parseInt(dueStr)

  let expirationDate = null

  if (dueInt !== 0) {
    const referDate = getReferDate()

    expirationDate = format(
      add(referDate, {
        days: dueInt
      }),
      'yyyy-MM-dd'
    )
  }

  return expirationDate
}

export const validateConvenio = (boleto: string) => {
  convenioValidateDV(boleto)

  const barCode = convenioGetBarcode(boleto)

  const amount = convenioGetAmount(boleto)

  const expirationDate = convenioGetExpDate(boleto)

  return {
    barCode,
    amount,
    expirationDate
  }
}

export const validateTitulo = (boleto: string) => {
  tituloValidateDV(boleto)

  const barCode = tituloGetBarcode(boleto)

  const amount = tituloGetAmount(boleto)

  const expirationDate = tituloGetExpDate(boleto)

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
      throw new CustomError('Invalid boleto', ['type'])
  }
}
