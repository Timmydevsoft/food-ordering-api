import{Request, Response, NextFunction} from "express"
import restauRantModel from "../models/restaurant.model"
import cloudinary from "../util/cloudinary"
import mongoose from "mongoose"


const cresteMyRestaurant = async(req: Request, res:Response, next: NextFunction)=>{
    try{
        const body = req.body
        const existingRestaurant = await restauRantModel.findById(req.id);
        if(existingRestaurant){
            return res.status(409).json({MESSAGE: "User's restaurant already exist"})
        }

        const image = req.file as Express.Multer.File
        const base64Image = Buffer.from(image.buffer).toString("base64")
        const dataURI = `data:${image.mimetype};base64,${base64Image}`

        const uploadeResponse = await cloudinary.uploader.upload(dataURI)
        const newRestaurant = new restauRantModel(body)
        newRestaurant.imageUrl = uploadeResponse.secure_url
        newRestaurant.user = new mongoose.Types.ObjectId(req.id)
        newRestaurant.lastUdated = new Date()
       
        await newRestaurant.save()
        return res.status(201).json(newRestaurant)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "something went wrong while creating restauranst"})
    }
}

export{cresteMyRestaurant}