import { APIGatewayProxyEventV2 } from 'aws-lambda'

import { errorResponse, responseClient } from '../../utils/response'
import inputValidate from '../../validate/boletocovenio'

export const boletoConvenio = async (event: APIGatewayProxyEventV2) => {
  try {
    inputValidate(event)
    const { boletoDigits } = event?.pathParameters || {}

    return responseClient({ boletoDigits })
  } catch (error) {
    return errorResponse(error)
  }
}
