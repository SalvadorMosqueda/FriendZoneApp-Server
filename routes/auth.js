import express from "express"
import { AuthController} from "../controllers/index.js"
import { mdAuth } from "../middlewares/index.js"
const api  = express.Router();
//endpoints
api.post("/auth/register",AuthController.register)
api.post("/auth/login",AuthController.login)
api.post("/auth/refreshAccessToken",AuthController.refreshAccessToken)

api.get("/auth/test_md",[mdAuth.isAuth],(req,res)=>{
    res.status(200).send({msg:"test md"})
})


export const authRoutes = api
