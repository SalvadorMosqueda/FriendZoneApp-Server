import { ChatMessage } from '../models/chat_message.js'
import { io } from '../utilis/socketServer.js'


const sendText =async (req, res) => {
    const { message, chat } = req.body
    const { user } = req

    const chat_message = new ChatMessage({
        chat,
        user,
        message,
        type: "TEXT"

    })

    try {
       await chat_message.save()
        const data = await chat_message.populate('user')
        io.sockets.in(chat).emit('message', data);
        io.sockets.in(`${chat}_notify`).emit('message_notify', data);
        res.status(201).send('ok')

    } catch (error) {
        res.status(500).send({ msg: "Error en servidor", error })
    }
}


const sendImage = (req, res) => {
    // const {file} = req
    // console.log(file)
    res.status(200).send('oki')
}


export const chatMessageController = {
    sendImage,
    sendText
}