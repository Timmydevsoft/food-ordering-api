"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.updateCurrentUser = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const error_middleware_1 = require("../middewares/error.middleware");
const createUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ req, res, next }) {
    try {
        const { auth0Id, email, name, adressLine, city, country } = req.body;
        console.log(auth0Id, email);
        // if(!auth0Id || !email || !name || !adressLine || !city || !country){
        //     res.status(400).json({message: "All field required"})
        //     return
        // }
        const existingUser = yield user_model_1.default.findOne({ auth0Id });
        if (existingUser) {
            res.status(200);
        }
        const newUser = new user_model_1.default({ auth0Id, email });
        yield newUser.save();
        return res.status(201).json(newUser.toObject());
    }
    catch (err) {
        next(err);
    }
});
exports.createUser = createUser;
const updateCurrentUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, addressLine, city, country } = req.body;
    if (!name || !addressLine || !city || !country) {
        return res.status(400).json({ message: "All field required" });
    }
    try {
        const user = yield user_model_1.default.findById(req.id);
        if (!user) {
            res.status(404).json({ message: "user not found" });
        }
        const updatedUser = yield user_model_1.default.findByIdAndUpdate(req.id, {
            $set: {
                name,
                addressLine,
                city,
                country,
            },
        }, { new: true });
        return res.send({
            email: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.email,
            name,
            city,
            country,
            _id: req.id,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.updateCurrentUser = updateCurrentUser;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(req.id).lean();
        if (!user) {
            return next((0, error_middleware_1.customeError)(404, "User Not found"));
        }
        const { auth0Id } = user, rest = __rest(user, ["auth0Id"]);
        return res.status(200).json(rest);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "somethiung went wrong" });
    }
});
exports.getUser = getUser;
