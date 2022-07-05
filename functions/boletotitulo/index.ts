import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { errorResponse, responseClient } from '../../utils/response'
import inputValidate from '../../validate/boletotitulo'

export const boletoTitulo = async (event: APIGatewayProxyEventV2) => {
  try {
    inputValidate(event)
    const data = { event }
    return responseClient(data)
  } catch (error) {
    return errorResponse(error)
  }
}