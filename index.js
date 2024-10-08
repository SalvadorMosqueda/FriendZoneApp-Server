import mongoose from 'mongoose'
import { server } from './app.js'
import { DB_HOST, DB_PASSWORD, DB_USER, PORT } from './constants.js'
import { io } from './utilis/index.js'

const mongoDbUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}`

mongoose.connect(mongoDbUrl).then(() => {
    server.listen(PORT, () => {
        console.log(`server Corriendo en el puerto` + PORT)

        io.sockets.on("connection", (socket) => {
            console.log("Nuevo usuario en la app")

            socket.on("disconnect", () => {
                console.log('usuario desconectado')
            })

            socket.on("subscribe", (room) => {
                socket.join(room)
            })
            socket.on("unsubscribe", (room) => {
                socket.leave(room);
            })
        })

    })  


}).catch(error => console.log(error));






