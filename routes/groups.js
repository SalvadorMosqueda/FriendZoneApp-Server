import express from 'express';
import multiparty from 'connect-multiparty';
import { groupController } from '../controllers/index.js';
import { mdAuth } from '../middlewares/authenticated.js';

const mdUpload = multiparty({ uploadDir: './uploads/group' });
const api = express.Router();


api.post('/group', [mdAuth.isAuth,mdUpload], groupController.createGroup);
api.get('/group',[mdAuth.isAuth], groupController.getAll)
api.get('/group/:id',[mdAuth.isAuth], groupController.getGroup)
api.patch("/group/exit/:id",[mdAuth.isAuth], groupController.exitGroup)
api.patch("/group/add/:id",[mdAuth.isAuth], groupController.addParticipant)
api.patch("/group/ban",[mdAuth.isAuth], groupController.banParticipant)
api.patch("/group/:id",[mdAuth.isAuth], groupController.updateGroup)
export const groupRoutes = api;