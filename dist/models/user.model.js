"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    auth0Id: {
        type: String, required: true
    },
    email: {
        type: String, required: true
    },
    name: {
        type: String, required: false
    },
    addressLine: {
        type: String, required: false
    },
    city: {
        type: String, required: false
    },
    country: {
        type: String, required: false
    }
});
const userModel = mongoose_1.default.model("user", UserSchema);
exports.default = userModel;
