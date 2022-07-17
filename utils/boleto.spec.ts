import { CustomError } from '../errors/CustomError'
import { validateBoleto } from './boleto'

const tests47 = [
  {
    number: '74593680101400601787650091731054390240000080000',
    barCode: '74593902400000800003680114006017875009173105',
    amount: 800,
    expirationDate: '2022-06-22'
  },
  {
    number: '34191090080555272866832215240006390430000839517',
    barCode: '34193904300008395171090005552728663221524000',
    amount: 8395.17,
    expirationDate: '2022-07-11'
  },
  {
    number: '75691317120109265310200042840017990230000035000',
    barCode: '75699902300000350001317101092653100004284001',
    amount: 350,
    expirationDate: '2022-06-21'
  },
  {
    number: '75691317120109265310200045390010290520000035000',
    barCode: '75692905200000350001317101092653100004539001',
    amount: 350,
    expirationDate: '2022-07-20'
  },
  {
    number: '03399632906400000000600125201020456140000017832',
    barCode: '03394561400000178329632964000000000012520102',
    amount: 178.32,
    expirationDate: '2013-02-19'
  }
]

const tests48 = [
  {
    number: '858700000006374303852227010701221922521789373054',
    barCode: '85870000000374303852220107012219252178937305',
    amount: 37.43,
    expirationDate: null
  },
  {
    number: '856900001004000000640052118551881105001804500310',
    barCode: '85690000100000000640051185518811000180450031',
    amount: 10000,
    expirationDate: null
  },
  {
    number: '826900000082767600191005122268268697731324005123',
    barCode: '82690000008767600191001222682686973132400512',
    amount: 876.76,
    expirationDate: null
  },
  {
    number: '846700000017435900240209024050002435842210108119',
    barCode: '84670000001435900240200240500024384221010811',
    amount: 143.59,
    expirationDate: null
  },
  {
    number: '836400001787335600450001000000002501510006150153',
    barCode: '83640000178335600450000000000025051000615015',
    amount: 17833.56,
    expirationDate: null
  }
]

describe('Boleto', () => {
  it('invalidBoleto', () => {
    const t = () => {
      validateBoleto('123456')
    }
    expect(t).toThrow(CustomError)
  })

  it('validateBoleto', () => {
    for (let i = 0; i < tests47.length; i++) {
      const test = tests47[i]

      const boleto = validateBoleto(test.number)

      expect(boleto.barCode).toBe(test.barCode)
      expect(boleto.amount).toBe(test.amount)
      expect(boleto.expirationDate).toBe(test.expirationDate)
    }
    for (let i = 0; i < tests48.length; i++) {
      const test = tests48[i]

      const boleto = validateBoleto(test.number)

      expect(boleto.barCode).toBe(test.barCode)
      expect(boleto.amount).toBe(test.amount)
      expect(boleto.expirationDate).toBe(test.expirationDate)
    }
  })

  it('invalidBoleto47', () => {
    const t = () => {
      validateBoleto('74593680101400701787650091731054390240000080000')
    }
    expect(t).toThrow(CustomError)
  })

  it('validateBoleto47', () => {
    for (let i = 0; i < tests47.length; i++) {
      const test = tests47[i]

      const boleto = validateBoleto(test.number)

      expect(boleto.barCode).toBe(test.barCode)
      expect(boleto.amount).toBe(test.amount)
      expect(boleto.expirationDate).toBe(test.expirationDate)
    }
  })

  it('invalidBoleto48', () => {
    const t1 = () => {
      validateBoleto('847700000017435900240209024050002435842210108119')
    }
    expect(t1).toThrow(CustomError)

    const t2 = () => {
      validateBoleto('849700000017435900240209024050002435842210108119')
    }
    expect(t2).toThrow(CustomError)

    const t3 = () => {
      validateBoleto('849711000017435900240209024050002435842210108119')
    }
    expect(t3).toThrow(CustomError)

    const t4 = () => {
      validateBoleto('826900000082767600191005120220101697731324005123')
    }
    expect(t4).toThrow(CustomError)
  })

  it('validateBoleto48', () => {
    for (let i = 0; i < tests48.length; i++) {
      const test = tests48[i]

      const boleto = validateBoleto(test.number)

      expect(boleto.barCode).toBe(test.barCode)
      expect(boleto.amount).toBe(test.amount)
      expect(boleto.expirationDate).toBe(test.expirationDate)
    }
  })

  it('invalidBoleto48Identifier', () => {
    const t = () => {
      validateBoleto('855700000006374303852227010701221922521789373054')
    }
    expect(t).toThrow(CustomError)
  })

  it('invalidBoleto48Product', () => {
    const t = () => {
      validateBoleto('955700000006374303852227010701221922521789373054')
    }
    expect(t).toThrow(CustomError)
  })

  it('boleto47 after 23/02/2025', () => {
    jest.useFakeTimers().setSystemTime(new Date('2025-02-23'))

    const test = {
      number: '74593680101400601787650091731054390240000080000',
      barCode: '74593902400000800003680114006017875009173105',
      amount: 800,
      expirationDate: '2049-11-07'
    }

    const boleto = validateBoleto(test.number)

    expect(boleto.barCode).toBe(test.barCode)
    expect(boleto.amount).toBe(test.amount)
    expect(boleto.expirationDate).toBe(test.expirationDate)
  })
})
