import express from "express"
import { UserController } from "../controllers/index.js"
import { mdAuth } from "../middlewares/index.js"
const api = express.Router();

// add endpoints
api.get("/user/me",[mdAuth.isAuth],UserController.getMe)
api.get("/user",[mdAuth.isAuth],UserController.getUsers)

export const userRoutes = api 
