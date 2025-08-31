import express from "express";
import { param } from "express-validator";
import asyncWrapper from "../util/asyncwrapper";
import { searchRestaurant } from "../controllers/restaurants.controller";
const resaurantsRoute = express.Router();

resaurantsRoute
  .route("/search/:city")
  .get(
    param("city")
      .isString()
      .trim()
      .notEmpty()
      .withMessage("City parameter must be a valid string"),
    asyncWrapper(searchRestaurant)
  );
export default resaurantsRoute;
