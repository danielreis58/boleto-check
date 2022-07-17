import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { boleto47 } from '../index'

test('validBoleto47Function', async () => {
  const inputObj: APIGatewayProxyEventV2 = {
    pathParameters: {
      boletoDigits: '34191090080555272866832215240006390430000839517'
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
          barCode: '34193904300008395171090005552728663221524000',
          amount: 8395.17,
          expirationDate: '2022-07-11'
        }
      },
      null,
      2
    )
  }

  const resObj = await boleto47(inputObj)

  expect(resObj.statusCode).toBe(outputObj.statusCode)
  expect(resObj.body).toBe(outputObj.body)
})

test('invalidBoleto47Function', async () => {
  const inputObj: APIGatewayProxyEventV2 = {
    pathParameters: {
      boletoDigits: '34191090070555272866832215240006390430000839517'
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

  const resObj = await boleto47(inputObj)

  expect(resObj.statusCode).toBe(outputObj.statusCode)
  expect(resObj.body).toBe(outputObj.body)
})
