import { GroupMessage } from "../models/index.js";
import { io,getFilePath } from "../utilis/index.js";




    const sendText = async (req, res) => {
                
        const { message, group } = req.body
        const { user } = req

        const group_message = new GroupMessage({
            group,
            user,
            message,
            type: "TEXT"
        })
        
        try {
            await group_message.save()
            
            const data = await group_message.populate('user')
            io.sockets.in(group).emit('message', data);
            io.sockets.in(`${group}_notify`).emit('message_notify', data);
            res.status(201).send('ok')

        } catch (error) {
            console.log(error)
            res.status(500).send({ msg: "Error en servidor", error })
        }
    }

   const  sendImage = async (req, res) => {
        const { image } = req.files
        const { user } = req
        const { group } = req.body

        const group_message = new GroupMessage({
            group,
            user,
            message: getFilePath(image),
            type: "IMAGE"
        })

        try {
            await group_message.save()
            const data = await group_message.populate('user')
            io.sockets.in(group).emit('message', data);
            io.sockets.in(`${group}_notify`).emit('message_notify', data);
            return res.status(201).send('success')
        } catch (error) {
            return res.status(500).send({ msg: "Error en servidor", error })
        }
    }

   const  getAll=  async (req, res) => {
        const { group } = req.params

        try {
            const messages = await GroupMessage.find(group).sort({ createdAt:1}).populate({
                path: 'user',
                select: '-password -__v'
            })
            return res.status(200).send({ messages })
        } catch (error) {
            return res.status(500).send({ msg: "Error en servidor", error })
        }
    }



    
    export const GroupMessageController = {
        sendText,
        sendImage,
        getAll


    }
