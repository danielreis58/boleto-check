import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { boleto } from '../index'

test('validBoletoFunction', async () => {
  const inputObj: APIGatewayProxyEventV2 = {
    pathParameters: {
      boletoDigits: '858700000006374303852227010701221922521789373054'
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
          barCode: '85870000000374303852220107012219252178937305',
          amount: 37.43,
          expirationDate: null
        }
      },
      null,
      2
    )
  }

  const resObj = await boleto(inputObj)

  expect(resObj.statusCode).toBe(outputObj.statusCode)
  expect(resObj.body).toBe(outputObj.body)
})

test('invalidBoletoFunction', async () => {
  const inputObj: APIGatewayProxyEventV2 = {
    pathParameters: {
      boletoDigits: '858700000007374303852227010701221922521789373054'
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

  const resObj = await boleto(inputObj)

  expect(resObj.statusCode).toBe(outputObj.statusCode)
  expect(resObj.body).toBe(outputObj.body)
})
