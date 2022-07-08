import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { validateTitulo } from '../../utils/boleto'
import { errorResponse, responseClient } from '../../utils/response'
import inputValidate from '../../validate/boletotitulo'

export const boletoTitulo = async (event: APIGatewayProxyEventV2) => {
  try {
    inputValidate(event)
    const { boletoDigits = '' } = event?.pathParameters || {}

    const data = validateTitulo(boletoDigits)
    return responseClient(data)
  } catch (error) {
    return errorResponse(error)
  }
}
