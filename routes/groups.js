import express from 'express';
import multiparty from 'connect-multiparty';
import { groupController } from '../controllers/index.js';
import { mdAuth } from '../middlewares/authenticated.js';

const mdUpload = multiparty({ uploadDir: './uploads/group' });
const api = express.Router();


api.post('/group', [mdAuth.isAuth,mdUpload], groupController.createGroup);


export const groupRoutes = api;