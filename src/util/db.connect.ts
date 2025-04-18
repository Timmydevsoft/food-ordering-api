import mongoose from "mongoose";

const dbConnect = async()=>{
    let url:string | undefined = process.env.MONGOURL
    try{
       if(url){
        await mongoose.connect(url)
        console.log("DB connected sucessfully")
       }
    }
    catch(err){
        console.log(err)
    }
}

    export default dbConnect