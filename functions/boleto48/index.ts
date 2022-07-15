import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { validate48 } from '../../utils/boleto'
import { errorResponse, responseClient } from '../../utils/response'
import inputValidate from '../../validate/boleto48'

export const boleto48 = async (event: APIGatewayProxyEventV2) => {
  try {
    inputValidate(event)
    const { boletoDigits = '' } = event?.pathParameters || {}

    const data = validate48(boletoDigits)
    return responseClient(data)
  } catch (error) {
    return errorResponse(error)
  }
}
