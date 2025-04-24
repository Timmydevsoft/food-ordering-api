import {createUser, updateCurrentUser, getUser} from "../controllers/user.controller"
import asyncWrapper from "../util/asyncwrapper"
import {Router} from "express"
import { jwtCheck, jwtParse } from "../middewares/auth.middleware"
import { handleValidationErrors, validateUserRequest } from "../middewares/validation.middleware"

const userRouter = Router()
userRouter.route("/user").post(jwtCheck,asyncWrapper(createUser))
userRouter.route("/user").get(jwtParse, asyncWrapper(getUser))
userRouter.route("/user").put(jwtParse, validateUserRequest, handleValidationErrors , asyncWrapper(updateCurrentUser))
export default userRouter