import {createUser, updateCurrentUser, getUser} from "../controllers/user.controller"

import {Router} from "express"
import { jwtCheck, jwtParse } from "../middewares/auth.middleware"
import { handleValidationErrors, validateUserRequest } from "../middewares/validation.middleware"

const userRouter = Router()
userRouter.route("/user").post(jwtCheck, createUser)
userRouter.route("/user").get(jwtParse, getUser)
userRouter.route("/user").put(jwtParse, validateUserRequest, handleValidationErrors ,updateCurrentUser)
export default userRouter