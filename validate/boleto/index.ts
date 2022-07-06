import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { CustomError } from '../../errors/CustomError'
import schemaGet from './schema/get'
import schemaPost from './schema/post'

const inputValidate = (event: APIGatewayProxyEventV2) => {
  const input = {
    ...JSON.parse(event.body || '{}'),
    ...event.pathParameters,
    ...event.queryStringParameters
  }

  const options = {
    abortEarly: false
  }

  let schema = null
  switch (event?.requestContext?.http?.method?.toLowerCase()) {
    case 'get':
      schema = schemaGet
      break
    case 'post':
      schema = schemaPost
      break
  }

  if (schema) {
    const { error } = schema.validate(input, options)

    if (error) {
      const details = error.details.map((detail) =>
        detail.message.replace(/(")|(")/g, '')
      )

      throw new CustomError('Input validate', details)
    }
  }
}

export default inputValidate
