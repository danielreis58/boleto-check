import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { validateConvenio } from '../../utils/boleto'
import { errorResponse, responseClient } from '../../utils/response'
import inputValidate from '../../validate/boletocovenio'

export const boletoConvenio = async (event: APIGatewayProxyEventV2) => {
  try {
    inputValidate(event)
    const { boletoDigits = '' } = event?.pathParameters || {}

    const data = validateConvenio(boletoDigits)
    return responseClient(data)
  } catch (error) {
    return errorResponse(error)
  }
}
