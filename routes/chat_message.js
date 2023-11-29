import express from "express";
import multipart from "connect-multiparty";
import { chatMessageController } from "../controllers/index.js";
import { mdAuth } from "../middlewares/index.js";

const api = express.Router();

const mdUpload = multipart({ uploadDir: "./uploads/images" });


api.post("/chat/message", [mdAuth.isAuth], chatMessageController.sendText);

api.post("/chat/message/image",[mdAuth.isAuth,mdUpload],chatMessageController.sendImage)

api.get("/chat/message/:id",[mdAuth.isAuth],chatMessageController.getAll)

export const   chatMessageRoutes = api;