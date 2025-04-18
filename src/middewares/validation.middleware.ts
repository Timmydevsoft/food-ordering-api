
import express,{Request, Response, NextFunction } from "express"
import { body, validationResult, ExpressValidator } from "express-validator"


export const handleValidationErrors = async(req: Request, res: Response, next: NextFunction)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        next()
    
}

export const validateUserRequest=[
    body("name").isString().notEmpty().withMessage("Name must be string"),
    body("adressLine1").isString().notEmpty().withMessage("AddressLine1 must be string"),
    body("city").isString().notEmpty().withMessage("City must be string"),
    body("country").isString().notEmpty().withMessage("Country must be string"),
    handleValidationErrors
]

// const route = express.Router()
// type Validator = ExpressValidator.infer<typeof validateUserRequest>