import express from "express"
import { AuthController } from "../controllers/index.js"
const api  = express.Router();
//endpoints
api.post("/auth/register",AuthController.register)
api.post("/auth/login",AuthController.login)


export const authRoutes = api