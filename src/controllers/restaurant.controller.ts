import { Request, Response, NextFunction } from "express";
import restauRantModel from "../models/restaurant.model";
import cloudinary from "../util/cloudinary";
import mongoose from "mongoose";

const uploadFile = async (file: Express.Multer.File) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  const uploadeResponse = await cloudinary.uploader.upload(dataURI, {
    folder: "restaurants",
  });

  return uploadeResponse.secure_url;
};

const cresteMyRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("fired");
    const body = req.body;
    const existingRestaurant = await restauRantModel.findById(req.id);
    if (existingRestaurant) {
      return res
        .status(409)
        .json({ message: "User's restaurant already exist" });
    }

    // const image = req.file as Express.Multer.File
    // const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
    //     "base64"
    //   )}`;

    // const base64Image = Buffer.from(image.buffer).toString("base64")
    // const dataURI = `data:${image.mimetype};base64,${base64Image}`

    // const uploadeResponse = await cloudinary.uploader.upload(dataURI, {
    //     folder: 'restaurants'
    // })

    const imageUrl = await uploadFile(req.file as Express.Multer.File);

    const newRestaurant = new restauRantModel(body);
    newRestaurant.imageUrl = imageUrl;
    newRestaurant.user = new mongoose.Types.ObjectId(req.id);
    newRestaurant.lastUdated = new Date();

    await newRestaurant.save();
    return res.status(201).json(newRestaurant);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "something went wrong while creating restauranst" });
  }
};

const getMyRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const restsurant = await restauRantModel.findOne({ user: req.id });
    if (!restsurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    return res.status(200).json(restsurant);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error fetching restaurant " });
  }
};

const updateMyRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const restaurant = await restauRantModel.findOne({ user: req.id });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    restaurant.name = req.body.name;
    restaurant.city = req.body.name;
    restaurant.country = req.body.country;
    restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    restaurant.cuisines = req.body.cuisines;
    restaurant.menuItems = req.body.menuItems;
    restaurant.lastUdated = new Date();
    if (req.file) {
      let newImgeUrl = await uploadFile(req.file as Express.Multer.File);
      restaurant.imageUrl = newImgeUrl;
    }

    await restaurant.save();
    return res.status(200).send(restaurant);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Eroor updating restaurant" });
  }
};

export { cresteMyRestaurant, getMyRestaurant, updateMyRestaurant };
