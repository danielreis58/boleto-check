export class CustomError extends Error {
  statusCode = 400
  details?: string[]

  constructor(message: string, details?: string[]) {
    super(message)

    this.details = details

    Object.setPrototypeOf(this, CustomError.prototype)
  }

  getErrorMessage() {
    return 'Something went wrong! ' + this.message
  }

  getErrorDetails() {
    return this.details || []
  }
}
