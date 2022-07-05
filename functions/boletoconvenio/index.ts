import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { errorResponse, responseClient } from '../../utils/response'
import inputValidate from '../../validate/boletocovenio'

export const boletoConvenio = async (event: APIGatewayProxyEventV2) => {
  try {
    inputValidate(event)
    const { boletoNumber } = event?.pathParameters || {}

    return responseClient({ boletoNumber })
  } catch (error) {
    return errorResponse(error)
  }
}
