import {createUser, updateCurrentUser} from "../controllers/user.controller"

import {Router} from "express"
import { jwtCheck, jwtParse } from "../middewares/auth.middleware"
import { validateUserRequest } from "../middewares/validation.middleware"

const userRouter = Router()
userRouter.route("/user").post(jwtCheck, createUser)
userRouter.route("/user").put(jwtParse, validateUserRequest ,updateCurrentUser)
export default userRouter