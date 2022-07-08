import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { validateBoleto } from '../../utils/boleto'
import { errorResponse, responseClient } from '../../utils/response'
import inputValidate from '../../validate/boleto'

export const boleto = async (event: APIGatewayProxyEventV2) => {
  try {
    inputValidate(event)
    const { boletoDigits = '' } = event?.pathParameters || {}

    const data = validateBoleto(boletoDigits)
    return responseClient(data)
  } catch (error) {
    return errorResponse(error)
  }
}
