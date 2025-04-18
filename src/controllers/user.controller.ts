import { Request, Response, NextFunction } from "express";
import userModel from "../models/user.model";

type Props = {
  req: Request;
  res: Response;
  next: NextFunction;
};
const createUser = async ({ req, res, next }: Props): Promise<any> => {
  try {
    const { auth0Id, email, name, adressLine, city, country } = req.body;

    console.log(auth0Id, email);

    // if(!auth0Id || !email || !name || !adressLine || !city || !country){
    //     res.status(400).json({message: "All field required"})
    //     return
    // }

    const existingUser = await userModel.findOne({ auth0Id });

    if (existingUser) {
      res.status(200);
    }

    const newUser = new userModel({ auth0Id, email });
    await newUser.save();
    return res.status(201).json(newUser.toObject());
    
  } catch (err) {
    next(err);
  }
};

const updateCurrentUser = async ({ req, res, next }: Props): Promise<any> => {
  const { auth0Id, name, adressLine, city, country } = req.body;

  if (!auth0Id || !name || !adressLine || !city || !country) {
    return res.status(400).json({ message: "All field required" });
   
  }

  try {
    const user = await userModel.findById(req.id);
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }
    const updatedUser = await userModel.findByIdAndUpdate(
      req.id,
      {
        $set: {
          name,
          adressLine,
          city,
          country,
        },
      },
      { new: true }
    );

    return res.send({
      email: updatedUser?.email,
      name,
      city,
      country,
      _id: req.id,
    });
   
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export { createUser, updateCurrentUser };
