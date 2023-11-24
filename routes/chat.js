import express from 'express';
import { chatController } from "../controllers/index.js";
import { mdAuth } from "../middlewares/index.js";

const api = express.Router();

api.post("/chat",[mdAuth.isAuth],chatController.createChat);
api.get("/chat/mychats",[mdAuth.isAuth],chatController.getMyChats);

export const chatRoutes = api;