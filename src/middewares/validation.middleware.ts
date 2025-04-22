
import express,{Request, Response, NextFunction } from "express"
import { body, validationResult, ExpressValidator, ValidationChain } from "express-validator"


// express.Response<any, Record<string, any>>
export const handleValidationErrors = async(req: Request, res: Response, next: NextFunction):Promise<void | any>=>{
        
        const errors = validationResult(req)
        if(errors.isEmpty()){
            console.log(errors.isEmpty())
            return res.status(400).json({errors: errors.array()})
        }
        next()
}

export const validateUserRequest =[
    body("name").isString().notEmpty().withMessage("Name must be string"),
    body("adressLine1").isString().notEmpty().withMessage("AddressLine1 must be string"),
    body("city").isString().notEmpty().withMessage("City must be string"),
    body("country").isString().notEmpty().withMessage("Country must be string"),
]



// const route = express.Router()
// type Validator = ExpressValidator.infer<typeof validateUserRequest>