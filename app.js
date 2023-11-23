import express from  'express'
import cors from 'cors'
import http from 'http'
import  bodyParser  from 'body-parser';
import { initSocketServer } from "./utilis/index.js"
import morgan from 'morgan';
import { authRoutes } from './routes/index.js';
const app = express();
const server = http.createServer(app)
initSocketServer(server)


//configure body parse
//resivir en body archivos
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

//configurestatic folder
app.use(express.static("uploads"))
export {server};

//cors configure 
app.use(cors())

//morgan
app.use(morgan('dev'))

//urls
app.use("/api",authRoutes);


