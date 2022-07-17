import { CustomError } from '../errors/CustomError'

export const responseClient = (data: object, status = 200) => {
  return {
    statusCode: status,
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(
      {
        status,
        data
      },
      null,
      2
    )
  }
}

export const errorResponse = (error: unknown) => {
  let code = 500
  let message = 'Internal server error'
  let details: string[] = []

  // FOR DEBUGGING
  /* 
  console.log(
    'ERROR ========================>',
    error,
    '<======================== ERROR'
  )
  */

  if (error instanceof CustomError) {
    code = error.statusCode
    message = error.getErrorMessage()
    details = error.getErrorDetails()
  }

  const data = {
    error: true,
    message,
    details
  }

  return responseClient(data, code)
}
