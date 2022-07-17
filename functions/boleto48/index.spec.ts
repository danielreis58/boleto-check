import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { boleto48 } from '../index'

test('validBoleto48Function', async () => {
  const inputObj: APIGatewayProxyEventV2 = {
    pathParameters: {
      boletoDigits: '846700000017435900240209024050002435842210108119'
    },
    version: '',
    requestContext: {
      accountId: '',
      stage: '',
      requestId: '',
      apiId: '',
      domainName: '',
      domainPrefix: '',
      http: {
        method: 'GET',
        path: '/',
        protocol: 'HTTP/1.1',
        sourceIp: '',
        userAgent: ''
      },
      time: '',
      routeKey: '',
      timeEpoch: 0
    },
    routeKey: '',
    rawPath: '/',
    rawQueryString: '',
    headers: {},
    isBase64Encoded: false
  }

  const outputObj = {
    statusCode: 200,
    body: JSON.stringify(
      {
        status: 200,
        data: {
          barCode: '84670000001435900240200240500024384221010811',
          amount: 143.59,
          expirationDate: null
        }
      },
      null,
      2
    )
  }

  const resObj = await boleto48(inputObj)

  expect(resObj.statusCode).toBe(outputObj.statusCode)
  expect(resObj.body).toBe(outputObj.body)
})

test('invalidBoleto48Function', async () => {
  const inputObj: APIGatewayProxyEventV2 = {
    pathParameters: {
      boletoDigits: '846700000027435900240209024050002435842210108119'
    },
    version: '',
    requestContext: {
      accountId: '',
      stage: '',
      requestId: '',
      apiId: '',
      domainName: '',
      domainPrefix: '',
      http: {
        method: 'GET',
        path: '/',
        protocol: 'HTTP/1.1',
        sourceIp: '',
        userAgent: ''
      },
      time: '',
      routeKey: '',
      timeEpoch: 0
    },
    routeKey: '',
    rawPath: '/',
    rawQueryString: '',
    headers: {},
    isBase64Encoded: false
  }

  const outputObj = {
    statusCode: 400,
    body: JSON.stringify(
      {
        status: 400,
        data: {
          error: true,
          message: 'Something went wrong! Invalid boleto',
          details: ['dv']
        }
      },
      null,
      2
    )
  }

  const resObj = await boleto48(inputObj)

  expect(resObj.statusCode).toBe(outputObj.statusCode)
  expect(resObj.body).toBe(outputObj.body)
})
