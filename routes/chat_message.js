import express from "express";
import multipart from "connect-multiparty";
import { chatMessageController } from "../controllers/index.js";
import { mdAuth } from "../middlewares/index.js";

const api = express.Router();

const mdUpload = multipart({ uploadDir: "./uploads/images" });


api.post("/chat/message", [mdAuth.isAuth], chatMessageController.sendText);

api.post("/chat/message/image",[mdAuth.isAuth,mdUpload],chatMessageController.sendImage)


export const   chatMessageRoutes = api;