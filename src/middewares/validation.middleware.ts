
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

export const validateRestaurantRequest =[
    body("name").isString().notEmpty().withMessage("Restaurant name is required"),
    body("city").isString().notEmpty().withMessage("city is required"),
    body("country").isString().notEmpty().withMessage("country is required"),
    body("deliveryPrice").isFloat({min: 0}).notEmpty().withMessage("Delivery Price must be a positive number"),
    body("estimatedDeliveryTime").isInt({min:0}).notEmpty().withMessage("Estimated delivery time must be a positrive integer"),
    body("cuisines").isArray().withMessage("Cuisines must be an array").not().isEmpty().withMessage("Cuisines array cannt be empty"),
    body("menuItems").isArray().withMessage("Menu Items must be an array").not().isEmpty().withMessage("Cuisines array cannt be empty"),
    body("menuItems.*.name").notEmpty().withMessage("Menu item name is required"),
    body("menuItems.*.price").isFloat({min: 0}).withMessage("Menu item price is required and must be a float")
]



// const route = express.Router()
// type Validator = ExpressValidator.infer<typeof validateUserRequest>