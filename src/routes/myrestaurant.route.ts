import express from "express";
import multer from "multer";
import { cresteMyRestaurant,  getMyRestaurant, updateMyRestaurant} from "../controllers/restaurant.controller";
import asyncWrapper from "../util/asyncwrapper";
import { jwtCheck, jwtParse } from "../middewares/auth.middleware";
import {
  handleValidationErrors,
  validateRestaurantRequest,
} from "../middewares/validation.middleware";
import upload from "../util/multer.storage"
const myRestaurantRoute = express.Router();
// const storage = multer.memoryStorage();

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 5 * 1024 * 1025, // 5Mb limis size
//   },
// });

myRestaurantRoute
  .route("/restaurant")
  .post(
    upload.single("imageFile"),
    jwtCheck,
    jwtParse,
    validateRestaurantRequest,
    handleValidationErrors,
    asyncWrapper(cresteMyRestaurant)
  );

  myRestaurantRoute.route("/restaurant").get(jwtCheck,jwtParse, asyncWrapper( getMyRestaurant))

  myRestaurantRoute.route("/restaurant").put(upload.single("imageFile"),
  jwtCheck,
  jwtParse,
  validateRestaurantRequest,
  handleValidationErrors,
  asyncWrapper(updateMyRestaurant)
  )

export default myRestaurantRoute;

