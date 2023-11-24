import express from "express"
import { UserController } from "../controllers/index.js"
import { mdAuth } from "../middlewares/index.js"
import  multiparty  from "connect-multiparty"

const mdUpload = multiparty({uploadDir:"./uploads/avatar"})


const api = express.Router();

// add endpoints
api.get("/user/me",[mdAuth.isAuth],UserController.getMe)
api.patch("/user/me",[mdAuth.isAuth,mdUpload],UserController.updateUser)
api.get("/user",[mdAuth.isAuth],UserController.getUsers)
api.get("/user/:id",[mdAuth.isAuth],UserController.getUser)

export const userRoutes = api 
