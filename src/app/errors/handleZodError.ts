import { ZodError } from "zod"
import { IErrorSources, IGenericErrorResponse } from "../interface/error"

const handleZodError = (err: ZodError): IGenericErrorResponse => {
  const statusCode = 400
  const errorSources: IErrorSources[] = err.issues.map((issue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    }
  })

  return {
    statusCode,
    message: "Validation error",
    errorSources,
  }
}

export default handleZodError
