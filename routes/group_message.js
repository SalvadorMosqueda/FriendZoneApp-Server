import express from 'express';
import multiparty from 'connect-multiparty';
import { GroupMessageController } from '../controllers/index.js';
import { mdAuth } from '../middlewares/authenticated.js';

const api = express.Router();

const mdUpload =  multiparty({ uploadDir: './uploads/images' });

api.post('/group/message', [mdAuth.isAuth], GroupMessageController.sendText);
api.post('/group/message/image', [mdAuth.isAuth,mdUpload], GroupMessageController.sendImage);
api.get('/group/message/:id', [mdAuth.isAuth], GroupMessageController.getAll);


export const groupMessageRoutes = api;