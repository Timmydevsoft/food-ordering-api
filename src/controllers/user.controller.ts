import { Request, Response, NextFunction } from "express";
import userModel from "../models/user.model";
import { customeError } from "../middewares/error.middleware";


const createUser = async (req: Request, res:Response, next: NextFunction ) => {
  try {
    const { auth0Id, email, name, adressLine, city, country } = req.body;

    // console.log(auth0Id, email);

    // if(!auth0Id || !email || !name || !adressLine || !city || !country){
    //     res.status(400).json({message: "All field required"})
    //     return
    // }

    const existingUser = await userModel.findOne({ auth0Id });

    if (existingUser) {
     return  res.status(200);
    }
    const newUser = new userModel({ auth0Id, email });
    await newUser.save();
    return res.status(201).json(newUser.toObject());
    
  } catch (err) {
    next(err);
  }
};

const updateCurrentUser = async (req:Request, res:Response, next: NextFunction) => {
  const {name, addressLine, city, country } = req.body;
  
  if (!name || !addressLine || !city || !country) {
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
          addressLine,
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

const getUser =  async (req: Request, res: Response, next:NextFunction)=>{
  try{
    const user = await userModel.findById(req.id).lean()
    if(!user){
      return next(customeError(404, "User Not found"))
    }
    const{auth0Id, ...rest}= user
    return res.status(200).json(rest)
  }
  catch(err){
    console.log(err)
    return res.status(500).json({message: "somethiung went wrong"})
  }
}

export { createUser, updateCurrentUser,getUser};
