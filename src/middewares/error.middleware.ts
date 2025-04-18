import{Request, Response, NextFunction} from "express"

class ExtendedErorr  extends Error{
    statusCode: number;
     constructor(message: string, statusCode: number){
        super(message)
        this.statusCode = statusCode
     }
}

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction)=>{
    const statusCode = err?.statusCode || 500
    const message = err?.message || "internal server error"
    res.status(statusCode).json({
        success: false,
        message: message,
        status: statusCode
    })
}

type Error={
    status: number;
     message: string
}
const customeError = ({status, message}:Error)=>{
    const error = new ExtendedErorr(message, status)
    error.statusCode = status
    return error

}

export {errorHandler, customeError}