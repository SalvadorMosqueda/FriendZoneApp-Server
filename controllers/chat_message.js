import { ChatMessage } from '../models/chat_message.js'
import { io, getFilePath } from '../utilis/index.js'


const sendText = async (req, res) => {
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


const sendImage = async (req, res) => {

    const { image } = req.files
    const { user } = req
    const { chat } = req.body

    const chat_message = new ChatMessage({
        chat,
        user,
        message: getFilePath(image),
        type: "IMAGE"
    })

    try {
        await chat_message.save()
        const data = await chat_message.populate('user')
        io.sockets.in(chat).emit('message', data);
        io.sockets.in(`${chat}_notify`).emit('message_notify', data);
        return res.status(201).send('success')
    } catch (error) {
        return res.status(500).send({ msg: "Error en servidor", error })
    }
}

const getAll = async (req, res) => {
    const { chat } = req.params

    try {
        const messages = await ChatMessage.find(chat).sort({ createdAt:1}).populate({
            path: 'user',
            select: '-password -__v'
          });

        return res.status(200).send({messages,total:messages.length})
    } catch (error) {
        return res.status(500).send({ msg: "Error en servidor", error })
    }


    return res.status(200).send(id)
}

export const chatMessageController = {
    sendImage,
    sendText,
    getAll
}

