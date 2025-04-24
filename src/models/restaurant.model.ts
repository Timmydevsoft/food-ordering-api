import mongoose from "mongoose"


const menuSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price:{type: Number, required: true}
})
const resTaurantSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:"user"},
    name: {type: String, required: true},
    city: {type: String, required: true},
    country: {type: String, required: true},
    deliveryPrice: {type: Number, required: true},
    estimatedDeliveryTime: {type: Number, required: true},
    cuisines:[{type: String, required: true}],
    menuItems:[menuSchema],
    imageUrl: {type: String, required: true},
    lastUdated:{type: Date, required: true}
})

const restauRantModel = mongoose.model("restaurant", resTaurantSchema)

export default restauRantModel