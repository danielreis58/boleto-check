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

  // FOR DEBUGGING
  console.log(
    'ERROR ========================>',
    error,
    '<======================== ERROR'
  )

  if (Number.isInteger(error?.code)) {
    code = error.code
  }

  const message =
    code !== 500
      ? error?.message || 'Internal server error'
      : 'Internal server error'

  const data = {
    error: true,
    message
  }

  return responseClient(data, code)
}
