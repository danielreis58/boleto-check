import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { validate47 } from '../../utils/boleto'
import { errorResponse, responseClient } from '../../utils/response'
import inputValidate from '../../validate/boleto47'

export const boleto47 = async (event: APIGatewayProxyEventV2) => {
  try {
    inputValidate(event)
    const { boletoDigits = '' } = event?.pathParameters || {}

    const data = validate47(boletoDigits)
    return responseClient(data)
  } catch (error) {
    return errorResponse(error)
  }
}
