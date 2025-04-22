"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserRequest = exports.handleValidationErrors = void 0;
const express_validator_1 = require("express-validator");
// express.Response<any, Record<string, any>>
const handleValidationErrors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        console.log(errors.isEmpty());
        return res.status(400).json({ errors: errors.array() });
    }
    next();
});
exports.handleValidationErrors = handleValidationErrors;
exports.validateUserRequest = [
    (0, express_validator_1.body)("name").isString().notEmpty().withMessage("Name must be string"),
    (0, express_validator_1.body)("adressLine1").isString().notEmpty().withMessage("AddressLine1 must be string"),
    (0, express_validator_1.body)("city").isString().notEmpty().withMessage("City must be string"),
    (0, express_validator_1.body)("country").isString().notEmpty().withMessage("Country must be string"),
];
// const route = express.Router()
// type Validator = ExpressValidator.infer<typeof validateUserRequest>
