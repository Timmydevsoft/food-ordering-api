import { auth } from "express-oauth2-jwt-bearer";
import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import userModel from "../models/user.model";
dotenv.config()

declare global{
    namespace Express{
        interface Request{
            id: string,
            auth0Id: string
        }
    }
}
const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUT0_ISSUERBASEURLSURL,
    tokenSigningAlg: process.env.AUTH0_TOKENSIGNINGALG
  });

  const jwtParse= async(req: Request, res: Response, next:NextFunction):Promise<any>=>{
    const{authorization}= req.headers
    if(!authorization || !authorization.startsWith('Bearer ')){
        return res.status(401).json({message: "You are not authorizedd"})
    }

    const token = authorization.split(" ")[1]

    try{
        const decoded= jwt.decode(token) as jwt.JwtPayload
        const auth0Id = decoded.sub
        const user = await userModel.findOne({auth0Id})
        if(!user){
            return res.status(404).json({message: "Noty a valid user"})
        }
        req.auth0Id = auth0Id as string
        req.id = user._id.toString()
        next()
    }
    catch(err){

    }
  }
  export {jwtCheck, jwtParse}